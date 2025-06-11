<script setup lang="ts">
import {h, onMounted, ref} from "vue";
import {SmileOutlined} from "@ant-design/icons-vue";
import {notification} from "ant-design-vue";
import {useCommonStore} from "../../store/CommonStore.ts";
import {getRecommendCourseRequest, removeRecommendCourseRequest} from "../../api/CourseAPIs.ts";
import router from "../../router";

const columns = [
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    width: 100,
    align: 'center'
  }, {
    title: '课程名称',
    dataIndex: 'title',
    key: 'title',
    width: 150,
    align: 'center'
  }, {
    title: '浏览量',
    dataIndex: 'viewCount',
    key: 'viewCount',
    width: 100,
    align: 'center'
  }, {
    title: '购买量',
    dataIndex: 'buyCount',
    key: 'buyCount',
    width: 100,
    align: 'center'
  }, {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    width: 100,
    align: 'center'
  }, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 100,
    align: 'center',
  }
]

const recommendCourse = ref([{
  id: 27,
  teacherId: 19,
  cover: "e6192065cc195ff7b1f6697a490a2084.png",
  title: "IDEA使用技巧系列（三）",
  courseDescribe: "IEDA系列教程，目前较为流行的智能IDE",
  status: 1,
  viewCount: 21,
  buyCount: 8,
  price: "0.0",
  isDelete: 0,
  createTime: "2025-04-08"
}])

// 封装一个通知
const aliNotification = (message: string, description: string, duration: number) => {
  notification.open(
      {
        message: message,
        description: description,
        duration: duration,
        icon: () => h(SmileOutlined, {style: 'color: #108ee9'}),
        top: 100
      }
  )
}

const confirmDe = (cid: any) => {
  removeRecommendCourseRequest(cid).then((res) => {
    if (res.data.code === 200) {
      aliNotification("取消推荐成功", "课程已经从推荐课程中移除", 2)
      getRecommendCourseRequest().then((res) => {
        recommendCourse.value = res.data.data
      })
    }
  })
}

onMounted(() => {
  getRecommendCourseRequest().then((res) => {
    recommendCourse.value = res.data.data
  })
})

const toDetail = (record: any) => {
  localStorage.setItem("course", JSON.stringify(record))
  router.push('/admin/AdminCourseContentView')
}
</script>

<template>
  <div class="payout-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>管理员</a-breadcrumb-item>
      <a-breadcrumb-item>推荐管理</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="core-content">
      <a-table :columns="columns" :dataSource="recommendCourse" bordered :pagination="{ pageSize: 7 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'cover'">
            <a-image
                :src="useCommonStore().minioURLPre+record.cover"
                :preview="true"
                alt="cover"
                style="width: 130px;"
            />
          </template>
          <template v-if="column.dataIndex === 'action'">
            <el-button size="large" type="primary" @click="toDetail(record)" round plain>查看详情</el-button>
            <a-popconfirm
                title="确定取消推荐吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirmDe(record.id)"
            >
              <el-button size="large" type="danger" round plain>取消推荐</el-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "HarmonyOS Sans SC", sans-serif;
}

.payout-core {
  width: 100%;
}

/*滚动条整体样式*/
.core-content::-webkit-scrollbar {
  width: 10px;
  height: 1px;
  border: none;
}

/*滚动条里面小方块*/
.core-content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #f66666;
  background-image: -webkit-linear-gradient(45deg,
  rgba(255, 255, 255, .2) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, .2) 50%,
  rgba(255, 255, 255, .2) 75%,
  transparent 75%,
  transparent);
}

.core-content {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -100px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  width: 100%;
  border-radius: 20px;
  padding: 12px;
  background: #ffffff;
  min-height: 560px;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>