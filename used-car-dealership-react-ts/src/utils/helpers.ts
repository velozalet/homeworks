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
export function capitalize(str:string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
} 


/** Formats an ISO date string into a human-readable format: `D Month, YYYY h:mmAM/PM`.
 * Example output: `"26 August, 2025 2:51PM"`.
  * @param {string} iso - The input ISO date string (e.g., `"2025-08-26T20:51:00Z"`).
 * @returns {string} The formatted date string in the form `D Month, YYYY h:mmAM/PM`.  
 * If the input is invalid, returns `"Invalid Date"`.
 *
 * @example
 * formatDateFull("2025-08-26T20:51:00Z"); // "26 August, 2025 2:51PM"
 * formatDateFull("2025-01-01T00:05:00Z"); // "1 January, 2025 12:05AM"
 */
export function formatDateFull(iso:string): string {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "Invalid Date";

    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "long" }); // "August"
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert to 12-hour format

    return `${day} ${month}, ${year} ${hours}:${minutes}${ampm}`;
}

/** Formats an ISO date string into `mm/dd/yyyy` format.
  * Example output: `"08/26/2025"`.
 * @param {string} iso - The input ISO date string (e.g., `"2025-08-26T20:51:00Z"`).
 * @returns {string} The formatted date string in the form `mm/dd/yyyy`.  
 * If the input is invalid, returns `"Invalid Date"`.
 *
 * @example
 * formatDateMMDDYYYY("2025-08-26T20:51:00Z"); // "08/26/2025"
 * formatDateMMDDYYYY("2025-01-05T12:00:00Z"); // "01/05/2025"
 */
export function formatDateMMDDYYYY(iso:string): string {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "Invalid Date";

    const day = String(d.getDate()).padStart(2, "0");       // 01 → 31
    const month = String(d.getMonth() + 1).padStart(2, "0"); // 0-based → +1
    const year = d.getFullYear();

    return `${month}/${day}/${year}`;
}