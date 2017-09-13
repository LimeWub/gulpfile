// package vars
const pkg = require("./package.json");

// gulp
const gulp = require("gulp");

// load all plugins in "devDependencies" into the variable _f
const _f = require("gulp-load-plugins")({
	pattern: ["*"],
	scope: ["devDependencies"]
});

const onError = (err) => {
	console.log(err);
};

const banner = [
	"/**",
	" * @project     <%= pkg.name %>",
	" * @author      <%= pkg.author %>",
	" * @build       " + _f.moment().format("llll") + " ET",
	" * @release     " + _f.gitRevSync.long() + " [" + _f.gitRevSync.branch() + "]",
	" * @copyright   Copyright (c) " + _f.moment().format("YYYY") + ", <%= pkg.copyright %>",
	" *",
	" */",
	""
].join("\n");

// scss - build the scss to the build folder, including the required paths, and writing out a sourcemap
gulp.task("scss", () => {
	_f.fancyLog("-> Compiling scss");
	return gulp.src(pkg.paths.src.scss + pkg.vars.scssName)
		.pipe(_f.plumber({errorHandler: onError}))
		.pipe(_f.sourcemaps.init({loadMaps: true}))
		.pipe(_f.sass({
				includePaths: pkg.paths.scss
			})
			.on("error", _f.sass.logError))
		.pipe(_f.cached("sass_compile"))
		.pipe(_f.autoprefixer())
		.pipe(_f.sourcemaps.write("./"))
		.pipe(_f.size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.paths.build.css));
});

// css task - combine & minimize any distribution CSS into the public css folder, and add our banner to it
gulp.task("css", ["scss"], () => {
	_f.fancyLog("-> Building css");
	return gulp.src(pkg.globs.distCss)
		.pipe(_f.plumber({errorHandler: onError}))
		.pipe(_f.newer({dest: pkg.paths.dist.css + pkg.vars.siteCssName}))
		.pipe(_f.print())
		.pipe(_f.sourcemaps.init({loadMaps: true}))
		.pipe(_f.concat(pkg.vars.siteCssName))
		.pipe(_f.cssnano({
			discardComments: {
				removeAll: true
			},
			discardDuplicates: true,
			discardEmpty: true,
			minifyFontValues: true,
			minifySelectors: true
		}))
		.pipe(_f.header(banner, {pkg: pkg}))
		.pipe(_f.sourcemaps.write("./"))
		.pipe(_f.size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.paths.dist.css))
		.pipe(_f.filter("**/*.css"))
		.pipe(_f.livereload());
});

// babel js task - transpile our Javascript into the build directory
gulp.task("js-babel", () => {
	_f.fancyLog("-> Transpiling Javascript via Babel...");
	return gulp.src(pkg.paths.src.js + "*.js")
		.pipe(_f.plumber({errorHandler: onError}))
		.pipe(_f.newer({dest: pkg.paths.build.js}))
		.pipe(_f.babel())
		.pipe(_f.size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.paths.build.js));
});

// js task - minimize any distribution Javascript into the public js folder, and add our banner to it
gulp.task("js", ["js-babel"], () => {
	_f.fancyLog("-> Building js");
	return gulp.src(pkg.globs.distJs)
		.pipe(_f.plumber({errorHandler: onError}))
		.pipe(_f.if(["*.js", "!*.min.js"],
			_f.newer({dest: pkg.paths.dist.js, ext: ".min.js"}),
			_f.newer({dest: pkg.paths.dist.js})
		))
		.pipe(_f.if(["*.js", "!*.min.js"],
			_f.uglify()
		))
		.pipe(_f.if(["*.js", "!*.min.js"],
			_f.rename({suffix: ".min"})
		))
		.pipe(_f.header(banner, {pkg: pkg}))
		.pipe(_f.size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.paths.dist.js))
		.pipe(_f.filter("**/*.js"))
		.pipe(_f.livereload());
});

// Process data in an array synchronously, moving onto the n+1 item only after the nth item callback
function doSynchronousLoop(data, processData, done) {
	if (data.length > 0) {
		const loop = (data, i, processData, done) => {
			processData(data[i], i, () => {
				if (++i < data.length) {
					loop(data, i, processData, done);
				} else {
					done();
				}
			});
		};
		loop(data, 0, processData, done);
	} else {
		done();
	}
}

// Process the critical path CSS one at a time
function processCriticalCSS(element, i, callback) {
	const criticalSrc = pkg.urls.critical + element.url;
	const criticalDest = element.template + "_critical.min.css";

	let criticalWidth = 1200;
	let criticalHeight = 1200;
	if (element.template.indexOf("amp_") !== -1) {
		criticalWidth = 600;
		criticalHeight = 19200;
	}
	_f.fancyLog("-> Generating critical CSS: " + criticalSrc + " -> " + criticalDest);
	_f.critical.generate({
		src: criticalSrc,
		dest: criticalDest,
		inline: false,
		ignore: [],
		base: pkg.paths.dist.css,
		css: pkg.paths.dist.css + pkg.vars.siteCssName,
		minify: true,
		width: criticalWidth,
		height: criticalHeight
	}, (err, output) => {
		if (err) {
			_f.fancyLog(err);
		}
		callback();
	});
}

//critical css task
gulp.task("criticalcss", ["css"], (callback) => {
	doSynchronousLoop(pkg.globs.critical, processCriticalCSS, () => {
		// all done
		callback();
	});
});

// Process the downloads one at a time
function processDownload(element, i, callback) {
	const downloadSrc = element.url;
	const downloadDest = element.dest;

	_f.fancyLog("-> Downloading URL: " + _f.chalk.cyan(downloadSrc) + " -> " + _f.chalk.magenta(downloadDest));
	_f.download(downloadSrc)
		.pipe(gulp.dest(downloadDest));
	callback();
}

// download task
gulp.task("download", (callback) => {
	doSynchronousLoop(pkg.globs.download, processDownload, () => {
		// all done
		callback();
	});
});

// Run pa11y accessibility tests on each template
function processAccessibility(element, i, callback) {
	const accessibilitySrc = pkg.urls.critical + element.url;
	const cliReporter = require('./node_modules/pa11y/reporter/cli.js');
	const options = {
		log: cliReporter,
		ignore:
			[
				'notice',
				'warning'
			]
		};
	const test = _f.pa11y(options);

	_f.fancyLog("-> Checking Accessibility for URL: " + accessibilitySrc);
	test.run(accessibilitySrc, (error, results) => {
		cliReporter.results(results, accessibilitySrc);
		callback();
	});
}

// accessibility task
gulp.task("a11y", (callback) => {
	doSynchronousLoop(pkg.globs.critical, processAccessibility, () => {
		// all done
		callback();
	});
});

//favicons-generate task
gulp.task("favicons-generate", () => {
	_f.fancyLog("-> Generating favicons");
	return gulp.src(pkg.paths.favicon.src).pipe(_f.favicons({
		appName: pkg.name,
		appDescription: pkg.description,
		developerName: pkg.author,
		developerURL: pkg.urls.live,
		background: "#FFFFFF",
		path: pkg.paths.favicon.path,
		url: pkg.site_url,
		display: "standalone",
		orientation: "portrait",
		version: pkg.version,
		logging: false,
		online: false,
		html: pkg.paths.build.html + "favicons.html",
		replace: true,
		icons: {
			android: false, // Create Android homescreen icon. `boolean`
			appleIcon: true, // Create Apple touch icons. `boolean`
			appleStartup: false, // Create Apple startup images. `boolean`
			coast: true, // Create Opera Coast icon. `boolean`
			favicons: true, // Create regular favicons. `boolean`
			firefox: true, // Create Firefox OS icons. `boolean`
			opengraph: false, // Create Facebook OpenGraph image. `boolean`
			twitter: false, // Create Twitter Summary Card image. `boolean`
			windows: true, // Create Windows 8 tile icons. `boolean`
			yandex: true // Create Yandex browser icon. `boolean`
		}
	})).pipe(gulp.dest(pkg.paths.favicon.dest));
});

//copy favicons task
gulp.task("favicons", ["favicons-generate"], () => {
	_f.fancyLog("-> Copying favicon.ico");
	return gulp.src(pkg.paths.favicon.src)
		.pipe(_f.size({gzip: true, showFiles: true}))
		.pipe(gulp.dest(pkg.paths.dist.base));
});

// imagemin task
gulp.task("imagemin", () => {
	return gulp.src(pkg.paths.dist.img + "**/*.{png,jpg,jpeg,gif,svg}")
		.pipe(_f.imagemin({
			progressive: true,
			interlaced: true,
			optimizationLevel: 7,
			svgoPlugins: [{removeViewBox: false}],
			verbose: true,
			use: []
		}))
		.pipe(gulp.dest(pkg.paths.dist.img));
});

//generate-fontello task
gulp.task("generate-fontello", () => {
	return gulp.src(pkg.paths.src.fontello + "config.json")
		.pipe(_f.fontello())
		.pipe(_f.print())
		.pipe(gulp.dest(pkg.paths.build.fontello))
});

//copy fonts task
gulp.task("fonts", ["generate-fontello"], () => {
	return gulp.src(pkg.globs.fonts)
		.pipe(gulp.dest(pkg.paths.dist.fonts));
});

// Default task
gulp.task("default", ["css", "js"], () => {
	_f.livereload.listen();
	gulp.watch([pkg.paths.src.scss + "**/*.scss"], ["css"]);
	gulp.watch([pkg.paths.src.js + "**/*.js"], ["js"]);
	gulp.watch([pkg.paths.templates + "**/*.{html,htm,twig,php}"], () => {
		gulp.src(pkg.paths.templates)
			.pipe(_f.plumber({errorHandler: onError}))
			.pipe(_f.livereload());
	});
	
});

// Production build
gulp.task("build", ["download", "default", "favicons", "imagemin", "fonts", "criticalcss"]);