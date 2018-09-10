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
		'scss': './sass/devScss',
		'js': './sass/devJs',
		'scss_dev': './sass_dev/devScss',
		'js_dev': './sass_dev/devJs',
		'publik': './public'		
	}
	
	

gulp.task('jsPub', function () {
    return gulp.src(srcPath.publik +'/js/app.js')				
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest(srcPath.publik +'/js'));
});

// lÃ¤gger till vendor js och concanterar dom till en vendorjs inkl min egen kivjs kÃ¶r modernizr som egen fil eftersom den mÃ¥ste ligga lÃ¤ngs upp
gulp.task('foundationJS', function () {
    gulp.src(
			[
				srcPath.bower +'/jquery/dist/jquery.js',
				srcPath.bower +'/foundation/js/foundation.js',
				srcPath.bower + '/foundation/js/foundation/foundation.alert.js',
                //srcPath.js + '/imagesloaded.pkgd.min.js',
                //srcPath.js + '/handlebars-v4.0.5.js',
                //srcPath.js + '/jquery.animateSlider.js',
                //srcPath.js + '/viewport-units-buggyfill.js',
                //srcPath.js + '/viewport-units-buggyfill.hacks.js',
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
    gulp.src('sass/**/*.scss')
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
    gulp.src('sass/**/*.scss')
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

// DEV tasks START ------------------------------------------------------------------------------------------------------------

// lÃ¤gger till vendor js och concanterar dom till en vendorjs inkl min egen kivjs kÃ¶r modernizr som egen fil eftersom den mÃ¥ste ligga lÃ¤ngs upp
gulp.task('foundationJSDEV', function () {
    gulp.src(
			[
				srcPath.bower +'/jquery/dist/jquery.js',
				srcPath.bower + '/foundation/js/foundation.js',
				srcPath.bower + '/foundation/js/foundation/foundation.alert.js',
                //srcPath.js + '/imagesloaded.pkgd.min.js',
                //srcPath.js + '/handlebars-v4.0.5.js',
                //srcPath.js_dev + '/jquery.animateSlider.js',
                srcPath.js_dev + '/viewport-units-buggyfill.js',
                srcPath.js_dev + '/viewport-units-buggyfill.hacks.js',    
                srcPath.js_dev + '/slick.js',
			    srcPath.js_dev + '/iscroll-lite.js',
                srcPath.js_dev + '/kivglobalvars.js',
                srcPath.js_dev + '/kivjs.js',
                srcPath.js_dev + '/kivsearch.js',
                srcPath.js_dev + '/kivartikel.js',
                srcPath.js_dev + '/pagerfix.js'

			]
		)
		.pipe(concat('app-dev.js'))
		.pipe(gulp.dest(srcPath.publik + '/js'));

    return gulp.src([
            srcPath.bower + '/modernizr/modernizr.js'
    ]
        )
		.pipe(gulp.dest(srcPath.publik + '/js'));

});

gulp.task('SassToCssSrcDEV', function () {
    gulp.src('sass_dev/**/*.scss')
        .pipe(sass({
            style: 'expanded',
            sourceComments: 'normal',
            includePaths: [
				srcPath.bower + '/foundation/scss' //importera alla sass filer från foundation. gör att alla komponenter går att använda direkt
            ]
        }).on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // pass the file through autoprefixer 
        .pipe(rename({ suffix: '.dev' }))
		.pipe(sourcemaps.write())
        .pipe(gulp.dest(srcPath.publik + '/css/'))
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});


// DEV TASKS END --------------------------------------------------------------------------------------------------------------


//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss', ['SassToCssSrc', 'foundationJS']);
    gulp.watch('sass/**/*.js', ['SassToCssSrc', 'foundationJS']);    
});


// använd denna för att göra ändringar som inte påverkar orginalfilerna. OBS Skapar en app.js och en app.css i publikfoldern precis som den andra 
// men använder sass_dev istället
gulp.task('dev', function () {
    gulp.watch('sass_dev/**/*.scss', ['SassToCssSrcDEV', 'foundationJSDEV']);
    gulp.watch('sass_dev/**/*.js', ['SassToCssSrcDEV', 'foundationJSDEV']);
});



gulp.task('pub',['SassToCssSrcPub','jsPub'], function () {
  
    
});

