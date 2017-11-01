/**
 * Created by cr on 2017/11/1.
 */

;(function () {
  var sc=mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005
  });
  // console.log(sc);
  // 发送ajax请求动态获取category一级
  $.ajax({
    type: 'get',
    url: "/category/queryTopCategory",
    success:function (data) {
      // console.log(data);
      $('.top_categ_left ul').html( template('tpl',data) );

      render(data.rows[0].id);
      //先渲染了一级分类，所以二级分类
      function render(id) {
      $.ajax({
        type:'get',
        url: "/category/querySecondCategory",
        data:{id:id},
        success: function (data) {
          // console.log(data);
          $('.second_categ_right ul').html( template('tpl2',data) );
        }
      })
    }

      //动态生成的li，必然需要通过事件委托来完成事件绑定
      $('.top_categ_left').on('click','li',function () {
        // alert('呵呵')
        var id = $(this).data('id');
        $(this).addClass('new').siblings().removeClass('new');
        render(id);

        //切换一级类时右侧直接滚动到top 0
        sc[1].scrollTo(0,0,500);
      })
    }
  });

 })();