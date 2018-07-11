const Path = require('path')

const dirs = {
	root: Path.resolve(__dirname, '..'),
	res:  Path.resolve(__dirname, '../res'),
	src:  Path.resolve(__dirname, '../src')
}

module.exports = {

	dirs,

	images: {
		sketch:      Path.join(dirs.res, 'quizmaster-remote.sketch'),
		destination: Path.join(dirs.res, 'images'),

		manifestFile:      Path.join(dirs.res, 'images/index.ts'),
		manifestImagePath: basename => `./${basename}`,

		minify: {
			optimizationLevel: 3,
			progressive:       true,
			interlaced:        true
		},
	},

	locales: {
		source:      Path.join(dirs.src, 'locales/*.yaml'),
		destination: Path.join(dirs.src, 'locales')
	}

}