<template>
  <!-- CEchart -->
  <div class="c-echart--main">
    <a-empty v-if="isSeriesEmpty" :image="AEmpty.PRESENTED_IMAGE_SIMPLE">
      <template #description>
        <span>暂无图表数据</span>
      </template>
    </a-empty>

    <Chart v-else v-bind="$props" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { isUndef } from 'u@/check_value';
import Chart from './chart.vue';
import { EChartsOption } from 'echarts';
import { Empty as AEmpty } from 'ant-design-vue';

const props = defineProps({ ...Chart.props });

const isSeriesEmpty = computed(() => (
  isUndef(props.seriesData) || 
  props.seriesData.every((item: EChartsOption) => !item.data)
));
</script>

<style lang="scss">
.c-echart--main {
  .el-empty {
    height: 100%;
  }
}
</style>
