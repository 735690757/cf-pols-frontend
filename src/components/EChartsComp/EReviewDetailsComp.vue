<style scoped>
.core {
  width: 100%;
  height: 100px;
}

.content-core {
  padding: 12px;
  background-image: radial-gradient(circle, rgba(194, 187, 244, 0.38), rgba(238, 237, 250, 0), rgba(255, 255, 255, 0.02));
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
        <div ref="coreDom" style="height: 390px; width: 400px;"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted, nextTick} from 'vue';
import * as echarts from 'echarts';
import {getCourseScoreRequest} from "../../api/DataVisualAPIs.ts";

// 接受外部配置
const props = defineProps({
  cid: {
    type: Number,
  },
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
      text: '学生全体评价详情',
      subtext: 'Details of the overall student evaluation',
      left: 'right'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '身份',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {value: 1048, name: 'Search Engine'},
          {value: 735, name: 'Direct'},
          {value: 300, name: 'Video Ads'}
        ],
      }
    ]
  };
  // ____________________________________________
  // _________________请求区______________________
  await getCourseScoreRequest(props.cid).then((res: any) => {
    const data = ref({
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
      score5: 0
    });
    data.value = res.data.data;
    option.series[0].data = [{
      value: data.value.score1,
      name: '非常不满意'
    }, {
      value: data.value.score2,
      name: '不满意'
    }, {
      value: data.value.score3,
      name: '一般'
    }, {
      value: data.value.score4,
      name: '满意'
    }, {
      value: data.value.score5,
      name: '非常满意'
    }];
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