import { CalendarEventTag } from '@/models/calendar';
import { ColorTranslator } from 'colortranslator';
import { YearColors } from '../models/year';
import { clientConfig } from '@/config.client';

/**
 * Converts the hex colors set in strapi to hsl
 * and then maps them to css variables that are
 * set on the frontend
 * @param colors an object of hex colors
 * @returns an object with css colors
 */
export const generateColors = (
  colors: YearColors
): Record<string, string>[] => {
  return Object.entries(colors).map(([key, value]) => {
    const hslColor = new ColorTranslator(value);

    return {
      [`--clr-${key}-hue`]: `${hslColor.H}`,
      [`--clr-${key}-saturation`]: `${hslColor.S}%`,
      [`--clr-${key}-lightness`]: `${hslColor.L}%`,
    };
  });
};

/**
 * Converts an object to css values
 * @param obj the variables
 * @returns a string of css values
 */
export const toInlineStyles = (obj: Record<string, string>) =>
  Object.entries(obj).reduce((prev, [key, value]) => {
    return `${prev} ${key}: ${value};`;
  }, '');

/**
 * Remove the [XX] tags from the title and call an optional callback with the tag
 * @param text the text to strip tags from
 * @param cb optional callback that sends the tag back
 */
export const stripCalendarTags = (
  text: string,
  cb?: (tag: CalendarEventTag) => void
) => {
  let t = text;

  Object.values(CalendarEventTag).forEach((k) => {
    if (t.includes(k)) {
      t = t.replaceAll(`[${k}]`, '').replaceAll(`[${k.toLowerCase()}]`, '');

      // if we have a callback, send the tag back
      cb?.(k);
    }
  });

  // remove any whitespaces
  return t.trim();
};

export const toAssetUrl = (href: string) => {
  return `${clientConfig.STRAPI_URL}${href}`;
};
