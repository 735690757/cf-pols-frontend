<style scoped>
.core {
  width: 400px;
  height: 228px;
  padding: 10px;

}
.core::before{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  filter: blur(25px);
  background-color: rgba(228, 153, 255, 0.13);
  background-image: radial-gradient(at 47% 69%, hsla(17, 62%, 65%, 0.25) 0px, transparent 50%),
  radial-gradient(at 9% 32%, hsla(222, 75%, 60%, 0.13) 0px, transparent 50%);
}
</style>
<template>
  <div class="core" ref="coreBlock">
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, nextTick} from 'vue';
import * as echarts from 'echarts';
import {getUserLoginLogTimes} from "../../api/UserAPIs.ts";


// 创建一个响应式引用来保存DOM元素
const coreBlock = ref(null);
let courseViewCountChartInstance: any = null;

/**
 * 初始化ECharts实例并设置配置项
 */
onMounted(async () => {
  await nextTick(); // 确保DOM已经渲染完成
  // _________________启动区______________________
  courseViewCountChartInstance = echarts.init(coreBlock.value);
  // ____________________________________________
  // _________________配置区______________________
  const option = {
    title: {
      text: '每日登录次数'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    // legend: {
    //   data: ['login']
    // },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [''],
        axisLabel: {
          rotate: 45,

        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'login',
        type: 'line',
        smooth: true,
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [0]
      }
    ]
  };
  // ____________________________________________
  // _________________请求区______________________
  await getUserLoginLogTimes().then((res: any) => {
    let loginTimes: any[];
    loginTimes = res.data.data
    option.xAxis[0].data.pop()
    option.series[0].data.pop()
    for (const loginTime of loginTimes) {
      option.xAxis[0].data.push(loginTime.date)
      option.series[0].data.push(loginTime.time)
    }
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
