const path = require('path');

module.exports = {
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	core: {
		builder: 'webpack5',
	},
	webpackFinal: async (config, { configType }) => {
		// remove the existing css rule
		config.module.rules = config.module.rules.filter(
			(f) => f.test.toString() !== '/\\.css$/',
		);

		// add loader for css modules
		config.module.rules.push({
			test: /\.css$/,
			include: path.resolve(__dirname, '../src'),
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						modules: true,
					},
				},
				'postcss-loader',
			],
		});

		// return the altered config
		return config;
	},
};
