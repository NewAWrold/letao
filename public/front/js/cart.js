/**
 * Created by cr on 2017/11/4.
 */
;(function () {
 //很尴尬，竟然不知道该怎么写了.
  //目前我很好奇的是，查询端口竟然不需要任何参数就能够将所有假如购物车的数据查出来
// mui.init({
//   pullRefresh : {
   //container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    //down : {
        //auto: true,//可选,默认false.首次加载自动下拉刷新一次
    // contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
    //  callback :function () {

       $.ajax({
         type : "get",
         url : "/cart/queryCart",
         success : function (data) {
           console.log(data);
           setTimeout(function () {
           tools.checkLogin(data);
             $('.infoBox').html( template('tpl',{data:data}) );
           // mui(".infoBox").pullRefresh().endPulldownToRefresh();
           },1000);
          }
         // }) ;


        //} //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
     // }
    // }
  });
 })();



