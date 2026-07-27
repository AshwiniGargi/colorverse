import * as tailwindPlugin from "prettier-plugin-tailwindcss";

const config = {
  plugins: [tailwindPlugin],
  printWidth: 88,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
};

export default config;
