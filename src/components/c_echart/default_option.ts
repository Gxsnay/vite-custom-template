import { EChartsOption } from "echarts";

const monthData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type toolboxType = {
  toolbox: {
    feature: {
      magicType: {
        type?: string[]
      }
    }
  }
}
type uniEChartsOption = EChartsOption | toolboxType;

const BASIC_OPTION: uniEChartsOption = {
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      magicType: {
        show: true,
        type: ['stack', 'tiled'],
      },
      saveAsImage: {
        name: `关于特征-${+new Date()}`
      }
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: monthData
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '示例展示',
      type: 'line',
      stack: '总量',
      smooth: true, // 弧线
      data: [120, 132, 101, 134, 90, 230, 210, 300, 160, 30, 201, 980]
    },
    {
      name: '示例展示2',
      type: 'line',
      stack: '总量',
      smooth: true, // 弧线
      data: [910, 210, 108, 191, 120, 80, 166, 891, 320, 80, 110, 220]
    }
  ]
};

export { BASIC_OPTION };
export default BASIC_OPTION;
