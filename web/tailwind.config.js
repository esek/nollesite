const defaultTheme = require('tailwindcss/defaultTheme');

const HSL =
  (variable) =>
  ({ opacityValue }) => {
    const opacity = isNaN(opacityValue) ? 1 : parseFloat(opacityValue);

    const value = `hsl(var(--clr-${variable}-hue) var(--clr-${variable}-saturation) var(--clr-${variable}-lightness) / ${opacity})`;

    return value;
  };

module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: HSL('primary'),
        secondary: HSL('secondary'),
        accent: HSL('accent'),
      },
      fontFamily: {
        nolle: ['Nollefont', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
