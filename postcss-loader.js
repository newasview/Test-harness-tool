const autoPrefixer = require('autoprefixer');

module.exports = {
  loader: 'postcss-loader',
  options: {
   plugins: () => [autoPrefixer({
	 browsers: [
	   'Chrome >= 56',
	 ],
   })],
  },
};
