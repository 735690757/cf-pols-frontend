<style>
.core {
  width: 100%;
  height: 100%;
}

.dip-box {
  width: 100%;
  height: 460px;
  display: flex;
  justify-content: space-between;
}

.dip-box-l {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.dip-box-r {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.header-name{
  background-color: rgba(84, 84, 255, 0.75);
  padding: 2px;
  border-radius: 20px;
  color: white;
  margin-bottom: 10px;
}
</style>
<template>
  <div class="core">
    <div class="content-core">
      <div class="echarts-box-courseViewCount">
        <div ref="courseViewCountChartDom" style="height: 700px; width: 100%;"></div>
      </div>
      <a-modal style="width: 1000px" v-model:open="open" title="相似浏览" @ok="handleOk">
        <p style="font-size: 16px">用户 {{ s1Entity[0].nickName }} 与用户 {{ s2Entity[0].nickName }} 相似度为
          {{ similarityEx }}</p>
        <div class="dip-box">
          <div class="dip-box-l">
            <div class="header-name" style="width: 50%;display: flex;justify-content: center;align-items: center;">
              <a-avatar :src="useCommonStore().minioURLPre+s1Entity[0].avatar" size="large"></a-avatar>
              <span style="margin-left: 20px;">{{ s1Entity[0].nickName }}</span>
            </div>
            <a-table :columns="columns" :scroll="{  y: 350 }" :data-source="s1Entity" :pagination="false" bordered>
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'cover'">
                  <img style="width: 150px" :src="useCommonStore().minioURLPre+record.cover" alt="">
                </template>
                <template v-else-if="column.dataIndex === 'score'">
                  <a-rate style="font-size: 15px;color: #e66666" v-model:value="record.score" disabled/>
                </template>
              </template>
            </a-table>
          </div>
          <div class="dip-box-r">
            <div class="header-name" style="width: 50%;display: flex;justify-content: center;align-items: center;">
              <a-avatar :src="useCommonStore().minioURLPre+s2Entity[0].avatar" size="large"></a-avatar>
              <span style="margin-left: 20px;">{{ s2Entity[0].nickName }}</span>
            </div>
            <a-table :columns="columns" :scroll="{  y: 350 }" :data-source="s2Entity" :pagination="false" bordered>
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'cover'">
                  <img style="width: 150px" :src="useCommonStore().minioURLPre+record.cover" alt="">
                </template>
                <template v-else-if="column.dataIndex === 'score'">
                  <a-rate style="font-size: 15px;color: #e66666" v-model:value="record.score" disabled/>
                </template>
              </template>
            </a-table>
          </div>
        </div>
        <template #footer></template>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getHeatMatrixRequest} from "../api/RecommendAPIs.ts";
import {nextTick, onMounted, onUnmounted, ref} from "vue";
import * as echarts from "echarts";
import {getUserCourseDoubleIDRequest} from "../api/CourseAPIs.ts";
import {useCommonStore} from "../store/CommonStore.ts";

// DOM + ECharts 实例
const courseViewCountChartDom = ref(null);
let courseViewCountChartInstance = null;

// 响应式数据
const xZ = ref<string[]>([])
const yZ = ref<string[]>([])
const data = ref<[number, number, number][]>([]) // echarts 热力图格式
const rawMatrix = ref<number[][]>([])

onMounted(async () => {
  await nextTick();
  courseViewCountChartInstance = echarts.init(courseViewCountChartDom.value);

  // 请求数据
  const res = await getHeatMatrixRequest();
  const users = res.data.map.users;
  const matrix = res.data.data;

  // 设置 X 和 Y 轴标签
  xZ.value = users.map(String);
  yZ.value = users.map(String);

  // 转换为 ECharts 热力图格式：[xIndex, yIndex, value]
  const tempData: [number, number, number][] = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {
      tempData.push([j, i, matrix[i][j]]);
    }
  }
  data.value = tempData;

  // 设置图表配置
  const option = {
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '80%',
      top: '5%'
    },
    xAxis: {
      type: 'category',
      data: xZ.value,
      splitArea: {show: true}
    },
    yAxis: {
      type: 'category',
      data: yZ.value,
      splitArea: {show: true}
    },
    visualMap: {
      min: 0,
      max: 1,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      itemWidth: 20,
      itemHeight: 400,
      text: ['高相似', '低相似'],
      calculable: true,
    },
    series: [
      {
        name: '相似度',
        type: 'heatmap',
        data: data.value,
        label: {
          show: true,
          formatter: function (params) {
            return Number(params.value[2]).toFixed(2); // 保留两位小数
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  courseViewCountChartInstance.setOption(option);
  courseViewCountChartInstance.on('click', function (params) {
    const xUserId = users[params.value[0]];
    const yUserId = users[params.value[1]];
    const similarity = params.value[2];

    showModal(xUserId, yUserId, similarity)
    // 你可以在这里做更多的交互，例如弹窗、跳转、详情展示等
  });
});

onUnmounted(() => {
  if (courseViewCountChartInstance) {
    courseViewCountChartInstance.dispose();
  }
});

const open = ref<boolean>(false);
const xUserId = ref<string>('');
const yUserId = ref<string>('');
const similarityEx = ref<string>(0);
const s1Entity = ref<any>([{
  avatar: '',
  cover: '',
  nickName: '',
  score: 0,
  title: ''
}]);
const s2Entity = ref<any>([{
  avatar: '',
  cover: '',
  nickName: '',
  score: 0,
  title: ''
}]);
const showModal = (x, y, similarity) => {
  xUserId.value = x;
  yUserId.value = y;
  similarityEx.value = similarity;
  open.value = true;
  getUserCourseDoubleIDRequest(x, y).then((res) => {
    s1Entity.value = res.data.map.userCourseVOS1
    s2Entity.value = res.data.map.userCourseVOS2
    console.log(s1Entity.value)
  })
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
const columns = [
  {
    title: '课程封面',
    dataIndex: 'cover',
    key: 'cover',
    align: 'center',
  }, {
    title: '课程名称',
    dataIndex: 'title',
    align: 'center',
    key: 'title',
  }, {
    title: '课程评分',
    dataIndex: 'score',
    align: 'center',
    key: 'score',
  }
]
</script>

