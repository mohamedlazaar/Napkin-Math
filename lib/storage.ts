/**
 * LOCAL-ONLY PERSISTENCE.
 *
 * Favourites, recently-used and saved scenarios all live in this browser and
 * nowhere else. No account, no sync, no network call — which is what lets the
 * privacy promise on the homepage stay literally true.
 *
 * Every read is defensive: localStorage throws in Safari private mode, can be
 * disabled entirely, and may contain data written by an older version of the
 * site. A corrupt value must never break a calculator, so everything falls
 * back to empty.
 */

const KEYS = {
  recent: 'nm:recent',
  favorites: 'nm:favorites',
  scenarios: 'nm:scenarios',
} as const;

const RECENT_LIMIT = 12;
const SCENARIO_LIMIT = 3;

/** Fired after any write so open components re-read without a page reload. */
export const STORAGE_EVENT = 'nm:storage';

function canUse(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
}

function read<T>(key: string, fallback: T): T {
  if (!canUse()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  if (!canUse()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
  } catch {
    // Quota exceeded or storage disabled. Silently degrade — the feature is a
    // convenience, never a requirement.
  }
}

/* ------------------------------------------------------------------ *
 * Recently used                                                       *
 * ------------------------------------------------------------------ */

export interface RecentEntry {
  slug: string;
  /** Full path, so variant pages return you where you actually were. */
  path: string;
  name: string;
  at: number;
}

export function getRecent(): RecentEntry[] {
  const list = read<RecentEntry[]>(KEYS.recent, []);
  return Array.isArray(list)
    ? list.filter((e) => e && typeof e.slug === 'string' && typeof e.path === 'string')
    : [];
}

export function pushRecent(entry: Omit<RecentEntry, 'at'>): void {
  const list = getRecent().filter((e) => e.path !== entry.path);
  list.unshift({ ...entry, at: Date.now() });
  write(KEYS.recent, list.slice(0, RECENT_LIMIT));
}

export function clearRecent(): void {
  write(KEYS.recent, []);
}

/* ------------------------------------------------------------------ *
 * Favourites                                                          *
 * ------------------------------------------------------------------ */

export function getFavorites(): string[] {
  const list = read<string[]>(KEYS.favorites, []);
  return Array.isArray(list) ? list.filter((s) => typeof s === 'string') : [];
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

/** Returns the new state so the caller can update its button immediately. */
export function toggleFavorite(slug: string): boolean {
  const list = getFavorites();
  const has = list.includes(slug);
  write(KEYS.favorites, has ? list.filter((s) => s !== slug) : [...list, slug]);
  return !has;
}

/* ------------------------------------------------------------------ *
 * Saved scenarios                                                     *
 * ------------------------------------------------------------------ */

export interface Scenario {
  id: string;
  label: string;
  values: Record<string, number>;
  at: number;
}

type ScenarioStore = Record<string, Scenario[]>;

export function getScenarios(calculatorSlug: string): Scenario[] {
  const all = read<ScenarioStore>(KEYS.scenarios, {});
  const list = all?.[calculatorSlug];
  return Array.isArray(list) ? list : [];
}

export function saveScenario(calculatorSlug: string, scenario: Scenario): Scenario[] {
  const all = read<ScenarioStore>(KEYS.scenarios, {});
  const list = [...(all[calculatorSlug] ?? []).filter((s) => s.id !== scenario.id), scenario];
  const capped = list.slice(-SCENARIO_LIMIT);
  write(KEYS.scenarios, { ...all, [calculatorSlug]: capped });
  return capped;
}

export function deleteScenario(calculatorSlug: string, id: string): Scenario[] {
  const all = read<ScenarioStore>(KEYS.scenarios, {});
  const list = (all[calculatorSlug] ?? []).filter((s) => s.id !== id);
  write(KEYS.scenarios, { ...all, [calculatorSlug]: list });
  return list;
}

export function clearAllLocalData(): void {
  if (!canUse()) return;
  try {
    for (const key of Object.values(KEYS)) window.localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key: 'all' } }));
  } catch {
    /* ignore */
  }
}

export const SCENARIO_MAX = SCENARIO_LIMIT;
