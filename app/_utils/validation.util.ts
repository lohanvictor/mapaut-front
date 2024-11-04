export class ValidationUtil {
  static isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  static isPasswordLengthValid(password: string): boolean {
    return password.length >= 8;
  }
}
