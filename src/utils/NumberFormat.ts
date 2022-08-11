/**
 * Internal dependencies
 */
import { getGlobalData } from './global-data';

/**
 * Number format implementation.
 *
 * @param  number     number to format
 * @param  noDecimals noDecimals points of decimals
 *
 * @return {string} Formatted number
 */
export function number_format(
    number: number,
    noDecimals: number | null = 2
): string {
    const { decimals, decimal_separator, thousand_separator } =
        getGlobalData('wc');
    noDecimals =
        typeof noDecimals === 'undefined' || noDecimals === null
            ? decimals
            : noDecimals;

    var number = !isFinite(+number) ? 0 : +number,
        precedence = !isFinite(+noDecimals) ? 0 : Math.abs(noDecimals),
        sep =
            typeof thousand_separator === 'undefined'
                ? ','
                : thousand_separator,
        dec =
            typeof decimal_separator === 'undefined' ? '.' : decimal_separator,
        toFixedFix = function (number, precedence: number) {
            const k = Math.pow(10, precedence);
            return Math.round(number * k) / k;
        },
        s = (precedence ? toFixedFix(number, precedence) : Math.round(number))
            .toString()
            .split('.');

    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }

    if ((s[1] || '').length < precedence) {
        s[1] = s[1] || '';
        s[1] += new Array(precedence - s[1].length + 1).join('0');
    }

    return s.join(dec);
}
