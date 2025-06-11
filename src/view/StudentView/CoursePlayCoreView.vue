<script setup lang="ts">
// 获取所有视频项
import TopBar from "../../components/TopBar.vue";
import {onMounted, ref, h, watch} from 'vue';
import {getCourseSectionRequest, updateCourseContentProgressRequest} from "../../api/CourseContentAPIs.ts";
import {getCourseByIdRequest} from "../../api/CourseAPIs.ts";
import {getTeacherInfoByIdRequest, getUserAvatarByIdRequest, getUserInfo} from "../../api/UserAPIs.ts";
import {useCommonStore} from "../../store/CommonStore.ts";
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import type Plyr from "plyr";
import {getHostIp, getVideoUrl} from "../../api/MinIOAPIs.ts";
import {useRoute} from "vue-router";
import {addCommentRequest, deleteCommentRequest, getCommentRequest, likeCommentRequest} from "../../api/CommentAPIs.ts";
import {
  LikeOutlined,
  RightOutlined,
  CaretRightOutlined, SmileOutlined
} from "@ant-design/icons-vue";
import {notification} from "ant-design-vue";
import {getCourseRateRequest, rateCourseRequest} from "../../api/OrderAPIs.ts";
import {addMemorandum} from "../../api/MemorandumAPIs.ts";
import FooterComp from "../../components/FooterComp.vue";

const playerRef = ref<{ player: Plyr } | null>(null);

const activeVideoIndex = ref(0); // 默认第一个章节激活
const activeVideoURL = ref('http://localhost:9090/cf-pols-minio');
const activeIsVideo = ref(1);
const activeVideoTitle = ref('');
const activeFileURRL = ref('');
const courseLength = ref(0);

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

// IP全量URL
const minioIP_URL = ref('')

// 非视频内容、非文本内容的URL
const nonVideoContentText = ref('')
const handleVideoClick = (index: number, cid: number, cti: string, isVideo: number, ccon: string) => {
  activeVideoIndex.value = index;
  // 封装学习进度对象
  const studyProgress = {
    userId: Number(localStorage.getItem('uid')),
    courseId: cid,
    nowSection: index + 1,
    allSection: courseLength.value,
  }
  // 上传学习进度
  updateCourseContentProgressRequest(studyProgress)
  activeVideoTitle.value = cti
  activeIsVideo.value = isVideo;
  if (playerRef.value) {
    const plyrInstance = playerRef.value.player;
    plyrInstance.pause();
  }
  if (isVideo == 1) {
    activeVideoURL.value = ccon
  } else {
    activeFileURRL.value = ccon
    // console.log(minioIP_URL.value + activeFileURRL.value)
    // console.log(minioIP_URL.value + activeFileURRL.value)
    nonVideoContentText.value = "http://127.0.0.1:8012/onlinePreview?url=" + encodeURIComponent(btoa(minioIP_URL.value + activeFileURRL.value))
  }

};

// 当前课程ID
const courseId = ref(20);
// 从外部获取当前课程id
const route = useRoute();


// 课程模型
const courseModel = ref({
  id: 0,
  teacherId: 0,
  cover: '',
  title: '',
  courseDescribe: '',
  status: 0,
  viewCount: 0,
  buyCount: 0,
  price: '',
  isDelete: 0,
  createTime: null,
  courseSectionList: [{
    content: '',
    courseId: 0,
    createTime: null,
    delete: false,
    id: 0,
    isVideo: 0,
    sort: 0,
    title: '',
  }]
})
// 老师模型
const teacherModel = ref({
  nickName: '',
  avatar: '',
})
// 用户模型
const userModel = ref({
  id: 0,
  nickName: '',
  avatar: '',
  fund: 0,
  identity: 0,
  isDisabled: 0,
  userName: ''
})
// 课程评分
const rating = ref(0);
const hoverRating = ref(0);
// 评论模型
const commentModel = ref([{
  id: 0,
  userId: 0,
  userName: '',
  reId: 0,
  avatar: '',
  target: '',
  courseId: 0,
  content: '',
  like: 0,
  createTime: null,
  children: [{
    id: 0,
    userId: 0,
    userName: '',
    reId: 0,
    target: '',
    courseId: 0,
    content: '',
    like: 0,
    createTime: null,
  }]
}])

onMounted(() => {
  courseId.value = Number(route.query.id)
  // 全量URL的获取
  getHostIp().then((res) => {
    minioIP_URL.value = res.data
  })
  // 获取课程详情
  getCourseByIdRequest(courseId.value).then((res) => {
    if (res.data.code === 200) {
      courseModel.value = res.data.data
      // 获取老师信息
      getTeacherInfoByIdRequest(courseModel.value.teacherId).then((res) => {
        if (res.data.code === 200) {
          teacherModel.value = res.data.data
        }
      })
    }
  })
  // 获取课程小节
  getCourseSectionRequest(courseId.value).then((res) => {
    if (res.data.code === 200) {
      courseModel.value.courseSectionList = res.data.data
      if (courseModel.value.courseSectionList.length > 0) {
        activeIsVideo.value = courseModel.value.courseSectionList[0].isVideo
        activeFileURRL.value = courseModel.value.courseSectionList[0].content
        activeVideoIndex.value = 0
        activeVideoTitle.value = courseModel.value.courseSectionList[0].title
      }
      courseLength.value = courseModel.value.courseSectionList.length
    }
  })
  // 获取用户信息
  getUserInfo().then((res) => {
    userModel.value = res.data.data
    userModel.value.avatar = useCommonStore().minioURLPre + userModel.value.avatar
    // 初始化课程评分
    const rateModel = {
      userId: userModel.value.id,
      courseId: courseId.value,
    }
    getCourseRateRequest(rateModel).then((res) => {
      if (res.data.code === 200) {
        rating.value = res.data.data
      }
    })
  })
  // 初始化评论区
  getCommentRequest(courseId.value).then((res) => {
    if (res.data.code === 200) {
      commentModel.value = res.data.data
      // 为每一个顶级评论添加头像
      for (const userComment of commentModel.value) {
        getUserAvatarByIdRequest(userComment.userId).then((res) => {
          userComment.avatar = useCommonStore().minioURLPre + res.data.data
        })
      }
    }
  })


})
watch(activeVideoURL, (newURL) => {
  if (newURL && playerRef.value) {
    const plyrInstance = playerRef.value.player;
    const accURL = ref('');
    getVideoUrl(newURL).then((url) => {
      accURL.value = url.data
    })
    if (plyrInstance) {
      // 重新设置视频源
      plyrInstance.source = {
        type: 'video',
        sources: [{
          src: useCommonStore().minioURLPre + newURL,
          type: 'video/mp4',
        }],
      };
    }
  }
});
// 评论文本
const commentText = ref('')
// 独立评论模型
const commentModelIndependent = ref({
  userId: 0,
  userName: '',
  courseId: 0,
  content: '',
})

// 发表评论
const submitComment = () => {
  if (commentText.value === '') {
    aliNotification('评论失败', '评论内容不能为空', 2)
    return
  }
  commentModelIndependent.value.content = commentText.value
  commentModelIndependent.value.userName = userModel.value.nickName
  commentModelIndependent.value.userId = userModel.value.id
  commentModelIndependent.value.courseId = courseId.value
  addCommentRequest(commentModelIndependent.value).then((res) => {
    if (res.data.code === 200) {
      aliNotification('评论成功', '评论成功', 2)
      commentText.value = ''
      // 重新初始化评论区
      getCommentRequest(courseId.value).then((res) => {
        if (res.data.code === 200) {
          commentModel.value = res.data.data
          // 为每一个顶级评论添加头像
          for (const userComment of commentModel.value) {
            getUserAvatarByIdRequest(userComment.userId).then((res) => {
              userComment.avatar = useCommonStore().minioURLPre + res.data.data
            })
          }
        }
      })
    }
  })
}
// 刷新评论区
const refreshComment = () => {
  // 重新初始化评论区
  getCommentRequest(courseId.value).then((res) => {
    if (res.data.code === 200) {
      commentModel.value = res.data.data
      // 为每一个顶级评论添加头像
      for (const userComment of commentModel.value) {
        getUserAvatarByIdRequest(userComment.userId).then((res) => {
          userComment.avatar = useCommonStore().minioURLPre + res.data.data
        })
      }
    }
  })
}

// 删除评论
const deleteComment = (commentId: any) => {
  deleteCommentRequest(commentId).then((res) => {
    if (res.data.code === 200) {
      aliNotification('删除成功', '删除成功', 2)
      // 重新初始化评论区
      refreshComment()
    }
  })
}
const activeReplyIndex = ref(-1);
const replyText = ref('');
const replyModel = ref({
  userId: 0,
  userName: '',
  reId: 0,
  target: '',
  courseId: 0,
  content: '',
});

const toggleReplyBox = (index: number) => {
  activeReplyIndex.value = activeReplyIndex.value === index ? -1 : index;
};

const submitReply = (commentId: number, target: string) => {
  if (!replyText.value.trim()) {
    aliNotification('回复失败', '回复内容不能为空', 2);
    return;
  }

  replyModel.value = {
    userId: userModel.value.id,
    userName: userModel.value.nickName,
    target: target,
    reId: commentId,
    courseId: courseId.value,
    content: replyText.value
  };

  // 回复的API调用
  addCommentRequest(replyModel.value).then(res => {
    if (res.data.code === 200) {
      aliNotification('回复成功', '回复已提交', 2);
      replyText.value = '';
      activeReplyIndex.value = -1;
      // 刷新评论列表
      refreshComment()
    }
  });
};

const cancelReply = () => {
  replyText.value = '';
  activeReplyIndex.value = -1;
};

// 点赞评论
// const likeComment = (commentId: any) => {
//   likeCommentRequest(commentId).then(() => {
//     // 刷新评论列表
//     refreshComment()
//   })
// }

const likeComment = (commentId: any, event: MouseEvent) => {

  const currentBtn = (event.target as HTMLElement)?.closest('.action-btn');
  if (currentBtn) {
    // 添加心跳动画类
    const likeIcon = currentBtn.querySelector('.like-icon');
    likeIcon?.classList.add('like-animation');

    // 动画结束后移除类
    setTimeout(() => {
      likeIcon?.classList.remove('like-animation');
    }, 500);
  }

  likeCommentRequest(commentId).then(() => {
    refreshComment();
  });
}


const setRating = (value: number) => {
  rating.value = value;
  console.log(rating.value)
  // 封装评价对象
  const rateModel = {
    userId: userModel.value.id,
    courseId: courseId.value,
    rate: value
  }
  rateCourseRequest(rateModel).then((res) => {
    if (res.data.code === 200) {
      aliNotification('评分成功', '您已为课程' + courseModel.value.title + '评分', 2)
    }
  })
};

const setHoverRating = (value: number) => {
  hoverRating.value = value;
};
// 速记
const stenography = ref('');
// 保存速记
const saveStenography = () => {
  if (stenography.value === '') {
    aliNotification('保存失败', '速记内容不能为空', 2)
    return
  }
  localStorage.setItem('stenography', stenography.value)
  aliNotification('保存成功', '速记已保存', 2)
  open.value = false
}
onMounted(() => {
  stenography.value = localStorage.getItem('stenography') || ''
})
// 上传速记
const uploadStenography = () => {
  // 封装速记对象
  const stenographyModel = {
    userId: userModel.value.id,
    content: stenography.value
  }
  addMemorandum(stenographyModel).then((res) => {
    if (res.data.code === 200) {
      aliNotification('上传成功', '速记已上传', 2)
      stenography.value = ''
      localStorage.setItem('stenography', '')
    }
  })
  open.value = false
}
const open = ref<boolean>(false);
// const showModal = () => {
//   open.value = true;
// };

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};

document.addEventListener('keydown', (event) => {
  if (event.altKey && event.key === 'Enter') {
    if (open.value === true) {
      open.value = false
      return
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    open.value = true
  }
})

</script>

<template>
  <div class="core">
    <TopBar :fixed-state="true"/>
    <div class="course-container">
      <div class="video-section">
        <div class="video-title">{{ activeVideoTitle }}</div>
        <div v-show="activeIsVideo === 1">
          <vue-plyr style="z-index: 999;" class="video-item-core" ref="playerRef">
            <video data-plyr-config='{ "blankVideo": "" }' class="video-player" crossorigin="anonymous" preload="auto"
                   id="my-video" playsinline controls>
              <source :src="activeVideoURL" type="video/mp4"/>
            </video>
          </vue-plyr>
        </div>
        <div v-show="activeIsVideo === 0" class="non-video-content-text">
          <div class="content-preview" v-html="activeFileURRL"></div>
        </div>
        <div v-show="activeIsVideo === 2" class="non-video-content">
          <iframe :src="nonVideoContentText" class="other-con" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="course-info">
          <h1 class="course-title">{{ courseModel.title }}</h1>
          <div class="instructor-info">
            <div class="instructor-avatar">
              <img :src="useCommonStore().minioURLPre + teacherModel.avatar" alt="">
            </div>
            <div class="instructor-name">讲师：{{ teacherModel.nickName }}</div>
          </div>
          <div class="course-description">
            {{ courseModel.courseDescribe }}
          </div>
        </div>

        <!-- 新增评论区 -->
        <div class="comments-section">
          <h3 class="comments-title">课程评论 ({{ commentModel.length }})</h3>
          <!-- 评论输入框 -->
          <div class="comment-input-container">
            <div class="user-avatar">
              <img :src="userModel.avatar" alt="avatar"/>
            </div>
            <div class="comment-input-wrapper">
              <textarea v-model="commentText" placeholder="写下你的评论..." rows="3"></textarea>
              <div class="comment-actions">
                <a-button type="default" @click="submitComment" class="comment-submit">发表评论</a-button>
              </div>
            </div>
          </div>
          <!-- 评论列表 -->
          <div class="comments-list" v-for="(item, index) in commentModel" :key="index">
            <div class="comment-item">
              <div class="user-avatar">
                <img :src="item.avatar" alt="avatar"/>
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="username">{{ item.userName }}</span>
                  <span class="comment-time">{{ item.createTime }}</span>
                </div>
                <p class="comment-text">{{ item.content }}</p>
                <div class="comment-actions">
                  <div class="action-btn">
                    <div class="like-container">
                      <label class="btn-label">
                        <span class="like-count">{{ item.like }}</span>
                        <input class="input-box" type="checkbox">
                        <LikeOutlined @click="likeComment(item.id, $event)" class="like-icon"/>
                        <div class="fireworks">
                          <div class="checked-like-fx"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <a-button @click="deleteComment(item.id)" v-if="item.userId === userModel.id" type="primary"
                            class="action-btn action-btn-re action-btn-delete">删除
                  </a-button>
                  <a-button v-else type="primary" class="action-btn action-btn-re"
                            @click="toggleReplyBox(index)">回复
                  </a-button>
                </div>

                <!-- 回复框 -->
                <div v-if="activeReplyIndex === index" class="reply-box">
                  <textarea v-model="replyText" placeholder="写下你的回复..." rows="2"></textarea>
                  <div class="reply-actions">
                    <a-button class="reply-actions-butt" type="default" @click="submitReply(item.id, item.userName)">
                      提交回复
                    </a-button>
                    <a-button class="reply-actions-butt" type="default" @click="cancelReply">取消</a-button>
                  </div>
                </div>
                <!--      子评论        -->
                <div class="comment-item-child">
                  <div class="comment-item-child-content" v-for="(itemChild, chIndex) in item.children" :key="chIndex">
                    <div class="comment-item-child-header">
                      <div class="comment-item-child-header-str">
                        <CaretRightOutlined/>
                        <span class="username">{{ itemChild.userName }}</span>
                        <RightOutlined/>
                        <span>
                          @{{ item.userName }}
                        </span>
                        <span class="comment-time">{{ itemChild.createTime }}</span>
                      </div>
                    </div>
                    <p class="comment-text">{{ itemChild.content }}</p>
                    <div @click="likeComment(itemChild.id, $event)" class="comment-actions">
                      <button class="action-btn">
                        <LikeOutlined/>
                        <span class="like-count">{{ itemChild.like }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="playlist-section">
        <div class="playlist-header">
          <h2 class="playlist-title">课程目录</h2>
        </div>
        <div class="playlist-content">
          <div v-for="(item, index) in courseModel.courseSectionList" :key="index" class="video-item"
               :class="{ active: activeVideoIndex === index }"
               @click="handleVideoClick(index, courseModel.id, item.title, Number(item.isVideo), item.content)">
            <div class="video-item-number">{{ index + 1 }}</div>
            <div class="video-item-info">
              <div class="video-item-title">
                {{ item.title }}
              </div>
              <div class="video-item-duration">
              </div>
            </div>
          </div>
        </div>
        <!-- 在课程目录下方添加笔记区域 -->
        <div class="notes-area">
          <div class="notes-header">
            <h2 class="notes-title">课堂速记</h2>
          </div>
          <div class="notes-editor">
            <textarea v-model="stenography" placeholder="在这里书写速记..."></textarea>
          </div>
          <div class="notes-actions">
            <button @click="uploadStenography" class="notes-btn upload-btn">
              <svg viewBox="0 0 1024 1024" width="16" height="16">
                <path
                    d="M512 419.84L300.8 631.04a32 32 0 01-45.12-45.12l256-256a32 32 0 0145.12 0l256 256a32 32 0 01-45.12 45.12L556.8 419.84V864a32 32 0 11-64 0V419.84z"
                    fill="currentColor"/>
              </svg>
              上传速记
            </button>
            <button @click="saveStenography" class="notes-btn save-btn">保存速记</button>
          </div>
        </div>
        <!-- 在课程目录下方添加课程评价区域 -->
        <div class="assessment-area">
          <div class="notes-header">
            <h2 class="notes-title">为课程评分</h2>
          </div>
          <div class="rating-container">
            <div class="stars">
              <span
                  v-for="star in 5"
                  :key="star"
                  @click="setRating(star)"
                  @mouseover="setHoverRating(star)"
                  @mouseout="setHoverRating(0)"
                  class="star"
                  :class="{
                  'filled': star <= (hoverRating || rating),
                  'animated': star === (hoverRating || rating)
                }"
              >
                ★
              </span>
            </div>
            <div class="rating-text">
              {{ rating ? `您已评分: ${rating}星` : '请点击星星评分' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  脚丫子  -->
    <FooterComp/>
    <!--  便签弹窗  -->
    <a-modal v-model:open="open" :z-index="6000" title="速记" @ok="handleOk">
      <div class="notes-editor">
        <textarea v-model="stenography" placeholder="在这里书写速记..."></textarea>
      </div>
      <template #footer>
        <div class="notes-actions">
          <button @click="uploadStenography" class="notes-btn upload-btn">
            <svg viewBox="0 0 1024 1024" width="16" height="16">
              <path
                  d="M512 419.84L300.8 631.04a32 32 0 01-45.12-45.12l256-256a32 32 0 0145.12 0l256 256a32 32 0 01-45.12 45.12L556.8 419.84V864a32 32 0 11-64 0V419.84z"
                  fill="currentColor"/>
            </svg>
            上传速记
          </button>
          <button @click="saveStenography" class="notes-btn save-btn">保存速记</button>
        </div>
      </template>

    </a-modal>
  </div>
</template>
<!--<style>
.plyr&#45;&#45;fullscreen-active {
  z-index: 5000 !important; /* 确保低于模态框的 6000 */
}

.ant-modal-wrap {
  z-index: 6000;
}
</style>-->
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "HarmonyOS Sans SC", "Microsoft YaHei", sans-serif;
}

.non-video-content-text {
  padding: 30px;
}

.core {
  padding-bottom: 30px;
  background-image: linear-gradient(to top, #ffd8ee, #f8daf4, #f0dcf9, #e8defd, #dfe0ff, #e0e3ff, #e1e6ff, #e2e9ff, #ebeeff, #f3f3ff, #f9f9ff, #ffffff);
}

.video-section {
  aspect-ratio: 20/9;
  margin-top: 110px;
}

.playlist-section {
  margin-top: 110px;
}

body {
  background: #f6f7f9;
  min-height: 100vh;
  padding: 20px;
}

.course-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 20px;
}

.other-con {
  width: 100%;
  height: 500px;
}

.video-section {
  flex: 1;
  background: white;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  aspect-ratio: 20/9;
  overflow: visible;
}

.video-player {
  width: 100%;
  aspect-ratio: 20/9;
  background: #000;
  border-radius: 12px 12px 0 0;

}

.video-item-core {
  aspect-ratio: 20/9;
  width: 100%;
}

.course-info {
  padding: 20px;
}

.course-title {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
}

.instructor-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.instructor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  background: #e0e0e0;
  overflow: hidden;
}

.instructor-name {
  color: #666;
}

.course-description {
  color: #666;
  line-height: 1.6;
  font-size: 14px;
}

.playlist-section {
  width: 320px;
  background: white;
  border-radius: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
}

.playlist-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.playlist-title {
  font-size: 1.2em;
  color: #333;
}

.playlist-content {
  max-height: 280px;
  overflow-y: auto;
  padding: 10px;
}

.playlist-content::-webkit-scrollbar {
  width: 6px;
}

.playlist-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.playlist-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.playlist-content::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.video-item {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  box-sizing: border-box;
}

.video-item:hover {
  background: #f0f2f5;
}

.video-item.active {
  background: #e6f4ff;
  color: #1677ff;
}

.video-item-number {
  width: 24px;
  height: 24px;
  background: #f0f2f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 12px;
}

.video-item.active .video-item-number {
  background: #1677ff;
  color: white;
}

.video-item-info {
  flex: 1;
}

.video-item-title {
  font-size: 14px;
  margin-bottom: 4px;
}

.video-item-duration {
  font-size: 12px;
  color: #999;
}

@media (max-width: 768px) {
  body {
    padding: 0;
  }

  .course-container {
    flex-direction: column;
    margin: 0;
  }

  .playlist-section {
    position: static;
  }

  .video-section,
  .playlist-section {
    aspect-ratio: 20/9;
    border-radius: 0;
  }
}

.comments-section {
  padding: 20px;
  border-top: 1px solid #eee;
}

.comments-title {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 20px;
}

.comment-input-container {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  flex-shrink: 0;
  overflow: hidden;
}

.comment-input-wrapper {
  flex: 1;
}

.comment-input-wrapper textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
  margin-bottom: 10px;
  transition: border-color 0.3s;
}

.comment-input-wrapper textarea:focus {
  outline: none;
  border-color: #1677ff;
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
}

.comment-submit {
  font-family: "HarmonyOS Sans SC", sans-serif;
  padding: 8px 20px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #5c5c5c;
  border-radius: 10px;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  transition: all 0.5s;
}

.comment-submit:hover {
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  color: #535353;
  transition: all 0.5s;

}

.comments-list {
  margin-top: 20px;
  background-image: linear-gradient(120deg, rgba(161, 196, 253, 0.34) 0%, rgba(194, 233, 251, 0.39) 100%);
  border-radius: 20px;
  padding-left: 20px;
}

.comment-item-child {
  padding-left: 20px;
  background-image: linear-gradient(120deg, rgba(255, 255, 255, 0.4) 0%, rgba(150, 230, 161, 0) 100%);
  border-radius: 20px;
  width: calc(100% - 64px);
}

.comment-item-child-header {
  padding-top: 20px;
  display: flex;
  align-items: center;
}

.comment-item-child-header-str {
  display: flex;
  align-items: center;
  justify-content: center;
}

.comment-item {
  display: flex;
  gap: 15px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.comment-content {
  flex: 1;
}

.comment-header {
  margin-bottom: 8px;
}

.username {
  font-weight: 500;
  color: #333;
  margin-right: 10px;
}

.comment-time {
  color: #999;
  font-size: 12px;
  margin-left: 10px;
}

.comment-text {
  color: #666;
  line-height: 1.6;
  font-size: 14px;
  margin-bottom: 8px;
}

.action-btn {
  font-family: "HarmonyOS Sans SC", sans-serif;
  border: none;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  margin-right: 15px;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn-re {
  color: #5c5c5c;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
}

.action-btn-delete {
  background-image: linear-gradient(120deg, #fda1a1 0%, rgb(255, 255, 255) 100%);
}

.action-btn:hover {
  color: #1677ff;
}

.like-count {
  color: #999;
  margin-right: 4px;
  margin-left: 10px;
  margin-top: 7px;
}

@media (max-width: 768px) {
  .comments-section {
    padding: 15px;
  }
}

.assessment-area {
  border-top: 1px solid #eee;
  padding: 15px;
}

.notes-area {
  border-top: 1px solid #eee;
  padding: 15px;
}

.notes-header {
  padding-bottom: 10px;
}

.notes-title {
  font-size: 1.2em;
  color: #333;
}

.notes-editor {
  margin-bottom: 12px;
}

.notes-editor textarea {
  width: 100%;
  height: 300px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
  line-height: 1.6;
  transition: border-color 0.3s;
}

.notes-editor textarea:focus {
  outline: none;
  border-color: #1677ff;
}

.notes-editor textarea::-webkit-scrollbar {
  width: 6px;
}

.notes-editor textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.notes-editor textarea::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.notes-editor textarea::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.notes-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.notes-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.upload-btn {
  background: #f0f0f0;
  color: #666;
}

.upload-btn:hover {
  background: #e0e0e0;
}

.save-btn {
  background: #1677ff;
  color: white;
}

.save-btn:hover {
  background: #4096ff;
}

@media (max-width: 768px) {
  .notes-editor textarea {
    height: 200px;
  }
}

.video-title {
  font-size: 1.3em;
  color: #333;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 25px;
  display: inline-block;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  background-image: linear-gradient(120deg, rgba(224, 195, 252, 0.38) 0%, rgba(142, 197, 252, 0.08) 100%);
  margin: 10px;
  padding: 12px 20px;
}

.reply-box {
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  color: #5c5c5c;
  background-image: linear-gradient(120deg, #a1c4fd 0%, rgba(194, 233, 251, 0) 100%);
  width: 90%;
}

.reply-box textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  margin-bottom: 8px;

}

.reply-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.reply-actions-butt {
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  color: #5c5c5c;
  padding-left: 10px;
  padding-right: 10px;
}

.like-container {
  position: relative;
}

.btn-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.input-box {
  display: none;
}

.input-box:checked ~ .fireworks .checked-like-fx {
  display: block;
  animation: firework 0.5s ease-out;
}

.like-icon {
  margin-left: 5px;
  transition: color 0.3s;
}

.fireworks {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.checked-like-fx {
  position: absolute;
  display: none;
  width: 4px;
  height: 4px;
  border-radius: 5px;
  margin-top: -3px;
  background: rgba(255, 71, 87, 0.22);
}

@keyframes firework {
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(var(--x), var(--y));
    opacity: 0;
  }
}

.like-icon {
  margin-left: 5px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  font-size: 20px;
}

.input-box:checked + .like-icon {
  color: #ff4757;
  transform: scale(1.2);
}

.fireworks {
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
}

.checked-like-fx {
  position: absolute;
  width: 65px;
  height: 31px;
  background: rgba(255, 71, 87, 0.27);
  animation: firework 0.8s ease-out forwards;
  transition: all 0.8s;
}

@keyframes firework {
  0% {
    transform: translate(0, 0);
    opacity: 1;
    width: 0;
    height: 0;
    box-shadow: 0 0 0 2px rgba(255, 71, 87, 0.5),
    0 0 0 4px rgba(255, 71, 87, 0.3),
    0 0 0 6px rgba(255, 71, 87, 0.1);
  }
  25% {
    opacity: 1;
    width: 20px;
    height: 12px;
    box-shadow: 0 0 0 2px rgba(255, 71, 87, 0.5),
    0 0 0 4px rgba(255, 71, 87, 0.3),
    0 0 0 6px rgba(255, 71, 87, 0.1);
  }
  100% {
    opacity: 0;
    width: 65px;
    height: 32px;
    box-shadow: 0 0 0 2px rgba(255, 71, 87, 0.5),
    0 0 0 4px rgba(255, 71, 87, 0.3),
    0 0 0 6px rgba(255, 71, 87, 0.1);
  }
}

/* 添加心跳动画 */
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.like-animation {
  animation: heartbeat 0.5s ease-in-out;
}

.assessment-area {
  border-top: 1px solid #eee;
  padding: 15px;
}

.rating-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.stars {
  font-size: 28px;
  display: flex;
  gap: 5px;
}

.star {
  color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.star.filled {
  color: #ffc107;
  text-shadow: 0 0 5px rgba(255, 193, 7, 0.5);
}

.star.animated {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.rating-text {
  font-size: 14px;
  color: #666;
}
</style>