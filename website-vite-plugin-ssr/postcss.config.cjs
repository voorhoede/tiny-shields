const tailwindcss = require('tailwindcss');
const tailwindConfig = require('./tailwind.config.cjs');

module.exports = {
  plugins: [
    tailwindcss(tailwindConfig),
  ]
};
