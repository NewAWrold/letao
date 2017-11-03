/**
 * Created by cr on 2017/11/2.
 */
;(function () {
//1.先把缓存中的数据获取到，获得的数据是json字符串，我们需要转换成数据，再返回
// localStorage.setItem("lt_search_history",'["李宁","耐克"]');
// localStorage.setItem("lt_search_history", '["阿迪","安踏","特步","李宁","N百伦","361", "wfew"]');
function getHistory() {
  var search_history = localStorage.getItem("lt_search_history") || "[]";
  // console.log(typeof search_history);
  var arr = JSON.parse(search_history);
  return arr;
}
getHistory();
function render() {
  var arr = getHistory();
  //模版第二个参数：必须是对象，因为在模版中是直接通过对象的属性来获取。
  $(".lt_history").html(template("tpl", {arr: arr}));
}
// console.log(localStorage.getItem("lt_search_history"));
render();

$('.lt_history').on('click','.icon_empty',function () {
  // console.log("hehe");
  //清空按钮直接清空所有localStorage数据
  localStorage.removeItem("lt_search_history");
  render();
});

$('.lt_history').on('click','.fa-close',function () {
  // console.log('某年某月某天');
  var arr = getHistory();
  var index = $(this).data('index');
  // console.log(index);
  //arr是json数据,必须是字符串
  //这样不行，不能单个数据删除，一经过removeItem就是全部删除
  // localStorage.removeItem("lt_search_history",JSON.stringify(arr[index]));

  //我们通过splice切割掉arr中的第index的数据，返回一个新数组，再重新渲染
  arr.splice(index,1);
  //因为该数据是一个json对象，我们需要转换成字符串
  localStorage.setItem("lt_search_history",JSON.stringify(arr));
  render();

});

$('.lt_go').on('click',function () {
  //获取text文本框的内容并去空格
  var val = $(".lt_text").val().trim();
  if (val==""){
    mui.toast("特么还能不能好好地玩耍了")
    return false;
  }
  var arr = getHistory();
  //indexOf返回的是所查找到的下标,获得下标
  var index = arr.indexOf(val);
  //满足上述要求，我们就要判断数据是否重复还有是否超过10个
  if (index != -1){
    // alert("哈哈，找到一样的了!");
    //删除掉arr里的重复项
    arr.splice(index,1);
    //再将新搜索功能unshift到arr里,但是现在判断还没结束
  }
  if (arr.length>10){
    arr.pop();
    // localStorage.setItem("lt_search_history",arr);
    // render()
  }
  arr.unshift(val);
  localStorage.setItem("lt_search_history",JSON.stringify(arr));
  render();

  //我要把val值传到后台去
  location.href = "searchList.html?key="+val;
})
//


})();