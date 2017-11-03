/**
 * Created by cr on 2017/11/2.
 */
;(function () {
  //请求数据
var currentPage = 1;
var pageSize = 5;
var imgArray = [];
var $form = $('#form');
function render() {
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetailList',
    data: {page:currentPage,pageSize:pageSize},
    success: function (data) {
      // console.log(data);
      $('tbody').html(template('tpl',data));
      $("#pagintor").bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage:currentPage,
        totalPages:Math.ceil(data.total/pageSize),
        size:"small",
        onPageClicked:function(a, b, c,page){
          currentPage = page;
          render();
        }
      });

    }
  })
}
render();

$('.add_btn').on('click',function () {
  $('#addModal').modal('show');
  //查询二级分类，将有用的元素保存下来
  $.ajax({
    type:"get",
    url:" /category/querySecondCategoryPaging",
    data:{page:1,pageSize:100},
    success: function (data) {
      console.log(data);
      $('.dropdown-menu').html(template('tpl2',data));
    }
  })

})

  //注册委托点击事件，改显示参数，传id并验证通过
$('.dropdown-menu').on('click','a',function () {
  // alert($(this).data('id'));
  $('.dropdown-text').text($(this).text() );
  $('#brandId').val($(this).data('id'));
  $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
});

//图片上传
$('#fileupload').fileupload({
  dataType:'json',
  done: function (e,data) {
    console.log(data);
    $('.img_box').append('<img src="'+data.result.picAddr+'" width="100" height="100">');
    imgArray.push(data.result);
    console.log(data.result);
    if (imgArray ===3){
      $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
    } else {
      $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
    }
  }
});
// 验证
  $form.bootstrapValidator({
    //默认不校验的配置
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            //必须是0以上的数字
            regexp: /^[1-9]\d*$/,
            message: "请输入一个大于0的库存"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺寸"
          },
          regexp: {
            //33-55
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入正确的尺码（30-50）"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品的原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品的折扣价"
          }
        }
      },
      productLogo: {
        validators: {
          notEmpty: {
            message: "请上传3张商品图片"
          }
        }
      }
    }
  });

  $form.on("success.form.bv", function (e) {
    e.preventDefault();

    var param = $form.serialize();
    //还需要拼接3张图片的地址
    param += "&picName1="+imgArray[0].picName+"&picAddr1="+imgArray[0].picAddr;
    param += "&picName2="+imgArray[1].picName+"&picAddr2="+imgArray[1].picAddr;
    param += "&picName3="+imgArray[2].picName+"&picAddr3="+imgArray[2].picAddr;

    //发送ajax请求了
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:param,
      success:function (data) {
        if(data.success){
          //关闭模态框
          $("#addModal").modal("hide");

          //渲染第一页
          currentPage = 1;
          render();

          //重置表单与样式
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();

          $(".dropdown-text").text("请选择二级分类");
          $(".img_box img").remove();
          imgArray = [];


        }
      }
    })

  });

})();