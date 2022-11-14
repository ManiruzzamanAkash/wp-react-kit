/**
 * Capitalize a string.
 *
 * @param  text string
 * @return string
 */
export function capitalize(text: string) {
    if (text === undefined) {
        return '';
    }

    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
