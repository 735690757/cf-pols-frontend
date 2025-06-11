<script setup lang="ts">

import {onMounted, onUnmounted, ref} from "vue";
import router from "../router";

const fixedState = defineProps(['fixedState']);
const myHeaderEl = ref<HTMLElement | null>(null);
const data_translate_y=ref(-1)
const handleMouseMove = (event: MouseEvent) => {
  if (myHeaderEl.value) {
    if (event.clientY < 75 ) {
      myHeaderEl.value.style.transform = 'translateY(0)';
    } else {
      myHeaderEl.value.style.transform = 'translateY(-240%)';
    }
    if (fixedState.fixedState) {
      myHeaderEl.value.style.transform = 'translateY(0)';
      data_translate_y.value=0;
    }else {
      data_translate_y.value=-1;
    }

  }
};
onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove);
});

/**
 * 路由跳转
 * @param url
 */
const goToRouter = (url: any) => {
  router.push(url)
}
</script>

<template>
  <div>
    <div>
      <div class="myContainer" :data-translate-y="data_translate_y">
        <div class="myHeader" ref="myHeaderEl" >

          <div class="headerButt">
            <span @click="goToRouter('/student/myCourse')">我的课程</span>
          </div>
          <div class="headerButt">
            <span @click="goToRouter('/student/memorandum')">我的便签</span>
          </div>
          <div class="headerButt"></div>

          <div class="headerButt">
            <span></span>
          </div>
          <div class="headerButt">
            <span>😀</span>
          </div>
          <div class="headerButt" >
            <span @click="goToRouter('/student/yourself/changenickname')">关于自己</span>
          </div>
          <div class="circle-breath"></div>
          <img src="../assets/Logo.png"
               class="logoSaMxz"
               v-on:click="goToRouter('/student')"
               alt="logo"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myContainer {
  width: 100%;
  position: fixed;
  height: 70px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0 auto;
  z-index: 9999;
  overflow: hidden;
}

.myHeader {
  background-color: rgba(0, 0, 0, 0.3);
  width: 10%;
  position: fixed;
  height: 70px;
  transition: all 0.7s;
  transition-timing-function: ease-in-out;
  translate: 0 20px;
  border-radius: 100px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  justify-content: center;
  align-items: center;
  display: flex;
  /*min-width: 1120px;*/
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  text-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);;
}

.logoSaMxz {
  width: 60px;
  cursor: pointer;
  position: absolute;
  float: left;
  transition: all 0.7s;
}

.logoSaMxz:hover {
  width: 70px !important;
  transition: all 0.7s;
}

.myContainer[data-translate-y="0"] .myHeader{
  backdrop-filter: blur(10px);
  translate: 0 20px;
  width: 80%;
}
.myContainer[data-translate-y="0"] .headerButt {
  font-size: 22px;
  transition: 0.8s;
}
.myContainer[data-translate-y="0"] .headerButt span {
  filter: blur(0px);
  transition: all 0.7s;
}
.myHeader:hover {
  backdrop-filter: blur(10px);
  translate: 0 20px;
  width: 80%;
}

.myHeader:hover .headerButt {
  font-size: 22px;
  transition: 0.8s;
}

.myHeader:hover .headerButt span {
  filter: blur(0px);
  transition: all 0.7s;
}

.headerButt {
  display: flex;
  width: 100px;
  height: 50px;
  float: left;
  margin: 30px;
  justify-content: center;
  align-items: center;
  font-family: "HarmonyOS Sans SC", serif;
  font-size: 0;
  color: white;
  transition: 0.8s;
  min-width: 100px;
}

.headerButt span {
  background: linear-gradient(to right, #7defde, #7c81f6) no-repeat right bottom;
  background-size: 0 4px;
  transition: background-size 0.4s;
  cursor: pointer;
  filter: blur(10px);
}

.headerButt span:hover {
  background: linear-gradient(to right, #7defde, #f67cd3) no-repeat left bottom;
  filter: blur(0px);
  transition: background-size 0.4s;
  background-size: 100% 4px;
}

.circle-breath {
  background: #c0d6ff;
  box-shadow: 0 0 0 0 rgb(73, 134, 204);
  height: 30px;
  width: 60px;
  border-radius: 50%;
  animation: circleBreath 3s infinite;
  z-index: -2;
  position: absolute;
  filter: blur(10px);
}

@keyframes circleBreath {
  0% {
    transform: scale(0.60);
    box-shadow: 0 0 0 0 rgba(73, 125, 204, 0.6);
  }

  60% {
    transform: scale(2);
    box-shadow: 0 0 0 36px rgba(204, 73, 152, 0%);
  }

  100% {
    transform: scale(0.60);
    box-shadow: 0 0 0 0 rgba(204, 73, 152, 0%);
  }
}
</style>