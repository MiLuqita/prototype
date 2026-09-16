/**
 * PROVISIONAL TOKENS.
 * The official Mi Luquita style guide was referenced by the specification but
 * was not present in the uploaded files. Tailwind v4 is CSS-first, so runtime
 * tokens live in src/app/globals.css; this file mirrors them as the approved
 * configuration handoff point until the official guide is supplied.
 */
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        ink: "#172033",
        muted: "#667085",
        surface: "#ffffff",
        canvas: "#f7f8fb",
      },
      borderRadius: {
        card: "1.25rem",
        control: "0.9rem",
      },
      boxShadow: {
        card: "0 12px 30px rgba(23,32,51,.08)",
      },
    },
  },
  plugins: [],
};

export default config;
