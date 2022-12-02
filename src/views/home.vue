<script setup lang="ts">
import {
  Timeline as ATimeline,
  TimelineItem as ATimelineItem,
} from "ant-design-vue";
// 引入 echart 示例
// import CEchart from 'c@/c_echart/index.vue';
</script>

<template>
  <div id="home">
    <img src="../assets/logo-vite.png" alt="">
    <h2>Vite-Custom-Template</h2>
    <a-timeline>
      <a-timeline-item>搭配 AntD Vue 框架</a-timeline-item>
      <a-timeline-item>默认引入 Pinia、Vue-router、Echarts、Dayjs... 等组件库</a-timeline-item>
      <a-timeline-item>封装了一些常用的 Chart、Button、Table 等组件</a-timeline-item>
      <a-timeline-item>对 Axios 以及 TS Config 做了默认配置</a-timeline-item>
      <a-timeline-item>Vite常用配置处理（例：环境变量、请求代理 等...）</a-timeline-item>
    </a-timeline>

    <!-- <router-link to="/demo">
      <span class="demo-text">组件示例演示</span>
    </router-link> -->
  </div>
  <!-- 引入 echart 示例 -->
  <!-- <c-echart :series-data="[]" :extra-option="{}" /> -->
</template>

<style lang='scss'>
#home {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;

  img {
    width: 200px;
    height: 200px;
    margin-top: 50px;
  }

  h2 {
    font-size: 26px;
    padding: 10px 0 25px;
  }

  .ant-timeline-item-content {
    font-size: 16px;
  }

  .demo-text {
    color: #f56f85;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
