var id = getKey();
// console.log(id);
$.ajax({
  type : "get",
  url : "/product/queryProductDetail",
  data : {id:id},
  success : function (data) {
    console.log(data);

    var size =data.size.split('-');
    var sizeArray = [];
    for (var i = size[0];i<= size[1];i++){
      sizeArray.push(i);
    }
    // console.log(sizeArray);
    data.sizeArray = sizeArray;

    $('.mui-scroll').html( template("tpl",data) );

    //因为轮播图是动态渲染的，所以我们队轮播图进行操作来放到渲染模板的后面
    mui('.mui-slider').slider({
      interval:1000
    });
    //动态渲染缘故所以需要初始化数量框
    mui('.pro_num').numbox()
  }
 });










function getKey() {
  var search = decodeURI(location.search.slice(1).split("=")[1]);
  return search;
}