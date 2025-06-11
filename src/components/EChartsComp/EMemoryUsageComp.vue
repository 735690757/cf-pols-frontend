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
  display: flex;
  justify-content: center;
  align-items: center;
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
import {ref, onMounted, onUnmounted, nextTick} from 'vue';
import * as echarts from 'echarts';
import {getMemoryUsageRequest} from "../../api/SystemSettingAPIs.ts";

// 接受外部配置

// 创建一个响应式引用来保存DOM元素
const coreDom = ref(null);

/**
 * 初始化ECharts实例并设置配置项
 */
let chartInstance: echarts.ECharts | null = null;
let intervalTimer: any = null;

onMounted(async () => {
  await nextTick();

  const dom = coreDom.value;
  if (!dom) return;

  // 如果已存在旧实例，先销毁
  if (chartInstance) {
    chartInstance.dispose();
  }

  chartInstance = echarts.init(dom);

  const option = {
    title: {
      text: '内存使用情况',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      bottom: '0%',
      left: 'center'
    },
    series: [
      {
        name: '内存',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 24,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: []
      }
    ]
  };

  chartInstance.setOption(option);

  intervalTimer = setInterval(async () => {
    const res = await getMemoryUsageRequest();
    if (!chartInstance) return;

    chartInstance.setOption({
      series: [{
        data: [
          {value: res.data.map.memoryUsage, name: '已分配'},
          {value: 100 - res.data.map.memoryUsage, name: '待使用'}
        ]
      }]
    });
  }, 2000);
});

onUnmounted(() => {
  // 清除定时器
  if (intervalTimer) {
    clearInterval(intervalTimer);
    intervalTimer = null;
  }

  // 销毁实例
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});

</script>