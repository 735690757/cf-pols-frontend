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
        <div ref="courseViewCountChartDom" style="height: 100px; width: 100%;"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, nextTick} from 'vue';
import * as echarts from 'echarts';

// 接受外部配置
const props = defineProps({
  coreText: {
    type: String,
    default: 'Nnn'
  },
  fontSize: {
    type: Number,
    default: 40
  }
});


// 创建一个响应式引用来保存DOM元素
const courseViewCountChartDom = ref(null);
let courseViewCountChartInstance: any = null;

/**
 * 初始化ECharts实例并设置配置项
 */
onMounted(async () => {
  await nextTick(); // 确保DOM已经渲染完成
  // _________________启动区______________________
  courseViewCountChartInstance = echarts.init(courseViewCountChartDom.value);
  // ____________________________________________
  // _________________配置区______________________
  const option = {
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: props.coreText,
            fontSize: props.fontSize,
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#000',
            lineWidth: 1
          },
          keyframeAnimation: {
            duration: 2000,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transparent',
                  lineDashOffset: 200,
                  lineDash: [200, 0]
                }
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: 'transparent'
                }
              },
              {
                percent: 1,
                style: {
                  fill: 'black'
                }
              }
            ]
          }
        }
      ]
    }
  };
  // ____________________________________________
  // _________________请求区______________________
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