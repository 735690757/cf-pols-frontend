<style scoped>
.Banner-management-core {
  width: 100%;
  border-radius: 10px;
}

.man-core {
  padding: 12px;
  background: #ffffff;
  min-height: 560px;
  border-radius: 10px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow:
      0 0 25px rgba(255, 255, 255, 0.26),
      -100px 0 100px rgba(200, 0, 255, 0.22),
      100px 0 800px rgba(0, 255, 217, 0.19);
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.core-carousel {
  width: 100%;
  border-radius: 10px;
}

.carousel-item-photo {
  width: 100%;
  margin: 0 auto;
  height: 100%;
  object-fit: cover;
}

.table-and-op {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}

.button-add {
  height: 100%;
  display: flex;
  flex-direction: row;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 15px;
}
</style>
<template>
  <div class="Banner-management-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>管理员</a-breadcrumb-item>
      <a-breadcrumb-item>首页管理</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="man-core">
      <div class="block text-center core-carousel">
        <el-carousel :key="carouselKey" height="250px">
          <el-carousel-item v-for="item in tableDataPublish" :key="item">
            <img  :src="commonStore.minioURLPre + item.photo" alt="" class="carousel-item-photo"/>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="table-and-op">

        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column label="id" prop="id" align="center" header-align="center"/>
          <el-table-column label="图片" prop="photo" align="center" header-align="center">
            <template #default="scope">
              <a-image :src="commonStore.minioURLPre + scope.row.photo" alt="" style="width: 100px;"/>
            </template>
          </el-table-column>
          <el-table-column label="排序字" prop="sort" align="center" header-align="center">
            <template #default="scope">
              <el-select
                  v-model="scope.row.sort"
                  size="small"
                  @change="updateSortEvent(scope.row.sort, scope.row.id)"
                  style="width: 120px"
                  :min="1"
                  :max="10"
              >
                <el-option
                    v-for="index in 10"
                    :key="index"
                    :label="index"
                    :value="index"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="发布状态" prop="status" align="center" header-align="center">
            <template #default="scope">
              <el-switch
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="已发布"
                  inactive-text="未发布"
                  :active-value="1"
                  :inactive-value="0"
                  @click="updateStatusEvent(scope.row.status, scope.row.id)"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" label="操作">
            <template #default="scope">
              <el-button type="danger" size="small" @click="deleteCarouselEvent(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" plain class="button-add" @click="showModal">
          添
          <br/>
          <br/>
          <br/>
          加
          <br/>
          <br/>
          <br/>
          图
          <br/>
          <br/>
          <br/>
          片
        </el-button>
      </div>
    </div>
    <a-modal v-model:open="open" title="上传图片" @ok="handleOk" cancelText="取消" ok-text="上传">
      <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8080/carousel/uploadImage"
          multiple
          :auto-upload="false"
          ref="uploadRef"
          list-type="picture"
          :on-success="handleUploadSuccess"
          name="file"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖放到此处或<em>单击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            大小小于 500KB 的 JPG/PNG 文件
          </div>
        </template>
      </el-upload>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {
  addCarouselRequest,
  deleteCarouselRequest,
  getAllCarouselRequest,
  getAllPublishCarouselRequest, updateCarouselSortRequest,
  updateCarouselStatusRequest
} from "../../api/CarouselAPIs.ts";
import {onMounted, ref} from "vue";
import {useCommonStore} from "../../store/CommonStore.ts";
import {ElNotification, type UploadInstance} from "element-plus";
import { UploadFilled } from '@element-plus/icons-vue'
// element通知
const elNotification = (title: string, message: string, position: any) => {
  ElNotification({
    title: title,
    message: message,
    position: position,
  })
}

const carouselKey = ref(0);

const commonStore = useCommonStore();
const tableData = ref([{
  id: 1,
  photo: ''
}])
const tableDataPublish = ref([{
  id: 1,
  photo: ''
}])
onMounted(()=>{
  getAllCarouselRequest().then(res => {
    tableData.value = res.data
  })
  getAllPublishCarouselRequest().then(res => {
    tableDataPublish.value = res.data.data
  })
  carouselKey.value += 1;
})

/**
 * 修改状态
 * @param status
 * @param id
 */
const updateStatusEvent = (status: number, id: number) => {
  updateCarouselStatusRequest(id, status).then(res => {
    if (res.data.code === 200) {
      getAllCarouselRequest().then(res => {
        tableData.value = res.data
      })
      getAllPublishCarouselRequest().then(res => {
        tableDataPublish.value = res.data.data
      })
      carouselKey.value += 1;
      elNotification("成功", "已修改", 'top-left')
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
}
/**
 * 修改排序
 * @param sort
 * @param id
 */
const updateSortEvent = (sort: number, id: number) => {
  // console.log(sort, id)
  updateCarouselSortRequest(id, sort).then(res => {
    if (res.data.code === 200) {
      elNotification("成功", "已修改", 'top-left')
      getAllCarouselRequest().then(res => {
        tableData.value = res.data
      })
      getAllPublishCarouselRequest().then(res => {
        tableDataPublish.value = res.data.data
      })
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
}

/**
 * 删除轮播图
 * @param id
 */
const deleteCarouselEvent = (id: number) => {
  deleteCarouselRequest(id).then(res => {
    if (res.data.code === 200) {
      elNotification("成功", "删除成功", 'top-left')
      getAllCarouselRequest().then(res => {
        tableData.value = res.data
      })
      getAllPublishCarouselRequest().then(res => {
        tableDataPublish.value = res.data.data
      })
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
}

const open = ref<boolean>(false);
/**
 * 显示模态框
 */
const showModal = () => {
  open.value = true;
};
/**
 * 隐藏模态框、上传文件
 */
const uploadRef = ref<UploadInstance>()
const handleOk = () => {
  uploadRef.value?.submit()
  open.value = false;
};
const handleUploadSuccess = (response: any) => {
  let filename = response.data;
  addCarouselRequest({
    photo: filename
  }).then(res => {
    if (res.data.code === 200) {
      elNotification("成功", "上传成功", 'top-left')
      getAllCarouselRequest().then(res => {
        tableData.value = res.data
      })
      getAllPublishCarouselRequest().then(res => {
        tableDataPublish.value = res.data.data
      })
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
};

</script>