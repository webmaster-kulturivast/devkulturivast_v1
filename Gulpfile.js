/*
install 
1. skapa mappar 
2. kÃ¶r bower init. fyll i allt optional
3. installera foundation: bower install foundation --save -dev
4. npm init
5. npm install --save-dev gulp gulp-sass gulp-autoprefixer gulp-rename gulp-minify-css gulp-uglify gulp-jshint
6. skapa gulpfile.js nedan med länkar till bower foundation
*/


var gulp = require('gulp'),
    sass = require('gulp-sass'),	
    autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),	
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	path = require('path');

	/*
	sÃ¤tter sÃ¶kvÃ¤gar till mapptrÃ¤det
	*/
	var srcPath={
		'bower' : './bower_components',
		'basesrc' : './dev_sass_js',
		'scss': './dev_sass_js/devScss',
		'js': './dev_sass_js/devJs',
		'publik': './public'		
	}
	

// lÃ¤gger till vendor js och concanterar dom till en vendorjs inkl min egen kivjs kÃ¶r modernizr som egen fil eftersom den mÃ¥ste ligga lÃ¤ngs upp
gulp.task('foundationJS', function () {
    gulp.src(
			[
				srcPath.bower +'/jquery/dist/jquery.js',
				srcPath.bower +'/foundation/js/foundation.js',
				srcPath.bower + '/foundation/js/foundation/foundation.alert.js',                
                srcPath.js + '/slick.js',
			    srcPath.js + '/iscroll-lite.js',
                srcPath.js + '/kivglobalvars.js',
                srcPath.js + '/kivjs.js',
                srcPath.js + '/kivsearch.js',
                srcPath.js + '/kivartikel.js',
                srcPath.js + '/pagerfix.js'               
               
			]
		)			
		.pipe(concat('app.js'))
		.pipe(gulp.dest(srcPath.publik +'/js'));
		
    return gulp.src([
            srcPath.bower + '/modernizr/modernizr.js'
            ]
        )
		.pipe(gulp.dest(srcPath.publik +'/js'));		
		
});
	
gulp.task('SassToCssSrc', function() {
    gulp.src(srcPath.basesrc + '/**/*.scss')
        .pipe(sass({
            style: 'expanded',
            sourceComments: 'normal',
			includePaths: [
				srcPath.bower +'/foundation/scss' //importera alla sass filer från foundation. gör att alla komponenter går att använda direkt
			]			
		}).on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // pass the file through autoprefixer 
		.pipe(sourcemaps.write())
        .pipe(gulp.dest(srcPath.publik +'/css/'))
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('SassToCssSrcPub', function () {
    gulp.src(srcPath.basesrc + '/**/*.scss')
    .pipe(sass({
        style: 'compressed',        
        includePaths: [
			srcPath.bower + '/foundation/scss' //importera alla sass filer från foundation. gör att alla komponenter går att använda direkt
        ]
    }).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // pass the file through autoprefixer 
	.pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
	.pipe(gulp.dest(srcPath.publik + '/css/'))
    .pipe(jshint())
	.pipe(jshint.reporter('default'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch(srcPath.basesrc + '/**/*.scss', ['SassToCssSrc', 'foundationJS']);
    gulp.watch(srcPath.basesrc + '/**/*.js', ['SassToCssSrc', 'foundationJS']);    
});

// Minifiera 
gulp.task('jsPub', function () {
    return gulp.src(srcPath.publik +'/js/app.js')				
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(srcPath.publik +'/js'));
});
