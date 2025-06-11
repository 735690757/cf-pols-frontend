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
        <div ref="coreDom" style="height: 400px; width: 100%;"></div>
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
    title: {
      text: '系统内课程浏览量统计',
      subtext: 'Statistics on the number of course views in the system'
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        rotate: 45,
        interval: 0,
        show: false,
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        label: {
          show: true,  // 显示标签
          rotate: 20,
          position: 'top',
          fontSize: 12,
          formatter: '{b}'  // 使用X轴对应的类别名称
        }
      }
    ]
  };
  // ____________________________________________
  // _________________请求区______________________
  await getAllCourseDataECharts().then((res: any) => {
    // console.log(res.data.map)
    const titles = res.data.map.courseTitleList
    const views = res.data.map.viewCountList
    // 联合两个数组为一个数组的数组：[[title1, view1], [title2, view2], ...]
    const combined = titles.map((title: string, index: number) => ({
      title,
      view: views[index]
    }))
    // 按照 view 排序（降序）
    combined.sort((a: any, b: any) => b.view - a.view)
    type CourseData = {
      title: string;
      view: number;
    };

    // 拆分排序后的数据
    option.xAxis.data = combined.map((item: CourseData) => item.title.slice(0, 4) + '...')
    option.series[0].data = combined.map((item: { title: string; view: number }) => item.view)
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