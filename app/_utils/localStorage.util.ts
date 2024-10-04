export class LocalStorageUtils {
  static set(key: string, value: any) {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  static get(key: string) {
    return localStorage.getItem(key);
  }

  static delete(key: string) {
    localStorage.removeItem(key);
  }
}
