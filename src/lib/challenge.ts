// Challenge state management using localStorage
// No auth needed for MVP

export interface DayProgress {
  listenCount: number;
  readCount: number;
  reciteCount: number;
}

export interface ChallengeState {
  startDate: string;
  completedDays: number[];
  dayProgress: Record<number, DayProgress>;
}

const STORAGE_KEY = 'mulk30_challenge';
// Default to Feb 19, 2026 - the second option in Settings
// (First day of Ramadan 2026 depends on moon sighting)
const DEFAULT_START_DATE = '2026-02-19';
const REQUIRED_COUNT = 10;

export function getState(): ChallengeState {
  if (typeof window === 'undefined') {
    return { startDate: DEFAULT_START_DATE, completedDays: [], dayProgress: {} };
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const state: ChallengeState = {
      startDate: DEFAULT_START_DATE,
      completedDays: [],
      dayProgress: {},
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state;
  }
  const parsed = JSON.parse(raw);
  if (!parsed.dayProgress) parsed.dayProgress = {};
  return parsed;
}

export function saveState(state: ChallengeState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getDayProgress(dayIndex: number): DayProgress {
  const state = getState();
  return state.dayProgress[dayIndex] || { listenCount: 0, readCount: 0, reciteCount: 0 };
}

export function incrementStep(dayIndex: number, step: 'listen' | 'read' | 'recite'): DayProgress {
  const state = getState();
  if (!state.dayProgress[dayIndex]) {
    state.dayProgress[dayIndex] = { listenCount: 0, readCount: 0, reciteCount: 0 };
  }
  const p = state.dayProgress[dayIndex];
  if (step === 'listen') p.listenCount++;
  else if (step === 'read') p.readCount++;
  else if (step === 'recite') p.reciteCount++;

  // Auto-complete day when all steps done
  if (p.listenCount >= REQUIRED_COUNT && p.readCount >= REQUIRED_COUNT && p.reciteCount >= REQUIRED_COUNT) {
    if (!state.completedDays.includes(dayIndex)) {
      state.completedDays.push(dayIndex);
      state.completedDays.sort((a, b) => a - b);
    }
  }
  saveState(state);
  return p;
}

export function getActiveStep(progress: DayProgress): 1 | 2 | 3 | 'done' {
  if (progress.listenCount < REQUIRED_COUNT) return 1;
  if (progress.readCount < REQUIRED_COUNT) return 2;
  if (progress.reciteCount < REQUIRED_COUNT) return 3;
  return 'done';
}

export function getCurrentDay(state: ChallengeState): number {
  const start = new Date(state.startDate);
  const now = new Date();
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(1, Math.min(30, diff));
}

export function toggleDay(dayIndex: number): ChallengeState {
  const state = getState();
  const idx = state.completedDays.indexOf(dayIndex);
  if (idx >= 0) {
    state.completedDays.splice(idx, 1);
  } else {
    state.completedDays.push(dayIndex);
  }
  state.completedDays.sort((a, b) => a - b);
  saveState(state);
  return state;
}

export function isDayCompleted(dayIndex: number): boolean {
  return getState().completedDays.includes(dayIndex);
}

export function getStreak(state: ChallengeState): number {
  const currentDay = getCurrentDay(state);
  let streak = 0;
  let checkDay = state.completedDays.includes(currentDay) ? currentDay : currentDay - 1;
  while (checkDay >= 1 && state.completedDays.includes(checkDay)) {
    streak++;
    checkDay--;
  }
  return streak;
}

export function getProgress(state: ChallengeState): number {
  return Math.round((state.completedDays.length / 30) * 100);
}

export type DayStatus = 'completed' | 'today' | 'upcoming' | 'missed';

export function getDayStatus(dayIndex: number, state: ChallengeState): DayStatus {
  const currentDay = getCurrentDay(state);
  if (state.completedDays.includes(dayIndex)) return 'completed';
  if (dayIndex === currentDay) return 'today';
  if (dayIndex < currentDay) return 'missed';
  return 'upcoming';
}

export function setStartDate(date: string): void {
  const state = getState();
  state.startDate = date;
  saveState(state);
}

export { REQUIRED_COUNT };
