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
	imageResize = require('gulp-image-resize'),
	webp = require('gulp-webp'),
	del = require('del'),
    browserSync = require('browser-sync').create();

gulp.task('scss', () => {
	return gulp.src('src/scss/style.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('dist/templates/olympic-touch/css/'))
        .pipe(browserSync.stream())
		.pipe(csso())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/templates/olympic-touch/css/'));
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

gulp.task('img-slider-large', () => {
	return gulp.src('src/img/slider/*.jpg')
		.pipe(imageResize({
			width: 1200,
			height: 800,
			crop : true
		}))
		.pipe(gulp.dest('dist/img/slider'));
});
gulp.task('img-slider-medium', () => {
	return gulp.src('src/img/slider/*.jpg')
		.pipe(imageResize({
			width: 999,
			height: 585,
			crop : true
		}))
		.pipe(rename({ suffix: '-medium' }))
		.pipe(gulp.dest('dist/img/slider'));
});
gulp.task('img-slider-medium-retina', () => {
	return gulp.src('src/img/slider/*.jpg')
		.pipe(imageResize({
			width: 1200,
			height: 800,
			crop : true
		}))
		.pipe(rename({ suffix: '-medium@2x' }))
		.pipe(gulp.dest('dist/img/slider'));
});
gulp.task('img-slider-small', () => {
	return gulp.src('src/img/slider/*.jpg')
		.pipe(imageResize({
			width: 767,
			height: 767,
			crop : true
		}))
		.pipe(rename({ suffix: '-small' }))
		.pipe(gulp.dest('dist/img/slider'));
});
gulp.task('img-slider-small-retina', () => {
	return gulp.src('src/img/slider/*.jpg')
		.pipe(imageResize({
			width: 1200,
			height: 800,
			crop : true
		}))
		.pipe(rename({ suffix: '-small@2x' }))
		.pipe(gulp.dest('dist/img/slider'));
});
gulp.task('img-slider-optimize', () => {
	return gulp.src('dist/img/slider/*.jpg')
		.pipe(imagemin([
			imagemin.mozjpeg({quality: 75, progressive: true}),
		]))
		.pipe(gulp.dest('dist/img/slider'))
		.pipe(webp())
		.pipe(gulp.dest('dist/img/slider')); 
});
gulp.task('img-slider', gulp.series(
	'img-slider-large',
	'img-slider-medium',
	'img-slider-medium-retina',
	'img-slider-small',
	'img-slider-small-retina',
	'img-slider-optimize'
));

gulp.task('img-actions-large', () => {
	return gulp.src('src/img/actions/*.jpg')
		.pipe(imageResize({
			width: 458,
			height: 352,
			crop : true
		}))
		.pipe(gulp.dest('dist/img/actions'));
});
gulp.task('img-actions-large-retina', () => {
	return gulp.src('src/img/actions/*.jpg')
		.pipe(imageResize({
			width: (458 * 2),
			height: (352 * 2),
			crop : true
		}))
		.pipe(rename({ suffix: '@2x' }))
		.pipe(gulp.dest('dist/img/actions'));
});
gulp.task('img-actions-medium', () => {
	return gulp.src('src/img/actions/*.jpg')
		.pipe(imageResize({
			width: 470,
			height: 457,
			crop : true
		}))
		.pipe(rename({ suffix: '-medium' }))
		.pipe(gulp.dest('dist/img/actions'));
});
gulp.task('img-actions-medium-retina', () => {
	return gulp.src('src/img/actions/*.jpg')
		.pipe(imageResize({
			width: (470 * 2),
			height: (457 * 2),
			crop : true
		}))
		.pipe(rename({ suffix: '-medium@2x' }))
		.pipe(gulp.dest('dist/img/actions'));
});
gulp.task('img-actions-small', () => {
	return gulp.src('src/img/actions/*.jpg')
		.pipe(imageResize({
			width: 710,
			height: 523,
			crop : true
		}))
		.pipe(rename({ suffix: '-small' }))
		.pipe(gulp.dest('dist/img/actions'));
});
gulp.task('img-actions-small-retina', () => {
	return gulp.src('src/img/actions/*.jpg')
		.pipe(imageResize({
			width: (710 * 2),
			height: (523 * 2),
			crop : true
		}))
		.pipe(rename({ suffix: '-small@2x' }))
		.pipe(gulp.dest('dist/img/actions'));
});
gulp.task('img-actions-optimize', () => {
	return gulp.src('dist/img/actions/*.jpg')
		.pipe(imagemin([
			imagemin.mozjpeg({quality: 75, progressive: true}),
		]))
		.pipe(gulp.dest('dist/img/actions'))
		.pipe(webp())
		.pipe(gulp.dest('dist/img/actions')); 
});
gulp.task('img-actions', gulp.series(
	'img-actions-large',
	'img-actions-large-retina',
	'img-actions-medium',
	'img-actions-medium-retina',
	'img-actions-small',
	'img-actions-small-retina',
	'img-actions-optimize'
));

gulp.task('img-contacts-optimize', () => {
	return gulp.src('src/img/contacts/*{jpg,png}')
		.pipe(imagemin([
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 3})
		]))
		.pipe(gulp.dest('dist/img/contacts'))
		.pipe(webp())
		.pipe(gulp.dest('dist/img/contacts')); 
});
gulp.task('img-contacts', gulp.series(
	'img-contacts-optimize'
));

gulp.task('img', gulp.series(
	'img-template',
	'img-slider',
	'img-actions',
	'img-contacts'
));

gulp.task('del', () => {
	return del('dist');
});

gulp.task('serve', () => {
	browserSync.init({
        server: "dist"
    });

    gulp.watch('src/img/**/*{jpg,png,svg}', gulp.series('img'));
    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
	gulp.watch('src/njk/**/*.njk', gulp.series('njk'));
});

gulp.task('build', gulp.series(
	'del',
	'scss',
	'njk',
	'fonts',
	'img'
));

gulp.task('start', gulp.series(
	'build',
	'serve'
));

gulp.task('default', gulp.series('serve'));
