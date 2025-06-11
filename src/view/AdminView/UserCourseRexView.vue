<style scoped>
.core {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.5), rgba(90, 128, 249, 0.25));
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

.echarts-box-courseViewCount {
  margin-left: -30px;
}

.dip-box-r {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.header-name {
  background-color: rgba(84, 84, 255, 0.75);
  border-radius: 20px;
  color: white;
  margin-bottom: 10px;
}

.top-core {
  width: 100%;
  height: 100%;
  padding: 0;
}

.system-heat-map {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -100px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  width: 100%;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.74);
  min-height: 560px;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}


/*滚动条整体样式*/
.system-heat-map::-webkit-scrollbar {
  width: 10px;
  height: 1px;
  border: none;
}

/*滚动条里面小方块*/
.system-heat-map::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(91, 129, 247, 0.84);
  background-image: -webkit-linear-gradient(45deg,
  rgba(255, 255, 255, .2) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, .2) 50%,
  rgba(255, 255, 255, .2) 75%,
  transparent 75%,
  transparent);
}
</style>
<template>
  <div class="top-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>管理员</a-breadcrumb-item>
      <a-breadcrumb-item>用户相关性计算</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="system-heat-map">
      <div class="core">
        <div class="content-core">
          <div class="echarts-box-courseViewCount">
            <div ref="courseViewCountChartDom" style="height: 80vh; width: 100%;"></div>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import {getHeatMatrixRequest} from "../../api/RecommendAPIs.ts";
import {nextTick, onMounted, onUnmounted, ref} from "vue";
import * as echarts from "echarts";
import {getUserCourseDoubleIDRequest} from "../../api/CourseAPIs.ts";
import {useCommonStore} from "../../store/CommonStore.ts";

// DOM + ECharts 实例
const courseViewCountChartDom = ref(null);
let courseViewCountChartInstance: any = null;

// 响应式数据
const xZ = ref<string[]>([])
const yZ = ref<string[]>([])
const data = ref<[number, number, number][]>([]) // echarts 热力图格式
// const rawMatrix = ref<number[][]>([])

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

  const tempData: [number, number, number][] = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {
      tempData.push([j, i, matrix[i][j]]);
    }
  }

  // 初始为空，等待动画加载
  data.value = [];

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
      splitArea: { show: true }
    },
    yAxis: {
      type: 'category',
      data: yZ.value,
      splitArea: { show: true }
    },
    visualMap: {
      min: 0,
      max: 1,
      calculable: true,
      orient: 'vertical',
      right: '2%',
      top: 'middle',
      itemWidth: 20,
      itemHeight: 400,
      text: ['高相似', '低相似']
    },
    series: [
      {
        name: '相似度',
        type: 'heatmap',
        data: data.value,
        label: {
          show: true,
          formatter: function (params: any) {
            return Number(params.value[2]).toFixed(2);
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

  // 动画加载：按相似度从低到高排序，然后间隔插入
  const sortedData = [...tempData].sort((a, b) => a[2] - b[2]);
  let index = 0;
  const step = 10;
  const interval = setInterval(() => {
    const nextChunk = sortedData.slice(index, index + step);
    data.value.push(...nextChunk);

    courseViewCountChartInstance.setOption({
      series: [{
        data: data.value
      }]
    });

    index += step;
    if (index >= sortedData.length) {
      clearInterval(interval);
    }
  }, 30);

  // 点击事件：展示两个用户之间的相似度
  courseViewCountChartInstance.on('click', function (params: any) {
    const xUserId = users[params.value[0]];
    const yUserId = users[params.value[1]];
    const similarity = params.value[2];

    showModal(xUserId, yUserId, similarity);
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
const similarityEx = ref<string>('0');
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
const showModal = (x: string, y: string, similarity: string) => {
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

