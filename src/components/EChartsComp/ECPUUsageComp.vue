<style scoped>
.core {
  width: 50%;
  height: 100px;
}

.content-core {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

.echarts-box-courseViewCount {
  width: 100%;
}
</style>

<template>
  <div class="core">
    <div class="content-core">
      <div class="echarts-box-courseViewCount">
        <div ref="coreDom" style="height: 280px; width: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue';
import * as echarts from 'echarts';
import {getCpuUsageRequest} from "../../api/SystemSettingAPIs.ts";

// 接受外部配置

// 创建一个响应式引用来保存DOM元素
const coreDom = ref(null);
let courseViewCountChartInstance: any = null;

/**
 * 初始化ECharts实例并设置配置项
 */
let intervalId: any;

onMounted(() => {
  // 初始化图表
  courseViewCountChartInstance = echarts.init(coreDom.value);

  const option = {
    title: {
      text: '后端CPU占用率',
      subtext: 'CPU usage of the backend',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
      },
      subtextStyle: {
        fontSize: 12,
        color: '#888'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(50,50,50,0.7)',
      borderColor: '#777',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [] as string[],
      boundaryGap: false,
      axisLine: {lineStyle: {color: '#999'}},
      axisLabel: {color: '#666'}
    },
    yAxis: {
      type: 'value',
      axisLine: {lineStyle: {color: '#999'}, formatter: '{value} %'},
      axisLabel: {color: '#666'},
      splitLine: {lineStyle: {color: '#eee'}},

    },
    series: [
      {
        name: 'CPU 占用率',
        type: 'line',
        smooth: true,
        data: [] as number[],
        lineStyle: {
          width: 3,
          color: '#5470C6'
        },
        itemStyle: {
          color: '#5470C6'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(84,112,198,0.4)'},
            {offset: 1, color: 'rgba(84,112,198,0.1)'}
          ])
        },
        symbol: 'circle',
        symbolSize: 6
      }
    ],
    animationDuration: 1000,
    animationEasing: 'cubicOut'
  };


  courseViewCountChartInstance.setOption(option);

  intervalId = setInterval(async () => {
    const res = await getCpuUsageRequest();
    if (courseViewCountChartInstance) {
      option.series[0].data.push(res.data.map.cpuUsage);
      courseViewCountChartInstance.setOption(option);
    }
  }, 2000);
});

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (courseViewCountChartInstance) {
    courseViewCountChartInstance.dispose();
    courseViewCountChartInstance = null;
  }
});
</script>