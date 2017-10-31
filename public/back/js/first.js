/**
 * Created by cr on 2017/10/31.
 */
;(function () {
  var currentPage = 1;
  var pageSize =2;
  function render(){
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data:{"page":currentPage,"pageSize":pageSize},
      success: function (data) {
        $('tbody').html(template('topCate',data));
        // console.log(data);

        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(data.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage =page;
            render();
          }
        });
      }
    })
  }
  render();
  $('.add_btn').on('click',function () {
    $('#addFirstModal').modal('show');
  });
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '一级分类不能为空'
          }
        }
      },
    }
  });
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    // console.log(e);
    //使用ajax提交添加到数据库中
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("#form").serialize(),
      success: function (data) {
        // console.log(data);
        if (data.success){
          $('#addFirstModal').modal('hide');
          //渲染到第一页
          currentPage =1;
          render();
        //reset方法是js方法，需转换
          $('#form')[0].reset();
          //重置表单
          var validator = $("#form").data('bootstrapValidator');  //获取表单校验实例
          // validator.methodName(params);
          validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
        }
      }
    })
  });
})();