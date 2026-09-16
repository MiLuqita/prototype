const PERU_OFFSET_MS = -5 * 60 * 60 * 1000;

const MONTHS = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "set.", "oct.", "nov.", "dic."] as const;
const WEEKDAYS = ["dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb."] as const;

interface PeruDateParts {
  year: number;
  month: number;
  day: number;
  weekday: number;
  hour: number;
  minute: number;
}

function getPeruDateParts(value: string): PeruDateParts {
  const instant = new Date(value);
  if (Number.isNaN(instant.getTime())) {
    return { year: 0, month: 0, day: 0, weekday: 0, hour: 0, minute: 0 };
  }

  // Peru uses UTC-05:00 year-round. Using UTC getters after applying the
  // fixed offset keeps SSR and browser output byte-for-byte identical.
  const peru = new Date(instant.getTime() + PERU_OFFSET_MS);
  return {
    year: peru.getUTCFullYear(),
    month: peru.getUTCMonth(),
    day: peru.getUTCDate(),
    weekday: peru.getUTCDay(),
    hour: peru.getUTCHours(),
    minute: peru.getUTCMinutes(),
  };
}

const pad2 = (value: number) => String(value).padStart(2, "0");

export function formatPeruTime(value: string): string {
  const { hour, minute } = getPeruDateParts(value);
  return `${pad2(hour)}:${pad2(minute)}`;
}

export function formatPeruTaskDate(value: string): string {
  const parts = getPeruDateParts(value);
  return `${WEEKDAYS[parts.weekday]}, ${parts.day} ${MONTHS[parts.month]} · ${pad2(parts.hour)}:${pad2(parts.minute)}`;
}

export function formatPeruDateTime(value: string): string {
  const parts = getPeruDateParts(value);
  return `${parts.day} ${MONTHS[parts.month]} ${parts.year} · ${pad2(parts.hour)}:${pad2(parts.minute)}`;
}

export function formatPeruDayMonthTime(value: string): string {
  const parts = getPeruDateParts(value);
  return `${parts.day} ${MONTHS[parts.month]} · ${pad2(parts.hour)}:${pad2(parts.minute)}`;
}
