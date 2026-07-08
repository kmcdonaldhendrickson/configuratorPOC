import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: "#A30A35",
          gray: "#E6E6E6",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
};
export default config;
