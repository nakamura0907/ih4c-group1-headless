const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  // BUGFIX: Couldn't find any `pages` or `app` directory. Please create one under the project root
  // '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  "*.{js,jsx,ts,tsx}": ["eslint", "prettier --write"],
};
