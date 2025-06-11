<style scoped>
.course-statistics-core {
  width: 100%;
}

.content-core {
  padding: 12px;
  background: #ffffff;
  min-height: 560px;
  border-radius: 20px;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -100px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
}

.echarts-box-courseViewCount {
  width: 100%;
  border-radius: 40px;
  transition: all 0.7s;
  border: #ffffff 1px solid;
  padding-top: 10px;
}

.echarts-box-courseViewCount:hover {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -10px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  transition: all 0.7s;
  border: #5b72e8 1px solid;
}

.echarts-box-coursePieChart {
  border-radius: 40px;
  transition: all 0.7s;
  border: #ffffff 1px solid;
  padding-top: 10px;
  padding-left: 10px;
}

.echarts-box-coursePieChart:hover {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -10px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  transition: all 0.7s;
  border: #5b72e8 1px solid;
}

/*滚动条整体样式*/
.content-core::-webkit-scrollbar {
  width: 10px;
  height: 1px;
  border: none;
}

/*滚动条里面小方块*/
.content-core::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #f66666;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, .2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, .2) 50%,
      rgba(255, 255, 255, .2) 75%,
      transparent 75%,
      transparent
  );
}

.amount-withdrawn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  background-color: rgba(219, 215, 255, 0.69);
  height: 100px;
  transition: all 0.7s;
  border-radius: 20px;
  font-family: "HarmonyOS Sans SC", sans-serif;
}

.amount-withdrawn:hover {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -10px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  transition: all 0.7s;
}

.course-ans {
  width: 40%;
  height: 400px;
  background-color: rgba(237, 245, 255, 0.44);
  border-radius: 40px;
  transition: all 0.7s;
  cursor: pointer;
  border: #ffffff 1px solid;
  padding: 20px;
}

.course-ans:hover {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -10px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  border: #5b72e8 1px solid;
  transition: all 0.7s;
}

.one-show {
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.course-ans p {
  font-size: 17px;
}

.course-ans p span {
  font-size: 40px;
  font-weight: 700;
  font-family: "HarmonyOS Sans SC", sans-serif;
  color: transparent;
  background: linear-gradient(90deg, #0f0, #00f);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine 5s infinite linear;
}

@keyframes shine {
  0% {
    background-position: 0 center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0 center;
  }
}

@-webkit-keyframes shine {
  0% {
    background-position: 0 center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0 center;
  }
}

.loginlog {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -0px 0 100px rgba(200, 0, 255, 0.22),
  0 0 0 rgba(0, 255, 217, 0.19);
  border-radius: 20px;
  background-color: rgba(228, 153, 255, 0.13);
  background-image: radial-gradient(at 47% 69%, hsla(17, 62%, 65%, 0.25) 0px, transparent 50%),
  radial-gradient(at 9% 32%, hsla(222, 75%, 60%, 0.13) 0px, transparent 50%);
}
</style>

<template>
  <div class="course-statistics-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>教师</a-breadcrumb-item>
      <a-breadcrumb-item>课程统计</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="content-core">
      <EText he :core-text="'—— '+nickname+'的数据 ——'"/>
      <div class="amount-withdrawn">
        <a-statistic title="评论量" :value="commentCount" style="margin-right: 50px">

        </a-statistic>
        <a-statistic title="课程数" :value="courseCount" style="margin-right: 50px">

        </a-statistic>
        <a-statistic title="总收益点数（Points）" :value="earning" style="margin-right: 50px">

        </a-statistic>
      </div>
      <div class="one-show" style="display: flex; flex-direction: row; margin-top: 40px;">
        <div class="echarts-box-coursePieChart">
          <div ref="coursePieChartDom2" style="height: 400px;  width: 700px;"></div>
        </div>
        <div class="course-ans">
          <a-typography-title :level="2">转化比</a-typography-title>
          <p>系统总体转化比：<span>{{ (systemConversionRatio) }}%</span></p>
          <p>您的转化比：<span>{{ yourConversionRatio }}%</span></p>
          <p>你的收益：<span>{{ earning }}</span> Points</p>
          <p>击败 <span>{{ beatRate }}%</span> 的同行人</p>
          <p>
            我愿称之为 <span v-if="beatRate>50">遥遥领先</span>
            <span v-else>还需努力</span>
          </p>
        </div>
      </div>
      <div style=" margin-top: 40px;" class="one-show">
        <div class="echarts-box-courseViewCount">
          <div ref="courseViewCountChartDom" style=" height: 400px;"></div>
        </div>
        <div class="echarts-box-coursePieChart">
          <div ref="coursePieChartDom" style="height: 400px;  width: 700px;"></div>
        </div>

      </div>


      <div class="loginlog" style="display: flex; flex-direction: row; margin-top: 20px;">
        <LoginTimesComp style="width: 80vw;"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted, onUnmounted, nextTick, computed} from 'vue';
import * as echarts from 'echarts';
import {getCourseDataECharts} from "../../api/CourseAPIs.ts";
import {getTeacherOrderCountRequest} from "../../api/OrderAPIs.ts";
import EText from "../../components/EChartsComp/EText.vue";
import LoginTimesComp from "../../components/UserComp/LoginTimesComp.vue";
import {getTeacherCommentRequest} from "../../api/CommentAPIs.ts";

const courseViewCountChartDom = ref(null);
const coursePieChartDom = ref(null);
const coursePieChartDom2 = ref(null);
let courseViewCountChartInstance: any = null;
let coursePieChartInstance: any = null;
let coursePieChartInstance2: any = null;

let nickname = localStorage.getItem('nickname')
onMounted(async () => {
  await nextTick();

  // 柱状图初始化
  courseViewCountChartInstance = echarts.init(courseViewCountChartDom.value);

  // 饼图初始化
  coursePieChartInstance = echarts.init(coursePieChartDom.value);
  coursePieChartInstance2 = echarts.init(coursePieChartDom2.value);

  const option = {
    title: {
      left: 'center',
      text: '教师课程浏览量',
      subtext: 'Teacher course views —— Statistics'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params: any) {
        var tar = params[0];
        return tar.name + '<br/>' + '浏览量' + ' : ' + tar.value;
      }
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        interval: 0,
      }
    },
    yAxis: {
      label: {
        show: true,
        position: 'inside'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },

    series: [

      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {offset: 0, color: 'rgba(230,102,102,0.44)'},
            {offset: 0.5, color: 'rgba(230,102,102,0.73)'},
            {offset: 1, color: '#e66666'}
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: '#e66666'},
              {offset: 0.7, color: 'rgba(230,102,102,0.73)'},
              {offset: 1, color: 'rgba(230,102,102,0.44)'}
            ])
          }
        },
        data: [23, 24, 18, 25, 27, 28, 25],
      }
    ]
  };
  // ____________________________________________
  // _________________请求区______________________
  await getCourseDataECharts().then((res: any) => {
    if (res.data.code === 200) {
      option.xAxis.data = res.data.map.courseTitleList
      option.series[0].data = res.data.map.viewCountList
    }
  })
  // ____________________________________________
  // _________________加载区______________________
  courseViewCountChartInstance.setOption(option);
  // ____________________________________________

  // 新增饼图配置
  const pieOption = {
    title: {
      text: '我的购买量占比',
      subtext: 'Course views distribution',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '浏览量占比',
        type: 'pie',
        radius: '50%',
        data: [
          {value: 28, name: 'Sat'},
          {value: 25, name: 'Sun'}
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const pieOption2 = {
    title: {
      text: '总体的购买量占比',
      subtext: 'Course views distribution',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {value: 1048, name: 'Search Engine'},
          {value: 735, name: 'Direct'},
        ]
      }
    ]
  };

  // ____________________________________________
  // _________________请求区______________________
  await getCourseDataECharts().then((res: any) => {
    if (res.data.code === 200) {
      option.xAxis.data = res.data.map.courseTitleList
      option.series[0].data = res.data.map.viewCountList
      courseCount.value = res.data.map.viewCountList.length
    }
  })
  let uid = localStorage.getItem('uid')
  await getTeacherOrderCountRequest(uid).then((res: any) => {
    pieOption.series[0].data[0] = {value: res.data.data, name: '购买量'}
    pieOption.series[0].data[1] = {value: res.data.map.viewCount - res.data.data, name: '浏览量'}
    pieOption2.series[0].data[0] = {value: res.data.map.allOrderCount, name: '购买量'}
    pieOption2.series[0].data[1] = {value: res.data.map.allViewCount - res.data.map.allOrderCount, name: '浏览量'}
    allViewCount.value = res.data.map.allViewCount
    allOrderCount.value = res.data.map.allOrderCount
    yourViewCount.value = res.data.map.viewCount - res.data.data
    yourOrderCount.value = res.data.data
    allOrderLearningPoint.value = res.data.map.allOrderLearningPoint
    earning.value = res.data.map.earning
  })
  getTeacherCommentRequest(uid).then((res: any) => {
    commentCount.value = res.data.data.length
  })
  // ____________________________________________
  // _________________加载区______________________
  courseViewCountChartInstance.setOption(option);
  // ____________________________________________
  // 设置饼图数据
  coursePieChartInstance.setOption(pieOption);
  coursePieChartInstance2.setOption(pieOption2);

});
const yourViewCount = ref(0);
const yourOrderCount = ref(0);
const allViewCount = ref(0);
const allOrderCount = ref(0);
const allOrderLearningPoint = ref(0);
const earning = ref(0)
const commentCount = ref(0);
const courseCount = ref(0)

const yourConversionRatio = computed(() => {
  return roundToDecimal(((yourOrderCount.value) / (yourViewCount.value)) * 100, 2);
})

function roundToDecimal(num: number, decimalPlaces: number): number {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(num * multiplier) / multiplier;
}

const systemConversionRatio = computed(() => {
  return roundToDecimal((allOrderCount.value / (allViewCount.value - allOrderCount.value)) * 100, 2);
})
// 击败率, 就是你的收益和系统总收益的占比
const beatRate = computed(() => {
  return roundToDecimal((earning.value / allOrderLearningPoint.value) * 100, 2);
})
onUnmounted(() => {
  if (courseViewCountChartInstance != null && courseViewCountChartInstance.dispose) {
    courseViewCountChartInstance.dispose();
  }
  if (coursePieChartInstance != null && coursePieChartInstance.dispose) {
    coursePieChartInstance.dispose();
  }
});
</script>
