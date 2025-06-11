<style lang="less">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }

  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }

  .ant-modal-body {
    flex: 1;
  }
}
</style>
<style scoped>
/* 样式可以根据需要自定义 */
button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-course-core {
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}

.content-core {
  padding: 12px;
  background: #ffffff;
  min-height: 560px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow-y: auto;
}

.content-core-head {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}

.content-core-head-img {
  width: 30vw;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.content-core-head-img:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  transform: scale(1.05);
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

.content-core-head-statistic {
  display: flex;
  background-color: #f4f4f4;
  width: 40vw;
  border-radius: 20px;
  padding-left: 5vw;
  padding-bottom: 20px;
  padding-top: 20px;
  transition: all 0.3s ease-in-out;
}

.content-core-head-statistic:hover {
  background-color: rgba(102, 160, 246, 0.13);
  transition: all 0.3s ease-in-out;
  transform: scale(1.05);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.content-core-body {
  display: flex;
  justify-items: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.content-core-body-tool {
  width: 78vw;
  height: 80px;
  background-color: rgba(102, 160, 246, 0.13);
  margin-top: 20px;
  background-color: #f4f4f4;
  border-radius: 20px;
  display: flex;
  justify-items: center;
  transition: all 0.3s ease-in-out;
  justify-content: space-around;
  align-items: center;

}

.content-core-body-tool-item:hover {
  transition: all 0.3s ease-in-out;
  transform: scale(1.1);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.content-core-body-tool-item {
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
  width: 100px;
  height: 50px;
  background-color: #e66666;
}

.tool-butt {
  display: flex;
  justify-self: center;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 45px;
  border-radius: 20px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  background-color: #e66666;
}

.tool-butt:hover {
  transition: all 0.3s ease-in-out;
  transform: scale(1.05);
  background-color: #af3f3f;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.content-collapse {
  background-image: linear-gradient(135deg, #f5f5f5, rgba(230, 102, 102, 0.19));
  margin-top: 20px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-weight: 300;
  font-size: 16px;
  transition: all 0.7s;
}

.content-collapse:hover {
  transition: all 0.7s;
  background-image: linear-gradient(135deg, #f5f5f5, rgba(230, 102, 102, 0.45));
}

.add-course-content-core-body {
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 20px;
}

.add-course-content-input {
  width: 70vw;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(135deg, #f5f5f5, rgba(230, 102, 102, 0.19));
}

.custom-switch {
  border-radius: 20px;
  color: white;
  font-size: 12px;
}

.add-course-edit {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.content-preview {
  padding: 10px;
  min-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  width: 700px;
  border-radius: 20px 0 0 20px;
  height: calc(40vh + 96px);
}

.extra-butt {
  margin-left: 15px;
}

.view-file-butt {
  display: flex;
  justify-content: center;
  width: 200px;
  height: 50px;
  font-style: italic;
  align-items: center;
  border-radius: 20px;
  background-color: #e66666;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 20px;
}

.comment-detail {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.comment-detail-left {
  width: 40%;
  height: 400px;
  border-radius: 10px;
}

.comment-detail-right {
  width: 60%;
  border-radius: 10px;
  height: 400px;
}
</style>

<template>
  <div class="edit-course-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>教师</a-breadcrumb-item>
      <a-breadcrumb-item style="cursor: pointer" @click="goBack">全部课程</a-breadcrumb-item>
      <a-breadcrumb-item>编辑课程</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-core">
      <div class="content-core-head">
        <img @click="elNotification('',course.id,'top-left')"
             class="content-core-head-img"
             :src="commonStore.minioURLPre+course.cover" alt="cover">
        <a-typography-title>{{ course.title }}</a-typography-title>
        <a-typography-paragraph style="width: 70%;display: flex; justify-content: center;">
          {{ course.courseDescribe }}
        </a-typography-paragraph>
        <a-row class="content-core-head-statistic">
          <a-col :span="6">
            <a-statistic title="浏览量" :value="course.viewCount" style="margin-right: 50px"/>
          </a-col>
          <a-col :span="6">
            <a-statistic title="购买量" :value="course.buyCount"/>
          </a-col>
          <a-col :span="6">
            <a-statistic title="单价(CNY)" suffix="元" :value="course.price"/>
          </a-col>
          <a-col :span="6">
            <a-statistic title="总收益(不含抽成)" suffix="元" :value="course.price * course.buyCount"/>
          </a-col>
        </a-row>
      </div>
      <div class="content-core-body">
        <div class="content-core-body-tool">
          <a-button type="primary" @click="showModalADD" class="tool-butt">
            <PlusOutlined/>
            添加小节
          </a-button>
          <a-button type="primary" @click="opC1" class="tool-butt">
            <EditOutlined/>
            快速生成
          </a-button>
          <a-button type="primary" @click="showModalTrend" class="tool-butt">
            <LineChartOutlined/>
            收益趋势
          </a-button>
          <a-button type="primary" @click="showModalComment" class="tool-butt">
            <BarChartOutlined/>
            评价详情
          </a-button>
        </div>
        <div class="content-core-body-content">
          <a-collapse
              v-model:activeKey="activeKey"
              :bordered="false"
              style="
              background: rgb(255, 255, 255);
              border-radius: 20px;
              width: 78vw;"
          >
            <template #expandIcon="{ isActive }">
              <caret-right-outlined :rotate="isActive ? 90 : 0"/>
            </template>
            <a-collapse-panel
                v-for="item in courseContent"
                :key="item.id"
                :header="item.title"
                :style="customStyle"
                class="content-collapse"
            >
              <div v-if="item.isVideo">
                <div v-if="getFileSuffix(item.content) === 'mp4'">
                  <vue-plyr>
                    <video ref="playerC" id="my-video" playsinline controls>
                      <source :src="commonStore.minioURLPre+item.content" type="video/mp4"/>
                    </video>
                  </vue-plyr>
                </div>
                <div v-else>
                  <!--浏览器自带文件预览-->
                  <a-button
                      @click="viewFile(commonStore.minioURLPre+item.content)"
                      class="view-file-butt"
                  >
                    <FileOutlined/>
                    点我预览
                  </a-button>
                </div>
              </div>
              <div v-else>
                <div v-html="item.content"></div>
              </div>

              <template #extra>
                <EditOutlined class="extra-butt" @click="handleClickChange(item)"/>
                <DeleteOutlined class="extra-butt" @click="handleClickDelete(item.id)"/>
              </template>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </div>
    </div>
    <a-modal v-model:open="openADD"
             ok-text="提交"
             cancel-text="取消"
             width="100%"
             wrap-class-name="full-modal"
             class="add-course-content-modal"
             title="添加小节"
             @ok="handleADD"
    >
      <div class="add-course-content-core">
        <a-divider style="border-color: black"/>
        <div class="add-course-content-core-body">
          <a-form
              label-align="right"
              :label-col="{ span: 4 }"
          >
            <a-form-item label="小节标题">
              <a-input v-model:value="courseContentModel.title" placeholder="请输入小节标题"
                       class="add-course-content-input"/>
            </a-form-item>
            <a-form-item label="排序字">
              <a-input-number v-model:value="courseContentModel.sort" placeholder="请输入排序字，若未知可填“0”"
                              class="add-course-content-input"/>
            </a-form-item>
            <a-form-item label="小节类型">
              <a-radio-group v-model:value="checkedType" name="radioGroup">
                <a-radio value="1">文字文档（可自由编辑）</a-radio>
                <a-radio value="2">纯文件（适用于视频）</a-radio>
                <a-radio value="3">纯文件（Doc文档 / PDF文档等）</a-radio>
                <!--                <a-radio value="3">C</a-radio>-->
                <!--                <a-radio value="4">D</a-radio>-->
              </a-radio-group>
            </a-form-item>
          </a-form>
          <div v-if="checkedType==='1'" class="add-course-edit">
            <!-- 渲染编辑器内容 -->
            <div class="content-preview" v-html="courseContentModel.content"></div>
            <BasicEditor
                v-model="courseContentModel.content"
                ref="editor"
                style="width: 1370px"
            />
          </div>
          <div v-else-if="checkedType==='2'||checkedType==='3'">
            <a-upload-dragger
                v-model:fileList="fileList"
                name="file"
                :before-upload="beforeUpload"
                :max-count="1"
                :multiple="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @change="handleChange"
                @drop="handleDrop"
            >
              <p class="ant-upload-drag-icon">
                <inbox-outlined></inbox-outlined>
              </p>
              <p class="ant-upload-text">单击或拖动文件到此区域以上传</p>
              <p class="ant-upload-hint">
                支持单次上传。严禁上传敏感数据或其他特殊文件
              </p>
            </a-upload-dragger>
          </div>
        </div>
      </div>
    </a-modal>
    <!--  修改小节  -->
    <a-modal v-model:open="openChange"
             ok-text="提交修改"
             cancel-text="取消"
             width="100%"
             wrap-class-name="full-modal"
             class="add-course-content-modal"
             title="修改小节"
             @ok="handleChangeChange"
             @cancel="handleCancelChangeChange"

    >
      <a-divider style="border-color: black"/>
      <div class="add-course-content-core-body">
        <a-form
            label-align="right"
            :label-col="{ span: 4 }"
        >
          <a-form-item label="小节标题">
            <a-input v-model:value="courseContentModelChange.title" placeholder="请输入小节标题"
                     class="add-course-content-input"/>
          </a-form-item>
          <a-form-item label="排序字">
            <a-input-number v-model:value="courseContentModelChange.sort" placeholder="请输入排序字，若未知可填“0”"
                            class="add-course-content-input"/>
          </a-form-item>
        </a-form>
        <div v-if="!courseContentModelChange.isVideo" class="add-course-edit">
          <!-- 渲染编辑器内容 -->
          <div class="content-preview" v-html="courseContentModelChange.content"></div>
          <BasicEditor
              v-model="courseContentModelChange.content"
              ref="editorChange"
          />
        </div>
        <div v-else>
          sss
        </div>
      </div>
    </a-modal>
    <!--  评论详情  -->
    <a-modal v-model:open="openComment"
             width="1300px"
             :footer=null
             class="add-course-content-modal"
             title="评论详情"
    >
      <div class="comment-detail">
        <div class="comment-detail-left">
          <EReviewDetailsComp :cid="Number(course.id)"/>
        </div>
        <div class="comment-detail-right">
          <!--          :dataSource="commentList"-->
          <a-table :columns="columns" :data-source="courseComment" row-key="id" bordered :pagination="{ pageSize: 4 }">
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'avatar'">
                <img :src="useCommonStore().minioURLPre+record.avatar" alt="avatar"
                     style="width: 40px; height: 40px; border-radius: 50%;"/>
              </template>
              <template v-if="column.dataIndex === 'score'">
                <div
                    :style="{backgroundColor: getScoreColor(Number(record.score)),padding: '4px 8px',borderRadius: '8px',color: '#000000',display: 'inline-block'}"
                >
                  {{ record.score }}
                </div>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </a-modal>
    <!--  收益趋势  -->
    <a-modal v-model:open="openTrend"
             width="1300px"
             :footer=null
             class="add-course-content-modal"
             title="收益趋势"
    >
      <EOrderTrendComp style="height: 320px;" :cid="Number(course.id)"/>
    </a-modal>
    <a-modal v-model:open="openADD2"
             :footer=null
             width="1000px"
             class="add-course-content-modal"
             title="正在生成中请耐心等待...."
             :closable="false"
    >
      <div class="content-preview" style="width: 100%; font-size: 20px;padding: 20px;border-radius: 30px"
           v-html="courseContentAI"></div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import {useCommonStore} from "../../../store/CommonStore.ts";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {
  BarChartOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  EditOutlined,
  InboxOutlined,
  LineChartOutlined,
  PlusOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import {type UploadChangeParam} from 'ant-design-vue';
import {message, type UploadFile, type UploadProps} from 'ant-design-vue';
import {
  addCourseContentRequest,
  addCourseSectionRequest,
  getCourseSectionRequest,
  updateCourseSectionRequest,
  updateDeleteFlagRequest
} from "../../../api/CourseContentAPIs.ts";
import BasicEditor from "../../../components/BasicEditor.vue";
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import axios from "axios";
import {getCourseCommentRequest} from "../../../api/CommentAPIs.ts";
import EReviewDetailsComp from "../../../components/EChartsComp/EReviewDetailsComp.vue";
import EOrderTrendComp from "../../../components/EChartsComp/EOrderTrendComp.vue";
import {getCourseChapter1} from "../../../api/AIChatAPIs.ts";
// import DocxPreview from "../../../components/DocxPreview.vue";

const editorChange = ref();


// element通知
const elNotification = (title: string, message: string, position: any) => {
  ElNotification({
    title: title,
    message: message,
    position: position,
  })
}
const commonStore = useCommonStore()
const router = useRouter();
// const notVideoFlag = ref(false)

/**
 * "id":20,"teacherId":16,
 * "cover":"7f118769246fd991146f4f1913bfe753.jpg","
 * title":"Java SE 基础精讲",
 * "courseDescribe":"一套课程带你学会Java SE！",
 * "status":true,
 * "viewCount":0,
 * "buyCount":0,
 * "price":"0.0",
 * "isDelete":0,
 * "createTime":null
 */
// 反序列化课程数据
const course = ref({
  id: '',
  cover: '',
  title: '',
  courseDescribe: '',
  status: '',
  viewCount: 0,
  buyCount: 0,
  price: 0,
  isDelete: '',
  createTime: ''
});

// 返回上一页
const goBack = () => {
  router.go(-1); // 或者使用 router.back()
};
/**
 * 检查 localStorage 中是否有课程数据，并安全解析
 */
if (localStorage.getItem('course')) {
  try {
    const courseData = localStorage.getItem('course');
    if (courseData) {
      course.value = JSON.parse(courseData);
    }
  } catch (error) {
  }
}

// 课程小节选项
const activeKey = ref(['1']);
const customStyle = "border-radius: 20px;"

// 课程小节
const courseContent = ref([{
  id: 0,
  courseId: '',
  title: '',
  sort: 0,
  isVideo: false,
  content: '',
  isDelete: false,
  status: true,
  createTime: '',
}])

/**
 * 获取课程小节
 * @param courseID
 */
const getCourseContent = (courseID: any) => {
  getCourseSectionRequest(courseID).then(res => {
    if (res.data.code === 200) {
      courseContent.value = res.data.data;
    } else {
      elNotification("失败", res.data.data, 'top-left')
    }
  })
};
getCourseContent(course.value.id)

// 添加弹窗
const openADD = ref<boolean>(false);
const showModalADD = () => {
  openADD.value = true;
};

const checkedType = ref('1');
// 课程小节模型
const courseContentModel = ref({
  courseId: 0,
  sort: 0,
  isVideo: 1,
  content: '',
  title: ''
})


/**
 * 文件上传
 */
const fileList = ref<UploadFile[]>([]);
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== 'uploading') {
  }
  if (status === 'done') {
    message.success(`${info.file.name} 文件上传成功.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} 文件上传失败.`);
  }
};

function handleDrop(e: DragEvent) {
  console.log(e);
}

/**
 * 上传前
 * @param file
 */
const beforeUpload: UploadProps['beforeUpload'] = (file: any) => {
  fileList.value = [...(fileList.value || []), file];
  return false;
};

/**
 * 添加课程小节
 */
const handleADD = () => {
  if (courseContentModel.value.isVideo && courseContentModel.value.title === '') {
    ElMessage.error('请填写完整信息');
    return
  } else if (courseContentModel.value.title === '') {
    ElMessage.error('请填写完整信息');
    return
  }
  if (checkedType.value === '1') {
    courseContentModel.value.isVideo = 0;
    courseContentModel.value.courseId = Number(course.value.id);
    addCourseSectionRequest(courseContentModel.value).then(res => {
      if (res.data.code === 200) {
        elNotification("成功", "添加课程小节成功", 'top-left')
        getCourseContent(course.value.id)
        courseContentModel.value.title = ''
      } else {
        elNotification("失败", res.data.msg, 'top-left')
      }
    })
  } else {
    if (checkedType.value === '2') {
      courseContentModel.value.isVideo = 1;
    } else if (checkedType.value === '3') {
      courseContentModel.value.isVideo = 2;
    }
    courseContentModel.value.courseId = Number(course.value.id);
    courseContentModel.value.content = '';
    addCourseSectionRequest(courseContentModel.value).then(res => {
      if (res.data.code === 200) {
        addCourseContentRequest(res.data.data, fileList).then(res => {
          if (res.data.code === 200) {
            elNotification("成功", "添加课程小节成功", 'top-left')
            getCourseContent(course.value.id)
          } else {
            elNotification("失败", res.data.msg, 'top-left')
          }
        })
        courseContentModel.value.content = ''
        courseContentModel.value.title = ''
      } else {
        elNotification("失败", res.data.msg, 'top-left')
      }
    })
  }
  openADD.value = false;
};

/**
 * 点击修改小节
 * @param course
 */
const handleClickChange = (course: any) => {
  showModalChange(course)
};

/**
 * 修改小节弹窗
 */
const openChange = ref<boolean>(false);
const showModalChange = (course: any) => {
  courseContentModelChange.value.id = course.id;
  courseContentModelChange.value.courseId = course.courseId;
  courseContentModelChange.value.title = course.title;
  courseContentModelChange.value.sort = course.sort;
  courseContentModelChange.value.isVideo = course.isVideo;
  if (!course.isVideo) {
    courseContentModelChange.value.content = course.content;
  } else {
    courseContentModelChange.value.content = course.content;
  }

  openChange.value = true;
};


// 课程小节修改模型
const courseContentModelChange = ref({
  id: 0,
  courseId: 0,
  sort: 0,
  isVideo: false,
  content: '<p></p>',
  title: ''
})
/**
 * 修改课程小节
 */
const handleChangeChange = () => {
  updateCourseSectionRequest(courseContentModelChange.value).then(res => {
    if (res.data.code === 200) {
      elNotification("成功", "修改课程小节成功", 'top-left')
      getCourseContent(course.value.id)
      courseContentModelChange.value.title = ''
      openChange.value = false
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
}
/**
 * 取消修改课程小节
 */
const handleCancelChangeChange = () => {
  openChange.value = false
  courseContentModelChange.value.title = ''
}
/**
 * 删除课程小节
 * @param cCid
 */
const handleClickDelete = (cCid: any) => {
  ElMessageBox.confirm(
      '此操作将永久删除该课程小节, 是否继续?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(() => {
    updateDeleteFlagRequest(cCid, true).then(res => {
      if (res.data.code === 200) {
        elNotification("成功", "删除课程小节成功", 'top-left')
        getCourseContent(course.value.id)
      } else {
        elNotification("失败", res.data.msg, 'top-left')
      }
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消删除',
    });
  });
}

/**
 * 获取文件后缀
 * @param fileName
 */
const getFileSuffix = (fileName: any) => {
  const index = fileName.lastIndexOf('.');
  return fileName.substring(index + 1);
}

/**
 * 文件类型匹配
 * @param suffix
 */
function getMimeType(suffix: string): string {
  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    txt: "text/plain",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    zip: "application/zip",
    rar: "application/x-rar-compressed",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    // 可以根据需要继续扩展
  };

  // 返回对应的 MIME 类型，如果未找到则返回默认的二进制流类型
  return mimeTypes[suffix.toLowerCase()] || "application/octet-stream";
}

// 8b6e8cca8912697818c0df27eef6815c.pdf
/**
 * 文件预览
 * @param url
 */
function viewFile(url: string) {
  const suffix = url.split("/").pop()?.split(".").pop() || ""; // 获取文件后缀
  const mimeType = getMimeType(suffix); // 获取正确的 MIME 类型
  axios({
    url,
    method: "get",
    responseType: "arraybuffer",
  }).then((res) => {
    // 将返回的数据转为 Blob 对象
    const fileBlob = new Blob([res.data], {type: mimeType});
    // 生成 Blob URL
    const fileUrl = window.URL.createObjectURL(fileBlob);

    // 根据文件类型决定是预览还是下载
    if (mimeType.startsWith("image/") || mimeType === "application/pdf") {
      // 图片或 PDF 文件，直接在新窗口打开预览
      window.open(fileUrl + "#toolbar=0");
    } else {
      // 其他文件类型，直接下载
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = url.split("/").pop() || "file"; // 设置下载文件名
      link.click();
      window.URL.revokeObjectURL(fileUrl); // 释放 Blob URL
    }
  });
}

// 评价弹窗
const openComment = ref<boolean>(false);
// 评价数组
const courseComment = ref([])
const showModalComment = () => {
  openComment.value = true;
  // 初始化评论
  getCourseCommentRequest(course.value.id).then((res) => {
    if (res.data.code === 200) {
      courseComment.value = res.data.data
    }
  })
};
// 评价模型
const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 80,
    align: 'center'
  }, {
    title: '用户名',
    dataIndex: 'nickName',
    width: 120,
    align: 'center'
  },
  {
    title: '评论内容',
    dataIndex: 'content',
    align: 'center',
    width: 200,
    slot: true,

  }, {
    title: '点赞数量',
    dataIndex: 'like',
    align: 'center',
  }, {
    title: '评分',
    dataIndex: 'score',
    align: 'center',
    slot: true,
  }, {
    title: '评论时间',
    dataIndex: 'createTime',
    align: 'center'
  }
]
const getScoreColor = (score: number) => {
  if (score >= 4) return 'rgba(82,196,26,0.56)';
  if (score >= 2) return 'rgba(250,173,20,0.46)';
  return 'rgba(245,34,45,0.47)';
}

// 趋势弹窗
const openTrend = ref<boolean>(false);

const showModalTrend = () => {
  openTrend.value = true;
  // 初始化
};

// 添加弹窗
const openADD2 = ref<boolean>(false);
const showModalADD2 = () => {
  openADD2.value = !openADD2.value;
};

const response = ref('')
const readerRes = ref('')
const courseContentAI = ref('')
const getC1 = (title: string, content: string) => {
  const eventSource = getCourseChapter1(title, content)

  eventSource.onmessage = (event) => {

    const chunk = event.data
    if (chunk === '[complete]') {
      eventSource.close()
      // msgList.value.push(readerRes.value)
      readerRes.value = ''
      response.value = ''
      setTimeout(() => {
        showModalADD2()
        setTimeout(() => {
          courseContentModel.value.content = courseContentAI.value
          showModalADD()
        }, 1000)
      }, 1000)
      return
    }
    response.value += chunk
    let readerResValue = response.value.replace(/\\\[(.*?)\\\]/gs, '$$$1$$')
    readerRes.value = readerResValue
    // ----
    courseContentAI.value = String(readerRes.value)
    // ----
  }
}

const opC1 = () => {
  showModalADD2()
  courseContentModel.value.title = '第一节: 课程简介绍'
  // console.log(course.value.title, course.value.courseDescribe)
  getC1(course.value.title, course.value.courseDescribe)
}


</script>

