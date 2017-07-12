/*
 Source: https://css-tricks.com/gulp-for-beginners/
@type Module gulp|Module gulp

 * 
 * ---- INSTALLATION ----
 * 
 * Install gulp globally
 * > sudo npm install gulp -g 
 * 
 * Create a new project
 *  > npm init
 *  
 *  Add gulp to the project (locally)
 *  > npm install gulp --save-dev
 *  
 *  
 *  but whyyyy?: https://stackoverflow.com/questions/22115400/why-do-we-need-to-install-gulp-globally-and-locally
 *  
 *  At this point I installed yarn, as it looks less full on trash than npm
 *  > brew install yarn
 *  
 *  and used yarn to install gulp-yarn so that we don't have to worry about other dependencies
 *  > yarn add gulp-yarn -D
 *  
 *  --------------------
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
var appDir = base+'www/site'; //use this for php changes
var templatesDir = appDir+'templates/'; //or this
var sassDir = templatesDir+'sass/' ;
var cssDir = templatesDir+'css/';
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
var yarn = require('gulp-yarn'); // YARN PLUGIN (is this the way to go?)
gulp.task('yarn', function() { //Task
	return gulp.src(['./package.json'])
			.pipe(yarn());
});

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
});

var concat = require('gulp-concat');  //JAVASCRIPT to MIN PLUGINS
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');
gulp.task('scripts', function() {  
    return gulp.src(scriptsDir + '**/*.js', '!'+scriptsDir + '**/*.min.*')
        .pipe(concat())
        .pipe(gulp.dest(scriptsMinDir))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
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
});