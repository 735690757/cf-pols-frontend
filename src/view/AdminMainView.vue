<style scoped>
.logo {
  height: 60px;
  margin: 16px;
  background: rgba(41, 41, 41, 0.38);
  display: flex;
  align-items: center;
  border-radius: 10px;
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

.site-title {
  font-size: 23px;
  margin-left: 10px;
  color: #fff;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-weight: 700;
  cursor: pointer;
}

.header {
  background: linear-gradient(to right, #141414, #5f7fff);
  color: white;
  padding: 0;
}

.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 99;
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

.header-box-user-outButt {
  width: 80px;
  border-radius: 40px;
  box-shadow: grey 0 0 10px;
  transition: all 0.7s;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
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
  background-color: #5144ac;
}

:deep(.ant-menu-item-selected) {
  background-color: #745fff;
}

.layout-side {
  background: linear-gradient(to bottom, #141414 0%, #141414 80%, #745fff 100%);
}

:deep(.ant-menu-item) {
  transition: all 0.7s;
}

:deep(.ant-menu-item-active:hover) {
  box-shadow: inset #745fff 0 0 20px;
  transition: all 0.7s;
}

:deep(.ant-menu-submenu-active) {
  box-shadow: inset #745fff 0 0 20px;

  transition: all 0.7s;
}

.admin-core {
  overflow: hidden;
}

.header-box-avatar {
  margin-right: 330px;
  cursor: pointer;
  position: absolute;
  z-index: 99;
  transition: all 0.4s;
}

.hoveredBA {
  transform: scale(3);
  transition: all 0.4s;
  z-index: 99;
  margin-right: 270px;
  margin-top: 100px;
}

.header-box-nickname {
  margin-right: 135px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  position: absolute;
  font-size: 18px;
  font-weight: 500;
  z-index: 99;
  transition: all 0.4s;
  width: 130px;
}

.hoveredBN {
  transition: all 0.4s;
  margin-right: 246px;
  margin-top: 300px;
  z-index: 99;
  color: #000000;
  font-size: 30px;
}

.header-box-user-sbox.hoveredUSB {
  margin-right: 276px;
  transition: all 0.4s;
  height: 660px;
  width: 200px;
  z-index: 99;
  margin-top: 20px;
  border-radius: 20px;
}

.header-box-user-sbox.hoveredUSB img {
  height: 130px;
  margin-top: 500px;
  transition: all 0.8s;
}

.header-box-user-sbox {
  position: absolute;
  transition: all 0.4s;
  background-image: linear-gradient(to top, #ff6781, #91a7ff, #5874e5);
  width: 50px;
  border-radius: 210px;
  z-index: 99;
  height: 0;
  display: flex;
  justify-content: center;
}

.admin-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
}

.gif-base-class {
  border-radius: 20px;
  height: 0;
  transition: all 0.8s;
}
</style>
<template>
  <div class="admin-core">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" class="layout-side" collapsible>
        <div class="logo">
          <img src="../assets/Logo.png" class="logo-img" alt="logo"/>
          <span class="site-title">{{ title }}</span>
        </div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item @click="goToRouter('/admin/DataVisualizationA')" key="1">
            <pie-chart-outlined/>
            <span>数据可视化</span>
          </a-menu-item>
          <a-menu-item @click="goToRouter('/admin/YourselfA')" key="2">
            <desktop-outlined/>
            <span>个人信息</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <template #title>
            <span>
              <user-outlined/>
              <span>用户管理</span>
            </span>
            </template>
            <a-menu-item @click="goToRouter('/admin/AdminManagement')" key="3">管理员管理</a-menu-item>
            <a-menu-item @click="goToRouter('/admin/TeacherManagement')" key="4">教师管理</a-menu-item>
            <a-menu-item @click="goToRouter('/admin/StudentManagement')" key="5">学生管理</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #title>
            <span>
              <ProfileOutlined/>
              <span>课程管理</span>
            </span>
            </template>
            <a-menu-item @click="goToRouter('/admin/AllCourseView')" key="6">全部课程</a-menu-item>
            <!--            <a-menu-item key="8">付费课程管理</a-menu-item>-->
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #title>
            <span>
              <UnorderedListOutlined/>
              <span>订单管理</span>
            </span>
            </template>
            <a-menu-item @click="goToRouter('/admin/InnerOrderView')" key="9">内部订单</a-menu-item>
            <a-menu-item @click="goToRouter('/admin/OuterOrderView')" key="10">外部订单</a-menu-item>
          </a-sub-menu>
          <a-menu-item @click="goToRouter('/admin/PayoutManagement')" key="11">
            <MoneyCollectOutlined/>
            <span>提现管理</span>
          </a-menu-item>
          <a-menu-item @click="goToRouter('/admin/BannerManagement')" key="12">
            <PictureOutlined/>
            <span>首页管理</span>
          </a-menu-item>
          <a-sub-menu key="sub4">
            <template #title>
            <span>
              <LikeOutlined/>
              <span>推荐服务</span>
            </span>
            </template>
            <a-menu-item @click="goToRouter('/admin/RecommendManagement')" key="13">
              <span>推荐管理</span>
            </a-menu-item>
            <a-menu-item @click="goToRouter('/admin/CorrelationHeaMap')" key="14">
              <span>相关性热力图</span>
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item @click="goToRouter('/admin/chatroom')" key="15">
            <MessageOutlined/>
            <span>聊天</span>
          </a-menu-item>
          <a-menu-item @click="goToRouter('/admin/SystemSettings')" key="16">
            <SettingOutlined/>
            <span>系统设置</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header">
          <div class="header-box" ref="headerBox"
               :class="{ hovered: isHovered }"
               @mouseenter="handleMouseEnter"
               @mouseleave="handleMouseLeave">
            <span class="header-box-title">基于协同过滤算法的个性化在线学习系统 — AdminView</span>
            <div class="header-box-user">
              <div class="header-box-user-sbox" :class="{ hoveredUSB: isHovered }">
                <img src="../assets/images/logo-gif.gif" class="gif-base-class" alt="lo">
              </div>
              <a-avatar class="header-box-avatar" :class="{ hoveredBA: isHovered }" size="large">
                <template #icon>
                  <img v-if="watchAvatar" :src="userAvatar" alt="avatar">
                  <UserOutlined v-else/>
                </template>
              </a-avatar>
              <span class="header-box-nickname" :class="{ hoveredBN: isHovered }">
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
              <component :is="Component"/>
            </transition>
          </RouterView>
        </a-layout-content>
        <a-layout-footer class="admin-footer" style="text-align: center;padding: 2px">
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
import {h} from 'vue';
import {MessageOutlined, PoweroffOutlined} from '@ant-design/icons-vue';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  ProfileOutlined,
  PictureOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  MoneyCollectOutlined,
  LikeOutlined
} from '@ant-design/icons-vue';
import {ref, watch} from 'vue';
import router from "../router";
import {checkLogin, getUserInfo, logOut} from "../api/UserAPIs.ts";
import {useUserStore} from "../store/UserStore.ts";
import {useCommonStore} from "../store/CommonStore.ts";

let watchAvatar = false;
const userStore = useUserStore()
const userAvatar = ref('')
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);
const title = ref<string>('POLS-CF');
watch(collapsed, (small) => {
  if (small) {
    title.value = ''
  } else {
    title.value = 'POLS-CF'
  }
})
router.push('/admin/DataVisualizationA')
const goToRouter = (url: any) => {
  router.push(url)
}
const openBHU = () => {
  window.open('https://csc.beihua.edu.cn/');
}
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
console.log(`%c %c AdminView %c 夹岸群芳相送远帆过千障 `,
    'color: #3eaf7c; font-size: 16px;line-height:30px;',
    'background: #745fff; padding: 4px; border-radius: 3px 0 0 3px; color: #fff',
    'border: solid 2px #5144ac; padding: 4px; border-radius: 0 3px 3px 0; color: #5144ac',
);

watch(userAvatar, () => {
  if (userStore.userInfo.avatar === "") {
    watchAvatar = false;
  } else {
    watchAvatar = true;
  }
})

const headerBox = ref<HTMLElement>();
const isHovered = ref(false);
let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

function handleMouseEnter() {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }
  isHovered.value = true;
  console.log("hover")
}

function handleMouseLeave() {
  hoverTimeout = setTimeout(() => {
    isHovered.value = false;
  }, 1000); // 延迟 1 秒取消 hover
}
</script>