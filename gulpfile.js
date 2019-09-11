const gulp = require('gulp');//本地安装gulp
const	less = require("gulp-less"); //less插件
const autoprefixer = require('gulp-autoprefixer'); //补全浏览器前缀
const babel = require('gulp-babel'); // es6转换es5
gulp.task('less', function () {
  gulp.src('./less/**/*.less')  // 找到less文件夹下的所有的less文件
  .pipe(less()) // 会将less文件处理为css文件
  .pipe(autoprefixer()) //补全浏览器前缀 在package.json browserslist 设置
  .pipe(gulp.dest(function (file) {
    return file.base  // 将**.min.css处理完后把文件放回原始目录;   gulp.dest(dist/css)  dist/css 没有的文件，会自动创建
  })) 
})

gulp.task('es6', () => {
  return gulp.src('./js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(function (file) {
      return file.base  
    }));
});

gulp.task('watch',()=>{// 自动监听事件
  gulp.watch('./less/**/*.less',['less'])  //如果监听到less文件夹内有内容发生变化，触发less任务
  gulp.watch('./js/**/*.js',['es6'])  //如果监听到js文件夹内有内容发生变化，触发ljs任务
})

gulp.task('build', ['less'], function () {
  console.log('ok')
})

gulp.task('default', ['build', 'watch']);  //gulp 默认执行default   build任务和watch任务