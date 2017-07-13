/*
@type Module gulp|Module gulp

 * 
 * ---- INSTALLATION ----
 * 
 * Install yarn
 * > brew install yarn
 * 
 *  Make sure you have package.json with all dependences in the same folder
 *  then install all the dependences
 *  >yarn install
 *  
 *  if any dependency is missing just do
 *  > yarn add gulp-DEPENDENCYNAME -D
 *  
 *  
 *  
 *  --------------------
 *  
 *  gulp watch
 *  and you're ready to go :)
 *  
 * 
 */

var gulp = require('gulp'); //BASE

/*
 * 
 * ------- SETTINGS ------- 
 * 
 */
var base = __dirname + '/';
var siteURL = 'http://'+__dirname.split('/').pop()+'.dev/';
var appDir = base+'www/site/'; //use this for php changes
var templatesDir = appDir+'templates/'; //or this
var cssDir = templatesDir+'styles/';
var sassDir = cssDir+'sass/' ;
var scriptsDir = templatesDir+'scripts/';
var scriptsMinDir = scriptsDir+'min/';


gulp.task('settings', function() {
	console.log('base:           '+base);
	console.log('siteURL:        '+siteURL);
	console.log('appDir:         '+appDir);
	console.log('templatesDir:   '+templatesDir);
	console.log('sassDir:        '+sassDir);
	console.log('cssDir:         '+cssDir);
	console.log('scriptsDir:     '+scriptsDir);
	console.log('scriptsMinDir:  '+scriptsMinDir);
});


/*
 * 
 * ------- BASE TASKS ------- 
 * 
 */

var sass = require('gulp-sass'); //SASS PLUGIN
gulp.task('sass', function(){ //Task
	return gulp.src( sassDir + '**/*.scss')
		.pipe(sass()) // Using gulp-sass
		.pipe(gulp.dest( cssDir ))
		.pipe(browserSync.reload({
			stream: true
		 }));
});


var browserSync = require('browser-sync').create(); //BROWSER SYNC PLUGIN (Live reloading)
gulp.task('browserSync', function() { //Task
	browserSync.init({
		proxy:  siteURL
	});
	console.log(siteURL);
});


var rename = require('gulp-rename');  //JAVASCRIPT to MIN PLUGINS
var uglify = require('gulp-uglify');
gulp.task('scripts', function() {  
    return gulp.src([scriptsDir + '**/*.js', '!'+scriptsDir + '**/*.min.*', '!'+scriptsMinDir])
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify({
		mangle: true
	}))
        .pipe(gulp.dest(scriptsMinDir))
	.pipe(browserSync.reload({
			stream: true
	 }));
});




/*
 * 
 * ------- COMPLEX TASKS ------- 
 * 
 */








/*
 * 
 * ------- WATCHES ------- 
 * 
 */
//gulp.watch('files-to-watch', ['tasks', 'to', 'run']); 
//gulp.watch('app/scss/**/*.scss', ['sass']); 
gulp.task('watch', ['browserSync','sass','scripts'], function (){
	gulp.watch(sassDir + '**/*.scss', ['sass']); 
	gulp.watch(scriptsDir + '**/*.js', ['scripts']);

	// Other watches
	// Reloads the browser whenever HTML or JS files change
	gulp.watch(templatesDir+'**/*.html', browserSync.reload);
	gulp.watch(templatesDir+'**/*.php', browserSync.reload);
	
	console.log(templatesDir+'**/*.html');
});