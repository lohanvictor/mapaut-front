export class LocalStorageUtils {
  static set(key: string, value: unknown) {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value as string);
  }

  static get(key: string) {
    return localStorage.getItem(key);
  }

  static delete(key: string) {
    localStorage.removeItem(key);
  }
}
