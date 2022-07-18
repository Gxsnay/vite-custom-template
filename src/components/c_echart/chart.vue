<template>
  <!-- Chart -->
  <div id="chart" ref="myChart"/>
</template>

<script setup lang="ts">
import ElResizeListener from 'element-resize-detector';
import {
  init, EChartsType, EChartsOption
} from 'echarts';
import {
  defineProps, ref, watch, onMounted, onUnmounted, computed
} from 'vue';
import { hasSymbol } from 'u@/check_value';
import { useChartStore } from "x@/chart";
import { BASIC_OPTION } from './default_option';

const props = defineProps({
  // 业务数据。
  seriesData: {
    type: Array,
    required: true,
    default: () => []
  },
  // 额外配置
  extraOption: {
    type: Object,
    default: () => {}
  },
  needDefault: {
    type: Boolean,
    default: true
  }
});

const myChart = ref<HTMLElement | null>(null);
let chart: EChartsType | null = null; // 这样就可以解决 type resize 问题
/**
 * 将业务数据 加入到 基础样式配置 中
 * @return { Object } 完整的 echart 配置
 */
function assembleDataToOption() {
  const { seriesData, needDefault } = props;
  const optionsKeys = hasSymbol
    ? Reflect.ownKeys(props.extraOption)
    : Object.keys(props.extraOption);

  let options;
  if (!optionsKeys.length && !needDefault) {
    options = {};
  } else if (optionsKeys.length && !needDefault) {
    options = { ...props.extraOption };
  } else {
    options = {
      ...BASIC_OPTION,
      ...props.extraOption
    };
  }
  let seriesModel = null;
  if (Array.isArray(seriesData) && seriesData.length) {
    seriesModel = {
      series: seriesData
    };
  }
  /**
   * 优先级: seriesData > extraOption.series
   */
  seriesModel && (
    options = {
      ...options,
      ...seriesModel
    }
  );
  return options;
}

/**
 * echart 动态调整自身大小
 */
function handleChartResize() {
  if (!chart) return;
  chart.resize();
}

/**
 * 对 当前chart组件 尺寸进行监听，当发生变化时 同步更新 echart 视图
 */
function chartResizeListener() {
  const instance = ElResizeListener({
    strategy: 'scroll',
    callOnAdd: true
  });

  instance.listenTo(myChart.value!, () => {
    handleChartResize();
  });
}

/**
 * 更新 echart 视图
 */
function updateChartView() {
  if (!chart) return;

  const fullOption = assembleDataToOption();
  chart.setOption(fullOption, true);
}

watch(() => props.seriesData,
  () => {
    updateChartView();
  }, {
    deep: true
  });
// 手动调用 图表 更新
const chartStore = useChartStore();
const chartUpdateTag = computed(() => chartStore.chartUpdateTag);
watch(() => chartUpdateTag.value,
  () => {
    updateChartView();
  });

onMounted(() => {
  chart = init(myChart.value!);

  updateChartView();
  window.addEventListener('resize', () => {
    handleChartResize();
  });
  chartResizeListener();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleChartResize);
});

</script>

<style lang="scss" scoped>
#chart {
  width: 100%;
  height: 100%;
}
</style>
