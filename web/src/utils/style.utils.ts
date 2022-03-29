import { ColorTranslator } from 'colortranslator';
import { YearColors } from '../models/year';

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

export const toInlineStyles = (obj: Record<string, string>) =>
  Object.entries(obj).reduce((prev, [key, value]) => {
    return `${prev} ${key}: ${value};`;
  }, '');
