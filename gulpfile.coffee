gulp = require('gulp')
connect = require('gulp-connect')

gulp.task "connect", ->
  connect.server
    port: 1337
    livereload: true

gulp.task 'html', ->
  gulp
    .src(['*.html'])
    .pipe(connect.reload())

gulp.task 'js', ->
  gulp
  .src(['js/*.js'])
  .pipe(connect.reload())

gulp.task 'watch', ->
  gulp.watch ['*.html', 'css/*.css'], ['html']
  gulp.watch ['js/*.js'], ['js']

gulp.task 'default', ['connect', 'watch']