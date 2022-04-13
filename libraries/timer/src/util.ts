export function removeItem<T>(arr: T[], item: T): T[] {
  return arr.filter((x) => x !== item);
}
