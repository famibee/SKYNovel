module.exports = {
	entry: `./core/tmp/web.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/web',
		filename: 'web.js',
	},

	devServer: {
		contentBase: './',
		open: true,
		headers: {
			// 'Access-Control-Allow-Origin': '*'	//--いまのとこ不要
		},
	},
};
