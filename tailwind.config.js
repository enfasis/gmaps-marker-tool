const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans", "Roboto", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      height: ["hover"],
      borderWidth: ["first", "hover"],
      padding: ["first", "last", "hover", "focus"],
      margin: ["first", "last"],
      outline: ["hover", "active", "focus"],
      borderRadius: ["hover", "even", "focus"],
      backgroundColor: ["even"],
      backgroundImage: ["active", "hover"],
      gradientColorStops: ["active, hover"],
      scale: ["active", "hover"],
      boxShadow: ["hover", "active"],
      overflow: ["first"],
    },
  },
};
