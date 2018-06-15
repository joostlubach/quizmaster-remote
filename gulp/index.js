const Gulp = require('gulp')

const images   = require('./images')
const locales  = require('./locales')

Gulp.task('images', images)
Gulp.task('locales', locales)

Gulp.task('build', ['images', 'locales'])
Gulp.task('watch', ['images', 'locales'], () => {
	images.watch()
	locales.watch()
})

Gulp.task('development', ['watch'])
Gulp.task('default', ['development'])