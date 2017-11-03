/**
 * Created by cr on 2017/11/3.
 */
//首先做什么，我们先通过地址栏的切割将key的值拿到
//在通过ajax请求相应api接口，再来渲染末班
;(function () {
  var data={
    page : 1,
    pageSize : 100,
    proName : "",
    price : "",
    num : "",
    brandId : ""
  };
  data.proName = getKey();
  render(data);
  //点击搜索按钮
  $('.lt_go').on('click',function () {
    var val = $('.lt_text').val().trim();
    // console.log(val);
    if (val == 0){
      mui.toast("亲，特么不输内容我显示鬼么")
    }
    data.proName = val;
    render(data);
  });

//点击价格按钮进行价格升序和降序，库存同之
//这个确实有点难以理解
  $('.lt_row>a[data-type]').on('click',function () {
    // console.log(123);
    if ($(this).hasClass('now')){
      $(this).children().toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }else {
      $(this).addClass('now').siblings().removeClass('now');
      $(".lt_row").find('span').removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    //怎么写？想一想，首先取price和num，再将值赋予给他们
    var type = $(this).data('type');
    //console.log(type)//拿到price和Num
    var value = $(this).children().hasClass("fa-angle-down")? 2 : 1;
    data[type] = value;
    render(data);
  });




  function getKey() {
    var search = decodeURI(location.search.slice(1).split("=")[1]);
    return search;
  }
  function render(info) {
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: info,
      success:function (data) {
        console.log(data);
        setTimeout(function () {
          $('.product_info').html( template('tpl',data) );
        },1000)

        //点击排序
      }
    })
  }
 })();