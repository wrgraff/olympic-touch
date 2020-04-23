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
	del = require('del'),
    browserSync = require('browser-sync').create();

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

gulp.task('del', () => {
	return del('dist');
});

gulp.task('serve', () => {
	browserSync.init({
        server: "dist"
    });

    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
	gulp.watch('src/njk/**/*.njk', gulp.series('njk'));
});

gulp.task('build', gulp.series(
	'del',
	'scss',
	'njk'
));

gulp.task('start', gulp.series(
	'build',
	'serve'
));

gulp.task('default', gulp.series('serve'));
