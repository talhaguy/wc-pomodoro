import { PomodoroTimer } from "./pomodoro";
import { Timer } from "./timer";

export function createTimer(): Timer {
  return new Timer(globalThis);
}

export function createPomodoroTimer(): PomodoroTimer {
  return new PomodoroTimer(new Timer(globalThis));
}
