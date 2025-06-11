<style scoped>
.teacher-core {
  overflow: hidden;
}

.logo {
  height: 60px;
  margin: 16px;
  background: rgba(41, 41, 41, 0.38);
  display: flex;
  align-items: center;
  border-radius: 10px;
}

.site-title {
  font-size: 23px;
  margin-left: 10px;
  color: #fff;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-weight: 700;
  cursor: pointer;
}

.site-layout {
  background: #fff;
}

[data-theme='dark'] .site-layout {
  background: #141414;
}

.logo-img {
  height: 45px;
  cursor: pointer;
}

.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-box-title {
  font-size: 20px;
  font-weight: 500;
  font-family: "HarmonyOS Sans SC", sans-serif;
  cursor: pointer;
}

.header-box-user {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  background: linear-gradient(to right, #141414, #a63468);
  color: white;
  padding: 0;
}

.header-box-user-outButt {
  width: 80px;
  border-radius: 40px;
  box-shadow: grey 0 0 2px;
  transition: all 0.7s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-box-user-outButt:hover {
  box-shadow: 0 0 100px rgba(255, 0, 0, 0.82);
  transition: all 0.7s;
}

/* 路由切换动画 */
/* fade-transform */
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}

/* 可能为enter失效，拆分为 enter-from和enter-to */
.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.footer-BHU {
  height: 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.7s;
}

.footer-BHU:hover {
  transition: all 0.7s;
  box-shadow: inset 0 0 50px #fff,
  inset 10px 0 40px #000dff,
  inset -10px 0 40px #0066ff,
  inset 10px 0 150px #3700ff,
  inset -10px 0 150px #00a6ff,
  0 0 25px #fff,
  -10px 0 80px #4800ff,
  10px 0 80px #00b2ff;
}

.footer-POLS {
  height: 25px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.7s;
}

.footer-POLS:hover {
  transition: all 0.7s;
  box-shadow: inset 0 0 50px #fff,
  inset 10px 0 40px #000dff,
  inset -10px 0 40px #0066ff,
  inset 10px 0 150px #3700ff,
  inset -10px 0 150px #00a6ff,
  0 0 25px #fff,
  -10px 0 80px #4800ff,
  10px 0 80px #00b2ff;
}

:deep(.ant-layout-sider-trigger) {
  background-color: #a84949;
}

:deep(.ant-menu-item-selected) {
  background-color: #f66666;
}

.layout-side {
  background: linear-gradient(to bottom, #141414 0%, #141414 80%, #f66666 100%);
}

:deep(.ant-menu-item) {
  transition: all 0.7s;
}

:deep(.ant-menu-item-active:hover) {
  box-shadow: inset #f66666 0 0 20px;
  transition: all 0.7s;
}

:deep(.ant-menu-submenu-active) {
  box-shadow: inset #f66666 0 0 20px;

  transition: all 0.7s;
}

.admin-core {
  overflow: hidden;
}

.header-box-avatar {
  margin-right: 10px;
}

.header-box-nickname {
  margin-right: 10px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 18px;
  font-weight: 500;
}

.teacher-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.16);
}
</style>
<template>
  <div class="teacher-core">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" class="layout-side" collapsible>
        <div class="logo">
          <img src="../assets/Logo.png" class="logo-img" alt="logo"/>
          <span class="site-title">{{ title }}</span>
        </div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item @click="goToRouter('/teacher/DataVisualizationT')" key="1">
            <pie-chart-outlined/>
            <span>数据可视化</span>
          </a-menu-item>
          <a-menu-item @click="goToRouter('/teacher/YourselfT')" key="2">
            <desktop-outlined/>
            <span>个人信息</span>
          </a-menu-item>
          <a-sub-menu

              key="sub1">
            <template #title>
              <span>
                <user-outlined/>
                <span>我的课程</span>
              </span>
            </template>
            <a-menu-item @click="goToRouter('/teacher/FreeCourse')" key="3">全部课程</a-menu-item>
            <a-menu-item @click="goToRouter('/teacher/CommentManagement')" key="4">课程评论</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
            <span>
              <PayCircleOutlined/>
              <span>我的收益</span>
            </span>
            </template>
            <a-menu-item key="6" @click="goToRouter('/teacher/earnings')">收益提现</a-menu-item>
            <a-menu-item key="8" @click="goToRouter('/teacher/earningHistory')">操作历史</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="9">
            <file-outlined/>
            <span>文件管理</span>
          </a-menu-item>
          <a-menu-item @click="goToRouter('/teacher/chatroom')" key="10">
            <MessageOutlined/>
            <span>聊天</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header">
          <div class="header-box">
            <span class="header-box-title">基于协同过滤算法的个性化在线学习系统 — TeacherView</span>
            <div class="header-box-user">
              <a-avatar class="header-box-avatar" size="large">
                <template #icon>
                  <img v-if="watchAvatar" :src="userAvatar" alt="avatar">
                  <UserOutlined v-else/>
                </template>
              </a-avatar>
              <span class="header-box-nickname">
                {{ useUserStore().userInfo.nickName }}
              </span>
              <span>
                <a-button @click="userLogOut" class="header-box-user-outButt" type="primary" danger
                          :icon="h(PoweroffOutlined)"/>
              </span>
            </div>
          </div>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px;display: flex;">
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" :avatar="userAvatar"/>
            </transition>
          </RouterView>
        </a-layout-content>
        <a-layout-footer class="teacher-footer" style="text-align: center;padding: 2px">
          POLS-CF
          <img alt="POLS" class="footer-POLS"
               src="../assets/Logo.png">
          ©2025 Created by 刘珂瑞 / 诗岸梦行舟 BHU.
          <img alt="BHU" class="footer-BHU"
               @click="openBHU"
               src="../assets/images/BHU.png">
          CSC.
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined, PoweroffOutlined,
  PayCircleOutlined, UserOutlined, MessageOutlined
} from "@ant-design/icons-vue";
import router from "../router";
import {h, ref, watch} from "vue";
import {useUserStore} from "../store/UserStore.ts";
import {checkLogin, getUserInfo, logOut} from "../api/UserAPIs.ts";
import {useCommonStore} from "../store/CommonStore.ts";

const userStore = useUserStore()
let watchAvatar = false;
const userAvatar = ref('')
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
const title = ref<string>('POLS-CF');
const goToRouter = (url: any) => {
  router.push(url)
}

watch(collapsed, (small) => {
  if (small) {
    title.value = ''
  } else {
    title.value = 'POLS-CF'
  }
})

// 登录校验
checkLogin()

// 退出登录
const userLogOut = () => {
  logOut()
  router.push('/')
}

watch(userStore, (newValue) => {
  userAvatar.value = useCommonStore().minioURLPre + newValue.userInfo.avatar
})

getUserInfo().then((res) => {
  if (res.data.code === 200) {
    if (userStore.userInfo.avatar === "" || userStore.userInfo.avatar === null) {
      watchAvatar = false;
    }
    useUserStore().userInfo = res.data.data
    userAvatar.value = useCommonStore().minioURLPre + userStore.userInfo.avatar
  } else {
    router.push('/')
  }
})

// 北华大学
const openBHU = () => {
  window.open('https://csc.beihua.edu.cn/');
}
console.log(`%c %c TeacherView %c 理趣得心寓目原已行十方 `,
    'color: #3eaf7c; font-size: 16px;line-height:30px;',
    'background: #f66666; padding: 4px; border-radius: 3px 0 0 3px; color: #fff',
    'border: solid 2px #f66666; padding: 4px; border-radius: 0 3px 3px 0; color: #5144ac',
);
watch(userAvatar, () => {
  if (userStore.userInfo.avatar === "") {
    watchAvatar = false;
  } else {
    watchAvatar = true;
  }
})

goToRouter('/teacher/DataVisualizationT')

</script>