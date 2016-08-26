var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
	return gulp.src('./public/assets/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/assets/'));
});

gulp.task('sass-watch', function () {
	gulp.watch('./public/assets/scss/**/*.scss', ['sass']);
});


gulp.task('dev', ['sass', 'sass-watch'], function() {
});