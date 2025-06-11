<style scoped>
.core {
  width: 100%;
  height: 100px;
}

.content-core {
  padding: 12px;
  background: linear-gradient(to right, #ffffff, #f5f5f5, #ffffff);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

.echarts-box-courseViewCount {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="core">
    <div class="content-core">
      <div class="echarts-box-courseViewCount">
        <div ref="coreDom" style="height: 400px; width: 400px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, nextTick} from 'vue';
import * as echarts from 'echarts';
import {getAllCourseDataECharts} from "../../api/CourseAPIs.ts";

// 接受外部配置

// 创建一个响应式引用来保存DOM元素
const coreDom = ref(null);
let courseViewCountChartInstance: any = null;

/**
 * 初始化ECharts实例并设置配置项
 */
onMounted(async () => {
  await nextTick(); // 确保DOM已经渲染完成
  // _________________启动区______________________
  courseViewCountChartInstance = echarts.init(coreDom.value);
  // ____________________________________________
  // _________________配置区______________________
  const option = {
    xAxis: {},
    // 对原始数据执行线性回归
    transform: {
      type: 'ecStat:regression',
      config: {method: 'linear'} // 线性回归
    },
    yAxis: {},
    title: {
      text: '课程价格与购买量关系',
      subtext: 'The price of the course is related to the amount purchased',
      left: 'center'
    },
    series: [
      {
        symbolSize: 20,
        data: [
          [10.0, 8.04],
        ],
        type: 'scatter'
      }
    ]
  };
  // ____________________________________________
  // _________________请求区______________________
  await getAllCourseDataECharts().then((res: any) => {
    option.series[0].data = res.data.map.buyCountList.map((item: any, index: any) => {
      return [res.data.map.priceList[index], item]
    })
  })
  // ____________________________________________
  // _________________加载区______________________
  courseViewCountChartInstance.setOption(option);
  // ____________________________________________

});

// 销毁ECharts实例
onUnmounted(() => {
  if (courseViewCountChartInstance != null && courseViewCountChartInstance.dispose) {
    courseViewCountChartInstance.dispose();
  }
});
</script>