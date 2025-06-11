<script setup lang="ts">
import {onMounted, ref} from "vue";
import TopBar from "../../components/TopBar.vue";
import {getBannerVideo} from "../../api/MinIOAPIs.ts";
import {useCommonStore} from "../../store/CommonStore.ts";
import {getBuyCourseRequest} from "../../api/OrderAPIs.ts";
import router from "../../router";

// 导航栏是否固定
const NavigationBarFixed = ref(true);
// 用户ID
const userID = ref(localStorage.getItem('uid'))

const BannerVideoURL = ref('')

const hoverIndex = ref(-1);
const courses = ref([
  {
    id: 1,
    teacherId: 1,
    title: 'Vue 3 高级开发',
    cover: 'https://example.com/course1.jpg',
    courseDescribe: "一套课程带你学会Java SE！",
    learningProgress: {
      userId: 1,
      courseId: 1,
      nowSection: 8,
      allSection: 8,
      percent: 100

    }
  }
]);
onMounted(() => {
  getBannerVideo().then((res) => {
    BannerVideoURL.value = useCommonStore().minioURLPre + res.data.data
  })
  getBuyCourseRequest(userID.value).then((res) => {
    courses.value = res.data.data
    for (let i = 0; i < courses.value.length; i++) {
      courses.value[i].learningProgress = res.data.map.learningProgress[i]
      courses.value[i].cover = useCommonStore().minioURLPre + courses.value[i].cover
    }
    console.log(courses.value)

  })
})

// 课程跳转
const goToCourse = (courseId: number) => {
  router.push({
    path: '/student/coursePlay',
    query: {
      id: courseId,
    }
  })
}

</script>

<template>
  <div class="core">
    <div class="top-bar">
      <div class="stu-header">
        <TopBar :fixedState="NavigationBarFixed" style="position: absolute"/>
        <video autoplay muted loop class="banner-video" disablePictureInPicture :key="BannerVideoURL">
          <source :src="BannerVideoURL" type="video/mp4">
        </video>
      </div>
    </div>
    <div class="my-course-view">
      <div class="course-container">
        <h2 class="section-title"><span>我的课程</span></h2>
        <div class="course-list">
          <div @click="goToCourse(course.id)" v-for="(course, index) in courses" :key="course.id" class="course-item" @mouseenter="hoverIndex = index"
               @mouseleave="hoverIndex = -1" :class="{ 'hovered': hoverIndex === index }">
            <div class="course-image">
              <img :src="course.cover" alt="课程封面">
            </div>
            <div class="course-content">
              <div class="course-header">
                <h3>{{ course.title }}</h3>
                <span class="instructor">{{ course.courseDescribe }}</span>
              </div>
              <div class="course-meta">
                <span class="lessons">{{ course.learningProgress.allSection }}课时</span>
                <div class="progress-container">
                  <div class="progress-bar">
                    <div class="progress" :style="{ width: course.learningProgress.percent + '%' }"></div>
                  </div>
                  <span class="progress-text">{{ course.learningProgress.percent }}% 已完成</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.core {
  width: 100%;
  background: radial-gradient(125% 125% at -2% 101%,
  rgba(245, 87, 2, 1) 10.5%,
  rgba(245, 120, 2, 1) 16%,
  rgba(245, 140, 2, 1) 17.5%,
  rgba(245, 170, 100, 1) 25%,
  rgba(238, 174, 202, 1) 40%,
  rgba(202, 179, 214, 1) 65%,
  rgba(148, 201, 233, 1) 100%);
  min-height: 100vh;
}

.stu-header {
  height: 110px;
  object-fit: cover;
}

.banner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 0 80px 80px;
  filter: blur(10px);
}

.my-course-view {
  margin: 0 auto;
  padding: 2rem 100px;
}

.course-list {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.39);
  gap: 1rem;
}

.course-item {
  display: flex;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 160px;
  transform: translateY(50px);
  opacity: 0;
  animation: slideUp 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
  cursor: pointer;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.course-item:nth-child(1) {
  animation-delay: 0.1s;
}

.course-item:nth-child(2) {
  animation-delay: 0.2s;
}

.course-item:nth-child(3) {
  animation-delay: 0.3s;
}

.course-item:nth-child(4) {
  animation-delay: 0.4s;
}

.course-item:nth-child(5) {
  animation-delay: 0.5s;
}

.course-item.hovered {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.course-image {
  width: 280px;
  height: 100%;
  overflow: hidden;
  flex-shrink: 0;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.course-item.hovered .course-image img {
  transform: scale(1.03);
}

.course-content {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.course-header {
  margin-bottom: 1rem;
}

.course-header h3 {
  font-size: 1.3rem;
  margin: 0 0 0.5rem;
  color: #2c3e50;
}

.instructor {
  color: #7f8c8d;
  font-size: 0.95rem;
}

.course-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.lessons {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #9b59b6);
  transition: width 0.5s ease;
}

.progress-text {
  color: #3498db;
  font-weight: bold;
  font-size: 0.9rem;
  min-width: 80px;
  text-align: right;
}

.section-title {
  font-size: 2rem;
  margin: 2rem 0;
  color: white;
  position: relative;
  display: inline-block;
  padding: 0 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  animation: slideInFromLeft 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}


.section-title::before,
.section-title::after {
  animation: none;
}

.section-title::before,
.section-title::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 50px;
  height: 3px;
  background: white;
  transform: translateY(-50%);
  opacity: 0.7;
}

.section-title::before {
  left: -60px;
}

.section-title::after {
  right: -60px;
}

.section-title span {
  position: relative;
  z-index: 1;
}

.section-title::before {
  animation: slideInLeft 0.5s ease-out forwards;
}

.section-title::after {
  animation: slideInRight 0.5s ease-out forwards;
}

@keyframes slideInLeft {
  from {
    transform: translateX(-20px) translateY(-50%);
    opacity: 0;
  }

  to {
    transform: translateX(0) translateY(-50%);
    opacity: 0.7;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(20px) translateY(-50%);
    opacity: 0;
  }

  to {
    transform: translateX(0) translateY(-50%);
    opacity: 0.7;
  }
}
</style>