const STORAGE_KEY = "afrodigital-financial-tracker";

export function loadFromStorage<T>(fallback: T): T {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(data: T): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
