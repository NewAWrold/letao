/**
 * Created by cr on 2017/10/29.
 */
//没有页面都要判断是否登录了
if (location.href.indexOf("login.html")==-1){
  // console.log('hahah');
$.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  success: function (data) {
    // console.log(data);
    if (data.error == 400){
    location.href = "login.html";
    }
  }
});
}

//进度条在ajax请求开始时开始，结束时结束
$(document).ajaxStart(function () {
  NProgress.start();
});
$(document).ajaxStop(function () {
  setTimeout(function () {
  NProgress.done();
  },500)
});

//点击分类管理显示二级分类
$(".shtwo").on("click",function () {
  // $(this).siblings().css({style:"display;'block'"});
  $(this).siblings().slideToggle();
  // $(this).siblings().css({"width":"500px"});
});

//点击manage高亮
$('.manage').find('li').on("click",function () {
  $(this).addClass("new").siblings().removeClass("new");
  $('.manage').find('li').eq(1).removeClass("new");
});

//点击隐藏左边栏
$('.glyphicon-align-justify').on('click',function () {
  $('.lt_aside').toggleClass("ml-180");
  $('.lt_right').toggleClass('ml0');
});

//模态框
$(".glyphicon-log-out").on("click", function () {
  $("#logoutModal").modal("show");
});

//模态框退出功能
$('.btn_logout').on('click',function () {
  $.ajax({
    type : "get",
    url : '/employee/employeeLogout',
    success : function (data) {
      if (data.success){
      location.href = "login.html";
    }
    }
  })
});
