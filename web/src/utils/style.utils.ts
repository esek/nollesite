import { ColorTranslator } from 'colortranslator';
import { YearColors } from '../models/year';

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
