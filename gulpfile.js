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

/*
 * 
 * ------- REQUIREMENTS ------- 
 * 
 */

	var    gulp = require('gulp'), //BASE
		sass = require('gulp-sass'),
		browserSync = require('browser-sync').create(),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify'),
		mocha = require('gulp-mocha'),
		babel = require('gulp-babel');

/*
 * 
 * ------- SETTINGS ------- 
 * 
 */
	var    base = __dirname + '/',
		siteURL = 'http://'+__dirname.split('/').pop()+'.dev/',
		appDir = base+'www/',
		
		templatesDir = appDir+'templates/', //html (?)

		stylesDir = appDir+'styles/',
		sassDir = stylesDir+'sass/' ,
		c_cssDir = stylesDir+'dist/',
		c_cssMinDir = c_cssDir+'min/' ,
		
		scriptsDir = appDir+'scripts/',
		ES8Dir = scriptsDir+'ES8/',
		c_jsDir = scriptsDir+'dist/',
		c_jsMinDir = c_jsDir+'min/';

	/*
	 * @display settings
	 */
	gulp.task('settings', function() {
		console.log('base:           '+base);
		console.log('siteURL:        '+siteURL);
		console.log('appDir:         '+appDir);
		
		console.log('templatesDir:   '+templatesDir);
		
		console.log('stylesDir:        '+stylesDir);
		console.log('sassDir:         '+sassDir);
		console.log('c_cssDir:        '+c_cssDir);
		console.log('c_cssMinDir:         '+c_cssMinDir);
		
		console.log('scriptsDir:         '+scriptsDir);
		console.log('ES8Dir:         '+ES8Dir);
		console.log('c_jsDir:     '+c_jsDir);
		console.log('c_jsMinDir:  '+c_jsMinDir);
	});



/*
 * 
 * ------- BASE TASKS ------- 
 * 
 */


	/*
	 * @compile SaSS => CSS
	 */
	gulp.task('sass', function(){
		return gulp.src( sassDir + '**/*.scss')
			.pipe(sass())
			.pipe(gulp.dest( c_cssDir )) //TODO: Minify
			.pipe(browserSync.reload({
				stream: true
			 }));
	});

	
	/*
	 * @compile ES(next) => ES5
	 */
	 gulp.task('babel', function() {
		 gulp.src(ES8Dir)
			.pipe(babel({
				presets: ['env']
			}))
		  .pipe(gulp.dest(c_jsDir));
	 });
	
	
	/*
	 * @minify JS => JS.min
	 */
	gulp.task('scripts', function() {  
	return gulp.src([c_jsDir + '**/*.js', '!'+c_jsDir + '**/*.min.*', '!'+c_jsMinDir])
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify({
			mangle: true
		}))
		.pipe(gulp.dest(c_jsMinDir))
		.pipe(browserSync.reload({
			stream: true
		 }));
	});

	/*
	 * @tests
	 */
	 gulp.task('test', function() {
		return gulp.src(['test/*.js'])
			.pipe(mocha({
				compilers:babel
			}));
	});
	
	/*
	 * @autosync
	 */
	gulp.task('browserSync', function() {
		browserSync.init({
			proxy:  siteURL
		});
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

	gulp.task('watch', ['browserSync','sass','scripts'], function (){
		//gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
		gulp.watch(ES8Dir + '**/*.js', ['babel']);
		gulp.watch(sassDir + '**/*.scss', ['sass']); 

		// Other watches
		// Reloads the browser whenever HTML or PHP files change
		gulp.watch(appDir+'**/*.html', browserSync.reload);
		gulp.watch(appDir+'**/*.php', browserSync.reload);

	});