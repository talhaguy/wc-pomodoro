import { Timer } from "./timer";

export function createTimer(): Timer {
  return new Timer(globalThis);
}
