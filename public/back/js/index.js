/**
 * Created by cr on 2017/10/29.
 */
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
  title: {
    text: '2017年注册人数'
  },
  tooltip: {},
  legend: {
    data:['人数']
  },
  xAxis: {
    data: ["1月","2月","3月","4月","5月","6月"]
  },
  yAxis: {},
  series: [{
    name: '人数',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

var myChart2 = echarts.init(document.getElementById('main2'));
option2 = {
  title : {
    text: '热门品牌销售',
    subtext: '2017年10月',
    x:'center'
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['耐克','阿迪','百伦','李宁','乔丹']
  },
  series : [
    {
      name: '比重',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[
        {value:335, name:'耐克'},
        {value:310, name:'阿迪'},
        {value:234, name:'百伦'},
        {value:135, name:'李宁'},
        {value:1548, name:'乔丹'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
myChart2.setOption(option2);