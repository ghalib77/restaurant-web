module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateColumns: {
        2: "570px 1fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
