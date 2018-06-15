const Gulp = require('gulp')
const yaml = require('gulp-yaml')
const config = require('./config')

function locales(_, modifyStream) {
	let stream = Gulp
		.src(config.locales.source)
		.pipe(yaml())
		.pipe(Gulp.dest(config.locales.destination))

	if (modifyStream != null) {
		stream = modifyStream(stream)
	}

	return stream
}

function watch(modifyStream) {
	Gulp.watch(config.locales.source, locales.bind(null, null, modifyStream))
}

module.exports = locales
module.exports.watch = watch