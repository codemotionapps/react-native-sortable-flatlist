const path = require(`path`);

const baseConfig = {
	name: `module`,
	entry: `./src/index.tsx`,
	devtool: `source-map`,
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					`ts-loader`,
					{
						loader: `tslint-loader`,
						options: {
							failOnHint: true,
							emitErrors: true,
							typeCheck: true,
						},
					},
				],
			},
		],
	},
	optimization: {
		minimize: false,
	},
	resolve: {
		extensions: [`.tsx`, `.ts`],
	},
	target: `node`,
	externals: {
		react: `commonjs react`,
		"react-native": `commonjs react-native`,
	},
	output: {
		filename: `index.js`,
		path: path.resolve(__dirname, `dist`),
	},
};

const appConfig = JSON.parse(JSON.stringify(baseConfig));
appConfig.name = `app`;
appConfig.entry = `./app/src/index.ts`;
appConfig.output = {
	filename: `index.js`,
	path: path.resolve(__dirname, `app`, `dist`),
};
appConfig.module.rules[0].test = /\.tsx?$/;
appConfig.module.rules[0].use[1].options.tsConfigFile = `app/tsconfig.json`;

module.exports = [
	baseConfig,
	appConfig,
];
