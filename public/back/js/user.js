/**
 * Created by cr on 2017/10/30.
 */
$(function () {

  var currentPage = 1;
  var pageSize = 5;
  function render(){
  $.ajax({
    type: "get",
    url: "/user/queryUser",
    data: {'page': currentPage, 'pageSize': pageSize},
    success: function (data) {
      // console.log(data);
      var html = template('ple', data);
      $('tbody').html(html);

      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:currentPage,//当前页
        totalPages:Math.ceil(data.total/pageSize),//总页数
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          currentPage = page;
          render();
        }
      });
    }
  })
  }
  render();

//因为数据是通过模板引擎动态渲染出来的，我们给他设置点击事件的是够必须使用事件委托
  $('tbody').on('click','.btn',function () {
    // console.log(111);
    $("#updateModal").modal("show");
    var id = $(this).parent().data("id");
    var isDelete = $(this).parent().data("isDelete");
    isDelete = isDelete==1? 0:1;
    // console.log(isDelete);
    // console.log($(this).parent());
    //因为模态框中的btn类都是一样的，所以我们要在模态框按钮事件前将委托事件解绑掉
    $('.btn_update').off().on('click',function () {
      // console.log("呵呵");
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {"id":id,"isDelete":isDelete},
        success: function (data) {
          // console.log(data);
          if (data.success){
            $('#updateModal').modal('hide');
            render();
          }
        }
      })
    })
  })
});