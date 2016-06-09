import Gulp from 'gulp'
import postcss from 'gulp-postcss'
import cssImport from 'postcss-import'
import jade from 'gulp-jade'
import browserify from 'browserify'

let Src = Gulp.src.bind( Gulp )
let Dest = Gulp.dest.bind( Gulp )
let Task = Gulp.task.bind( Gulp )
let Watch = Gulp.watch.bind( Gulp )

/*
Cargar archivos de estilo
 */
Task( 'theme', () => Src( [ 'resources/themes/**/*.css' ] )
	.pipe( postcss( [
		cssImport(),
	] ) )
	.pipe( Dest( 'css' ) ) )

Task( 'theme:watch', () => {
	Watch( [ 'resources/themes/**/*.css' ], [ 'theme' ] )
} )

/*
Archivos templates
 */
Task( 'templates', () => Src( [ 'resources/views/**/*.jade' ] )
	.pipe( jade( {
		pretty: process.env.NODE_ENV != 'production',
	} ) )
	.pipe( Dest( '.' ) ) )

Task( 'templates:watch', () => {
	Watch( [ 'resources/views/**/*.jade' ], [ 'templates' ] )
} )

Task( 'watch', [ 'theme', 'theme:watch', 'templates', 'templates:watch' ] )
