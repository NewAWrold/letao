/**
 * Created by cr on 2017/10/29.
 */
//进度条在ajax请求开始时开始，结束时结束
$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  setTimeout(function () {
  NProgress.done();
  },500)
});