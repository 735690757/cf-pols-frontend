<script setup lang="ts">
import {defineProps, ref} from 'vue';
import PopUps from "../OPWindow/PopUps.vue";
import router from "../../router";

const props = defineProps({
  courseSectionList: {
    type: Array as () => {
      content: string;
      courseId: number;
      createTime: null;
      delete: boolean;
      id: number;
      isVideo: boolean;
      sort: number;
      title: string;
    }[],
    default: () => []
  },
  isBuy: Boolean
})
const popWindow = ref<boolean>(false);

// 开始学习
const handleStartLearn = () => {
  if (!props.isBuy) {
    popWindow.value = true;
    setTimeout(() => {
      popWindow.value = false;
    }, 2500)
    return
  }
  router.push({
    path: '/student/coursePlay',
    query: {
      id: props.courseSectionList[0].courseId,
    }
  })
};
const handleOk = () => {
  popWindow.value = false;
};
</script>

<template>
  <div class="course-content-course-content">
    <!--   弹窗提示   -->
    <a-modal wrap-class-name="custom-transparent-modal" v-model:open="popWindow" @ok="handleOk"
             :closable="false"
             :footer="null">
      <pop-ups notification-btn3="" notification-btn2="" notification-btn=""
               notification-para="您尚未购买该课程，请先购买后再进行观看" notification-heading="请注意"/>
    </a-modal>
    <div class="course-section">
      <div class="section-content">
        <div class="lesson-item" @click="handleStartLearn" v-for="section in courseSectionList" :key="section.id">
          <span class="lesson-icon">📚</span>
          <span class="lesson-title">{{ section.title }}</span>
          <span class="lesson-duration"></span>
          <span class="lesson-status">去观看</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.course-content-course-content {
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  border-radius: 16px;
  overflow: hidden;
  background-image: linear-gradient(to right, #e0c2ff, #d8c9ff, #d1d0ff, #cdd6ff, #cde1ff, #d3e6ff, #d8ebff);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.course-section {
  background-image: linear-gradient(to right, #e0c2ff, #d8c9ff, #d1d0ff, #cdd6ff, #cde1ff, #d3e6ff, #d8ebff);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  margin: 20px;
}

.course-section:hover {
  box-shadow: 0 8px 20px rgba(74, 144, 226, 0.2);
}

.section-header {
  background-image: linear-gradient(to right, #e0c2ff, #d8c9ff, #d1d0ff, #cdd6ff, #cde1ff, #d3e6ff, #d8ebff);
  color: #333;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #eee;
}

.lesson-item {
  display: flex;
  align-items: center;
  padding: 18px;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  margin: 10px;
}

.lesson-item:hover {
  background: #f8f9ff;
  padding-left: 28px;
  border-radius: 12px;
}

.lesson-icon {
  font-size: 28px;
  margin-right: 20px;
  transition: transform 0.3s ease;
}

.lesson-item:hover .lesson-icon {
  transform: scale(1.2) rotate(5deg);
}

.lesson-status {
  padding: 6px 14px;
  border-radius: 18px;
  background: #e8f3ff;
  color: #4A90E2;
  font-size: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.lesson-item:hover .lesson-status {
  background: #4A90E2;
  color: white;
  transform: scale(1.05);
}

.lesson-title {
  flex: 1;
  font-size: 20px;
  color: #333;
  transition: color 0.3s ease;
}

.lesson-item:hover .lesson-title {
  color: #4A90E2;
}

.lesson-duration {
  color: #666;
  margin-right: 20px;
  transition: transform 0.3s ease;
  font-size: 16px;
}

.lesson-item:hover .lesson-duration {
  transform: scale(1.05);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-content {
  padding: 30px;
  min-height: 200px;
  animation: slideIn 0.6s ease-out;
}
</style>