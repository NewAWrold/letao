
$('.login_go').on('click',function () {
  // console.log('呵呵！');
  if (!$('#username').val()||!$('#password').val()){
    mui.toast('please input content!');
    return false;
  }
  var search = location.search.replace('?retUrl=',"");
  // console.log(search);

  $.ajax({
    type : "POST",
    url : "/user/login",
    data : $('#form').serialize(),
    success : function (data) {
      // console.log(data);
      if (data.success){
        location.href = search;
      }else {
        mui.toast('用户名或者密码错误 ！');
      }
    }
  })
});