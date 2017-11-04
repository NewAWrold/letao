/**
 * Created by cr on 2017/11/1.
 */
mui('.mui-scroll-wrapper').scroll({
  indicators: false,
});

//封装验证登录模块
var tools={
  checkLogin:function (data) {
    if (data.error ==400){
      mui.toast("您尚未登录，自动跳转到登录页中...");
      setTimeout(function () {
        location.href = "login.html?retUrl="+location.href;
      },1000);
      return false;
    }
  }
};
