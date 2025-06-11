<style scoped>
.Free-Courses-core {
  width: 100%;
}

.content-core {
  padding: 12px;
  background: #ffffff;
  min-height: 560px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.top-core-title {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.top-core-search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.top-core-butt {
  background-color: rgba(246, 102, 102, 0.78);
  margin: 10px;
  height: 40px;
  width: 180px;
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

.top-core-butt:hover {
  background-color: rgba(237, 58, 58, 0.78);
}

.top-core {
  box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.18),
  inset 10px 0 40px rgba(255, 0, 251, 0.16),
  inset -10px 0 40px rgba(132, 255, 0, 0.18),
  inset 100px 0 150px rgba(255, 0, 213, 0.18),
  inset -10px 0 150px rgba(255, 0, 98, 0.22),
  0 0 25px rgba(255, 255, 255, 0.26),
  -100px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  border-radius: 40px;
}

.course-core {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;

}

/*滚动条整体样式*/
.course-core::-webkit-scrollbar {
  width: 10px;
  height: 1px;
  border: none;
}

/*滚动条里面小方块*/
.course-core::-webkit-scrollbar-thumb {
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

/*滚动条里面轨道*/
.course-core::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #EDEDED;
}

.course-board {
  height: 48vh;
  margin-right: 10px;
  border-radius: 10px;
  margin-left: 2.5%;
}

.teacher-drawer-submit {
  background-color: #bc66f6;
}

.teacher-drawer-submit:hover {
  background-color: rgba(156, 58, 237, 0.91);

}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.drawer-body {
  height: 100%;
  margin: 0;
  padding: 15px;
  border-radius: 20px;
  background-image: linear-gradient(rgba(246, 102, 102, 0.05), rgba(188, 102, 246, 0.06));
  font-family: "HarmonyOS Sans SC", sans-serif;
}

.course-input {
  width: 100%;
  border-radius: 10px;
  color: #ffffff;
  font-family: "HarmonyOS Sans SC", sans-serif;
}

.course-board-cover-img {
  width: 100%;
  border-radius: 10px;
}

.description-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.course-board-card {
  overflow: hidden;
}

.course-board-cover {
  transition: all 0.5s;
  height: 190px;
}

.course-board-card:hover .course-board-cover {
  transition: all 0.5s;
  z-index: -1;
  transform: scale(1.1);
}

.course-edit-save {
  background-color: #bc66f6;
}

.course-edit-input {
  background-color: rgba(188, 102, 246, 0.04);
  border-radius: 10px;
}

/* 状态矩形样式 */
.course-status {
  height: 18px;
  width: 100%;
  margin-top: -10px;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  color: #ffffff;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 14px;
  z-index: 100;
  font-weight: bold;
}

/* 根据课程状态设置颜色 */
.course-status-1 {
  background-color: rgba(82, 196, 26, 0.84);
}

.course-status-true {
  background-color: rgba(82, 196, 26, 0.84);
}

.course-status-warn {
  background-color: rgba(250, 219, 20, 0.81);
}

.course-status-0 {
  background-color: rgba(255, 77, 79, 0.82);
}

.course-status-false {
  background-color: rgba(255, 77, 79, 0.82);
}

.description-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.course-ai-button {
  margin-top: 20px;
  background-color: #bb65f4;
  font-family: "HarmonyOS Sans SC", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.course-ai-button:hover {
  background-color: rgba(156, 58, 237, 0.91);
}
</style>
<template>
  <div class="Free-Courses-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>教师</a-breadcrumb-item>
      <a-breadcrumb-item>全部课程</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-core">
      <div class="top-core">
        <div class="top-core-title">
          <a-button @click="showDrawer" class="top-core-butt" type="primary">
            <PlusOutlined/>
            开设课程
          </a-button>

          <div class="top-core-search-container">

            <a-input v-model:value="fuzzySearchContent" placeholder="请输入" class="top-core-butt top-core-search">
            </a-input>
            <a-button @click="" class="top-core-butt top-core-search-butt" type="primary">
              <SearchOutlined/>
              搜索
            </a-button>
          </div>
        </div>
      </div>
      <div class="course-core">
        <a-row class="course-core-row" :gutter="[25,25]">
          <!--    课程卡    -->
          <a-col class="course-board" v-for="course in courseList" :key="course.id">
            <a-card class="course-board-card" hoverable style="width: 100%">
              <template #cover>
                <img
                    @click="handleCourseDetail(course)"
                    alt="cover"
                    :src="commonStore.minioURLPre+course.cover"
                    class="course-board-cover"
                />
              </template>
              <!-- 添加状态矩形 -->
              <div :class="['course-status', `course-status-${course.status}`]">
                <span class="course-status-span" v-if="course.status">已上架</span>
                <span class="course-status-span" v-else>已归档</span>
              </div>
              <template #actions>
                <!-- 设置按钮 -->
                <a-popover placement="top" title="课程状态">
                  <template #content>
                    <div class="status-switch">
                      <span>课程状态：</span>
                      <a-switch
                          v-model:checked="course.status"
                          checked-children="上架"
                          un-checked-children="归档"
                          @change="handleStatusChange(course.status,course.id)"
                      />
                    </div>
                  </template>
                  <setting-outlined key="setting"/>
                </a-popover>
                <edit-outlined @click="handleEditCourse(course)" key="edit"/>
                <a-popover placement="right" title="更多操作">
                  <template #content>
                    <a-button @click="handleDelete(course.id)" danger>
                      <DeleteOutlined/>
                      删除
                    </a-button>
                  </template>
                  <ellipsis-outlined key="ellipsis"/>
                </a-popover>
              </template>
              <a-card-meta @click="handleCourseDetail(course)" :title="course.title">
                <template #avatar>
                  <a-avatar :src="props.avatar"/>
                </template>
                <template #description>
                  <div class="description-text">
                    {{ course.courseDescribe }}
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </a-col>


        </a-row>
      </div>
    </div>
    <!--  添加抽屉  -->
    <a-drawer :width="500" style="padding: 0" title="开设课程" placement="left" size="large" :open="open"
              @close="onClose">
      <template #extra>
        <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
        <a-button type="primary" class="teacher-drawer-submit" @click="addCourse">提交</a-button>
      </template>
      <div class="drawer-body">
        <a-form>
          <a-form-item label="课程封面">
            <div class="clearfix">
              <a-upload
                  v-model:file-list="fileList"
                  list-type="picture-card"
                  :before-upload="beforeUpload"
                  @preview="handlePreview"
              >
                <div v-if="fileList && fileList.length < 1">
                  <plus-outlined/>
                  <div style="margin-top: 8px">Upload</div>
                </div>
              </a-upload>
              <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                <img alt="previewImage" style="width: 100%" :src="previewImage"/>
              </a-modal>
            </div>
          </a-form-item>
          <a-form-item label="课程名称">
            <a-input show-count
                     v-model:value="courseModel.title"
                     :maxlength="50" allow-clear
                     placeholder="请输入课程名称"
                     class="course-input"
            />
          </a-form-item>

          <a-form-item label="课程描述">
            <a-textarea show-count
                        v-model:value="courseModel.courseDescribe"
                        allow-clear
                        :maxlength="180"
                        placeholder="请输入课程描述"
                        autosize="true"
            />
            <!--     AI按钮       -->
            <a-button :loading="isLoading" @click="getCourseDesc" class="course-ai-button" type="primary">
              <CoffeeOutlined v-if="!isLoading"/>
              一键生成课程描述
            </a-button>
          </a-form-item>
          <a-form-item label="课程价格">
            <a-input-number v-model:value="courseModel.price" placeholder="请输入课程价格"/>
          </a-form-item>

        </a-form>
      </div>
    </a-drawer>
    <!-- 编辑弹窗 -->
    <a-modal
        v-model:open="editModalVisible"
        title="编辑课程"
        class="course-edit"
    >
      <a-form :model="editForm" layout="vertical">
        <a-form-item label="课程标题">
          <a-input class="course-edit-input" v-model:value="editForm.title"/>
        </a-form-item>
        <a-form-item label="课程价格">
          <a-input-number class="course-edit-input" v-model:value="editForm.price" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程描述">
          <a-textarea class="course-edit-input" v-model:value="editForm.courseDescribe"/>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button key="back" @click="handleCancelEdi">
          取消
        </a-button>
        <a-button key="submit" class="course-edit-save" type="primary" @click="handleSave">
          保存
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">

import {
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  CoffeeOutlined,
} from "@ant-design/icons-vue";
import {ref} from "vue";
import {Modal, type UploadProps} from "ant-design-vue";
import {
  addCourseCoverRequest, deleteCourseRequest,
  getCourseListRequest,
  openCourseRequest,
  updateCourseRequest, updateCourseStatusRequest
} from "../../../api/CourseAPIs.ts";
import {ElNotification} from "element-plus";
import {useCommonStore} from "../../../store/CommonStore.ts";
import router from "../../../router";
import {getCourseDescRequest} from "../../../api/AIChatAPIs.ts";

const commonStore = useCommonStore()

// element通知
const elNotification = (title: string, message: string, position: any) => {
  ElNotification({
    title: title,
    message: message,
    position: position,
  })
}

const fuzzySearchContent = ref('')

const open = ref<boolean>(false);

const showDrawer = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
};

// 课程模型
const courseModel = ref({
  title: '',
  courseDescribe: '',
  cover: '',
  price: 0,
})


// 封面上传
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileList = ref<UploadProps['fileList']>([]);
const uploading = ref<boolean>(false);

/**
 * 封面取消
 */
const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
/**
 * 封面上传
 * @param file
 */
const beforeUpload: UploadProps['beforeUpload'] = file => {
  fileList.value = [...(fileList.value || []), file];
  return false;
};

/**
 * base64
 * @param file
 */
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

/**
 * 文件上传预览
 * @param file
 */
const handlePreview = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

/**
 * 上传图片
 * @param courseId
 */
const handleUpload = (courseId: any) => {
  const formData = new FormData();
  if (fileList.value && fileList.value.length > 0) {
    formData.append('courseCover', fileList.value[0].originFileObj as any);
  }
  formData.append("courseId", courseId);
  uploading.value = true;
  addCourseCoverRequest(formData).then(res => {
    if (res.data.code === 200) {
      elNotification("成功", res.data.msg, 'top-left')
      uploading.value = false;
      fileList.value = [];
      getAllCourse();
      onClose()
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
};

/**
 * 添加课程
 */
const addCourse = () => {
  openCourseRequest(courseModel.value).then(res => {
    if (res.data.code === 200) {
      handleUpload(res.data.data)
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
}

// 获得课程
const courseList = ref([{
  cover: '',
  title: '',
  price: 0,
  courseDescribe: '',
  id: '',
  status: ''
}])

// status的bool纠正
const statusCorrect = (status: any) => {
  return status === 1;
}

/**
 * 获得所有课程
 */
const getAllCourse = () => {
  getCourseListRequest().then(res => {
    if (res.data.code === 200) {
      for (const course of res.data.data) {
        course.status = statusCorrect(course.status)
      }
      courseList.value = res.data.data
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
}
getAllCourse()

// 定义 props
const props = defineProps({
  avatar: {
    type: String
  },
  course: {
    type: Object as () => {
      cover: string;
      title: string;
      price: number;
      courseDescribe: string;
      id: string;
      status: boolean;
    },
    required: false,
  },
});

const editModalVisible = ref(false);
const editForm = ref({...props.course});
// 点击编辑按钮
const handleEditCourse = (course: any) => {
  editForm.value = {...course};
  editModalVisible.value = true;
};

/**
 * 保存编辑
 */
const handleSave = () => {
  updateCourse(editForm.value)
  editModalVisible.value = false;
};

/**
 * 取消编辑
 */
const handleCancelEdi = () => {
  editModalVisible.value = false;
};

/**
 * 更新课程
 * @param course
 */
const updateCourse = (course: any) => {
  course.status = course.status ? 1 : 0
  updateCourseRequest(course).then(res => {
    if (res.data.code === 200) {
      elNotification("成功", res.data.msg, 'top-left')
      getAllCourse()
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
}

/**
 * 删除课程
 * @param courseID
 */
const handleDelete = (courseID: any) => {
  Modal.confirm({
    title: '确认删除',
    content: '真的要删除吗？',
    okText: '确定',
    cancelText: '取消',
    onOk() {
      deleteCourseRequest(courseID).then(res => {
            if (res.data.code === 200) {
              elNotification("成功", res.data.data, 'top-left')
              getAllCourse()
            } else {
              elNotification("失败", res.data.data, 'top-left')
            }
          }
      )
    },
    onCancel() {
    },
  });
};


/**
 * 课程状态改变
 * @param checked
 * @param courseID
 */
const handleStatusChange = (checked: any, courseID: any) => {
  // console.log(checked, courseID)
  // 这里可以调用 API 更新课程状态
  // 例如：api.updateCourseStatus(props.course.id, newStatus);
  updateCourseStatusRequest({
    id: courseID,
    status: checked ? 1 : 0
  }).then(res => {
    if (res.data.code === 200) {
      elNotification("成功", res.data.data, 'top-left')
      getAllCourse()
    } else {
      elNotification("失败", res.data.data, 'top-left')
    }
  })
};

/**
 * 课程详情
 * @param course
 */
const handleCourseDetail = (course: any) => {
  router.push('/teacher/MyCourseContent');
  localStorage.setItem('course', JSON.stringify(course))
};

/**
 * 获得课程描述
 */
const isLoading = ref(false);
const getCourseDesc = () => {
  isLoading.value = true;
  if (courseModel.value.title === '') {
    elNotification("失败", "课程名不能为空", 'top-right')
    isLoading.value = false;
    return
  }
  getCourseDescRequest(courseModel.value.title).then(res => {
    courseModel.value.courseDescribe = res.data
    isLoading.value = false;
  })
}


</script>