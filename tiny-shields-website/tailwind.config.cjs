module.exports = {
  mode: 'jit',
  purge: ['./src/components/**/*.jsx', './src/pages/**/*.jsx'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'hyper-blue': '#0000FF',
        'hyper-yellow': '#FFE400',
      },
    },
  },
};
