/** Capitalizes the first letter of a string and converts the rest to lowercase.
 * @param {string} str - The input string to capitalize.
 * @returns {string} The capitalized string. 
 * If the input is empty or undefined, returns an empty string.
 *
 * @example
 * capitalize("hello"); // "Hello"
 * capitalize("hELLO"); // "Hello"
 * capitalize("");      // ""
 */
export function capitalize(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
} 