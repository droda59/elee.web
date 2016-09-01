export class TextUtils {
  public static isVowel(letter: string): boolean {
    return letter === "a" || letter === "A"
      || letter === "e" || letter === "E"
      || letter === "i" || letter === "I"
      || letter === "o" || letter === "O"
      || letter === "u" || letter === "U"
      || letter === "y" || letter === "Y"
      || letter === "h" || letter === "H";
  }
}
