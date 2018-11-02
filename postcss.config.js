module.exports = {
    parser: false,
    exec: true,
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {
        	browsers: [
        	    '>1%',
        	    'last 4 versions',
        	    'Firefox ESR',
        	    'not ie < 9',  // React doesn't support IE8 anyway
        	],
        },
        'cssnano': {}
    }
}