<script setup lang="ts">

import {ClockCircleOutlined, ExportOutlined, SearchOutlined, CaretRightOutlined} from "@ant-design/icons-vue";
import {onMounted, ref} from "vue";
import {getAllCourseRequest, getCourseByFuzzyRequest, getPayCourseRequest} from "../../api/CourseAPIs.ts";
import {useCommonStore} from "../../store/CommonStore.ts";
import router from "../../router";
import {getCourseDataShowRequest} from "../../api/ExcelExportAPIs.ts";
import {ElNotification} from "element-plus";

// element通知
const elNotification = (title: string, message: string, position: any) => {
  ElNotification({
    title: title,
    message: message,
    position: position,
  })
}

const columns = [
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    width: 150,
    align: 'center'
  }, {
    title: '课程标题',
    dataIndex: 'title',
    key: 'title',
    width: 200,
    align: 'center'
  },
  {
    title: '课程描述',
    dataIndex: 'courseDescribe',
    key: 'courseDescribe',
    width: 200,
    align: 'center'
  },
  {
    title: '课程价格',
    dataIndex: 'price',
    key: 'price',
    width: 80,
    align: 'center'
  },
  {
    title: '课程状态',
    dataIndex: 'status',
    key: 'status',
    width: 80,
    align: 'center'
  }, {
    title: '浏览量',
    dataIndex: 'viewCount',
    key: 'viewCount',
    width: 80,
    align: 'center'
  },
  {
    title: '购买量',
    dataIndex: 'buyCount',
    key: 'buyCount',
    width: 80,
    align: 'center'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 150,
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 100,
    align: 'center',
  }

]
const courseData = ref([{
  id: 0,
  teacherId: 0,
  cover: "",
  title: "",
  courseDescribe: "",
  status: 0,
  viewCount: 0,
  buyCount: 0,
  price: "",
  isDelete: 0,
  createTime: null
}])
onMounted(() => {
  getAllCourseRequest().then(res => {
    courseData.value = res.data.data
  })
})
const gotoDetail = (record: any) => {
  localStorage.setItem("course", JSON.stringify(record))
  router.push('/admin/AdminCourseContentView')
}

// 模糊搜索
const cname = ref("")
const handleSearch = () => {
  getCourseByFuzzyRequest(cname.value).then(res => {
    courseData.value = res.data.data
  })
}

// 只看付费课程
const handleOnlyPay = () => {
  getPayCourseRequest().then(res => {
    courseData.value = res.data.data
  })
}
// 导出到Excel
const handleExport = () => {
  getCourseDataShowRequest()
  elNotification("成功", "数据导出成功", 'top-left')
}
</script>

<template>
  <div class="all-course-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>管理员</a-breadcrumb-item>
      <a-breadcrumb-item>全部课程</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-core">
      <div class="top-core">
        <div class="top-core-title">
          <div class="top-core-search-container">
            <a-button @click="handleOnlyPay" class="top-core-butt" type="primary">
              <ClockCircleOutlined/>
              只看付费
            </a-button>
            <a-button @click="handleExport" class="top-core-butt" style="width: 180px" type="primary">
              <ExportOutlined/>
              导出到Excel
            </a-button>
          </div>
          <div class="top-core-search-container">
            <a-input v-model:value="cname" placeholder="请输入" class="top-core-butt top-core-search">

            </a-input>
            <a-button @click="handleSearch" class="top-core-butt top-core-search-butt" type="primary">
              <SearchOutlined/>
              搜索
            </a-button>

          </div>
        </div>
      </div>
      <div class="core-table">
        <a-table class="core-table-core" :scroll="{  y: 360 }" :data-source="courseData" :columns="columns"
                 :pagination="{ pageSize: 5 }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'cover'">
              <img :src="useCommonStore().minioURLPre+record.cover" alt="" style="width: 150px;">
            </template>
            <template v-if="column.dataIndex === 'price'">
              <template v-if="record.price == 0">
                <a-tag color="#87d068">
                  免费
                </a-tag>
              </template>
              <template v-else>
                <a-tag color="#69f">
                  {{ record.price }} Poi
                </a-tag>
              </template>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <template v-if="record.status === 1">
                <a-tag color="#87d068">
                  上架
                </a-tag>
              </template>
              <template v-else>
                <a-tag color="#f50">
                  下架
                </a-tag>
              </template>
            </template>
            <template v-if="column.dataIndex === 'action'">
              <el-button @click="gotoDetail(record)" type="primary" round plain>
                查看
                <CaretRightOutlined/>
              </el-button>
            </template>
          </template>
        </a-table>
      </div>

    </div>
  </div>
</template>

<style scoped>
.all-course-core {
  width: 100%;
}

.content-core {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -100px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  padding: 12px;
  background: #ffffff;
  min-height: 560px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 80vh;
}


.top-core {
  box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.18),
  inset 10px 0 40px rgba(0, 13, 255, 0.16),
  inset -10px 0 40px rgba(255, 196, 0, 0.18),
  inset 100px 0 150px rgba(55, 0, 255, 0.18),
  inset -10px 0 150px rgba(0, 166, 255, 0.22),
  0 0 25px rgba(255, 255, 255, 0.26),
  -100px 0 100px rgba(72, 0, 255, 0.22),
  100px 0 800px rgba(0, 178, 255, 0.19);
  border-radius: 40px;
}

.top-core-search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.top-core-title {
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.top-core-butt {
  background-color: rgba(116, 95, 255, 0.89);
  margin: 10px;
  height: 40px;
  width: 150px;
  border-radius: 40px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  color: #ffffff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-core-search {
  float: right;
  width: 300px;
}

.top-core-search-butt {
  float: right;
  width: 100px;
}

.core-table {
  margin-top: 20px;
}


</style>