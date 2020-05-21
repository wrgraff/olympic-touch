var gulp = require('gulp'),
    sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	csso = require('gulp-csso'),
	postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    rename = require('gulp-rename'),
	nunjucks = require('gulp-nunjucks-render'),
	prettier = require('gulp-prettier'),
	typograf = require('gulp-typograf'),
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp'),
	del = require('del'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	babel = require('gulp-babel'),
	imageResize = require('gulp-image-resize');

gulp.task('cut-img', () => {
	return gulp.src('src/img/name/*.jpg')
		.pipe(imageResize({
			width: 458 * 2,
			height: 300 * 2,
			crop : true
		}))
		.pipe(rename({ suffix: '-size' }))
		.pipe(gulp.dest('src/img/name/size/'));
});

gulp.task('scss', () => {
	return gulp.src('src/scss/style.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('dist/templates/olympic-touch/css/'))
		.pipe(csso())
        .pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/templates/olympic-touch/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
	return gulp.src('src/js/*.js')
		.pipe(babel())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/templates/olympic-touch/js/'));
});

gulp.task('njk', () => {
	return gulp.src('src/njk/pages/**/*.njk')
        .pipe(nunjucks({
            path: ['src/njk/layouts']
		}))
		.pipe(typograf({ locale: ['ru', 'en-US'], htmlEntity: { type: 'name' } }))
        .pipe(prettier({ proseWrap: 'never', printWidth: 800, tabWidth: 4, useTabs: true }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('json', () => {
	return gulp.src('src/njk/pages/**/*.json')
        .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', () => {
	return gulp.src('src/fonts/**/*{woff,woff2}')
        .pipe(gulp.dest('dist/templates/olympic-touch/fonts'));
});

gulp.task('img-template', () => {
	return gulp.src('src/img/template/**/*{jpg,png,svg}')
		.pipe(imagemin([
			imagemin.svgo({
				plugins: [
					{cleanupIDs: true}
				]
			}),
			imagemin.optipng({optimizationLevel: 3})
		]))
        .pipe(gulp.dest('dist/templates/olympic-touch/img'));
});

gulp.task('img', () => {
	return gulp.src('src/img/**/*.{jpg,png}')
		.pipe(imagemin([
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 3})
		]))
		.pipe(gulp.dest('dist/img'))
		.pipe(webp())
		.pipe(gulp.dest('dist/img')); 
});

gulp.task('del', () => {
	return del('dist');
});

gulp.task('serve', () => {
	browserSync.init({
		server: "dist",
		routes: {},
        middleware: function (req, res, next) {
            if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() == 'POST') {
                console.log('[POST => GET] : ' + req.url);
                req.method = 'GET';
            }
            next();
        }
    });

    gulp.watch('src/img/template/**/*{jpg,png,svg}', gulp.series('img-template'));
	gulp.watch('src/img/**/*{jpg,png,svg}', gulp.series('img'));

    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/js/*.js', gulp.series('js'));
	gulp.watch('src/njk/**/*.njk', gulp.series('njk'));

	gulp.watch('dist/**/*.js').on('change', browserSync.reload);
	gulp.watch('dist/**/*{jpg,png,svg}').on('change', browserSync.reload);
});

gulp.task('build', gulp.series(
	'del',
	'scss',
	'js',
	'njk',
	'json',
	'fonts',
	'img-template',
	'img'
));

gulp.task('start', gulp.series(
	'build',
	'serve'
));

gulp.task('default', gulp.series('serve'));
