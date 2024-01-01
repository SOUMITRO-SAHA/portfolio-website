import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        "font-primary": ["var(--font-primary)"],
        "font-secondary": ["var(--font-secondary)"],
        "font-tertiary": ["var(--font-tertiary)"],
      },
      colors: {
        "gray-1": "#c4c4c4",
        "purple-1": "#8000ff",
        "purple-2": "#cf59e6",
        "blue-1": "#6bc5f8",
        "gradient-1": "linear-gradient(135deg, #8000ff, #cf59e6, #6bc5f8)",
      },
    },
  },
  plugins: [],
} satisfies Config;
