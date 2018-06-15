const Gulp = require('gulp')
const Path = require('path')
const FS = require('fs')
const sketch = require('gulp-sketch')
const imageMinify = require('gulp-imagemin')
const config = require('./config')
const {camelCase} = require('lodash')

function writeManifest(files) {
	const lines = files.map(basename => {
		const path = config.images.manifestImagePath(basename)
		const imageName = basename.replace(/\..*?$/, '')
		return `export const ${camelCase(imageName)} = require(${JSON.stringify(path)})`
	})

	FS.writeFileSync(config.images.manifestFile, lines.join('\n'))
}

function images(_, modifyStream) {
	const files = new Set()

	let stream = Gulp
		.src(config.images.sketch)
		.pipe(sketch({
			export:  'artboards',
			formats: 'png',
			scales:  ['1.0', '2.0', '3.0']
		}))
		.pipe(imageMinify(config.images.minify))
		.pipe(Gulp.dest(config.images.destination))
		.on('data', (file) => {
			files.add(file.basename.replace(/@[^.]*/, ''))
		})
		.on('end', () => { writeManifest(Array.from(files)) })

	if (modifyStream != null) {
		stream = modifyStream(stream)
	}

	return stream
}

function watch(modifyStream) {
	Gulp.watch(config.images.sketch, images.bind(null, null, modifyStream))
}

module.exports = images
images.watch = watch