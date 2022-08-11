/**
 * External dependencies
 */
import parse from 'html-react-parser';

/**
 * Parse any HTML string into React elements.
 *
 * @param  html html string to parse.
 * @return string
 */
export function parseHtml(html: string) {
    return parse(html);
}
