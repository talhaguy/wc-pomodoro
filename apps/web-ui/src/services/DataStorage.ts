export class DataStorage {
  private _isAvailable = this._checkIfStorageAvailable();
  private readonly SAVE_DATA_KEY = "wcPomodoroSaveData";

  constructor(private _storage: Storage) {}

  save(data: SavedData): void {
    if (!this._isAvailable) {
      throw new DataStorageNotAvailableError();
    }

    try {
      this._storage.setItem(this.SAVE_DATA_KEY, JSON.stringify(data));
    } catch (err) {
      throw new DataStorageSaveDataError();
    }
  }

  load(): SavedData {
    if (!this._isAvailable) {
      throw new DataStorageNotAvailableError();
    }

    const dataJSON = this._storage.getItem(this.SAVE_DATA_KEY);

    if (dataJSON === null) {
      const data = {
        numIntervalsCompleted: 0,
      };
      this.save(data);
      return data;
    }

    let data: unknown;
    try {
      data = JSON.parse(dataJSON);
    } catch {
      this._storage.removeItem(this.SAVE_DATA_KEY);
      throw new DataStorageInvalidSaveDataError();
    }

    const isValid = validateSavedData(data);
    if (!isValid) {
      this._storage.removeItem(this.SAVE_DATA_KEY);
      throw new DataStorageInvalidSaveDataError();
    }

    return data as SavedData;
  }

  // adapted from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  private _checkIfStorageAvailable() {
    try {
      var x = "__storage_test__";
      this._storage.setItem(x, x);
      this._storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        this._storage &&
        this._storage.length !== 0
      );
    }
  }
}

function validateSavedData(data: unknown): boolean {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  if (
    typeof (data as SavedData).numIntervalsCompleted === "undefined" ||
    typeof (data as SavedData).numIntervalsCompleted !== "number"
  ) {
    return false;
  }
  return true;
}

export interface SavedData {
  numIntervalsCompleted: number;
}

export class DataStorageNotAvailableError extends Error {
  constructor() {
    super("Storage is not available");
  }
}

export class DataStorageSaveDataError extends Error {
  constructor() {
    super("Data could not be saved");
  }
}

export class DataStorageInvalidSaveDataError extends Error {
  constructor() {
    super("Data is invalid");
  }
}
