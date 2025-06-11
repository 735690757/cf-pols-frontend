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
        <div ref="coreDom" style="height: 300px; width: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, nextTick} from 'vue';
import * as echarts from 'echarts';
import {getCourseFundTrendRequest} from "../../api/DataVisualAPIs.ts";

// 接受外部配置
const props = defineProps({
  cid: {
    type: Number,
    default: () => []
  }
});

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
    title: {
      text: '课程订单趋势',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      textStyle: {
        color: '#333'
      }
    },
    legend: {
      data: ['每日订单', '累计订单'],
      top: '10%'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [] as string[],
      axisLine: {
        lineStyle: {
          color: '#888'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#888'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#ccc'
        }
      }
    },
    series: [
      {
        name: '每日订单',
        type: 'line',
        smooth: true,
        data: [] as string[],
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#5470C6'
        },
        areaStyle: {
          color: 'rgba(84, 112, 198, 0.2)'
        }
      },
      {
        name: '累计订单',
        type: 'line',
        smooth: true,
        data: [] as string[],
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#91CC75'
        },
        areaStyle: {
          color: 'rgba(145, 204, 117, 0.2)'
        }
      }
    ]
  };


  // ____________________________________________
  // _________________请求区______________________
  await getCourseFundTrendRequest(props.cid).then((res) => {
    console.log(res.data.data)
    for (const data of res.data.data) {
      option.xAxis.data.push(data.date)
      option.series[0].data.push(data.nowDayCount)
      option.series[1].data.push(data.cumulativeOrderCount)
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