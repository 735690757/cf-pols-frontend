<style scoped>
.login-view {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffc4c4;
  background-image: url("../assets/images/loginP.png");
  background-size: cover;
  overflow: hidden;
  position: relative;
}

.login-banner {
  width: 950px;
  height: 450px;
  margin-left: -200px;
  background-color: #fff;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  transition: all 0.5s;
  align-items: center;
  flex-direction: row;
}

.login-banner:hover {
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.5s;
  transform: scale(1.05);
}

.login-banner:active {
  width: 1400px;
  height: 600px;
  box-shadow: 0 100px 100px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.5s;
  margin-left: 0;
  transform: scale(1.05);
}

.login-banner-video {
  width: 100%;
  height: 100%;
  border-radius: 30px;
  object-fit: cover;
}

.login-container:hover {
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.5s;
}

.login-container {
  width: 400px;
  height: 600px;
  color: white;
  border-radius: 40px;
  backdrop-filter: blur(20px);
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  margin-right: -800px;

  border: rgba(105, 137, 156, 0.44) 2px solid;
  font-family: "HarmonyOS Sans SC", sans-serif;
}

.login-banner:active + .login-container {
  transform: translate(0%, -150%);
  transition: all 0.5s;
}

.login-container-col {
  width: 100%;
  height: 75px;
  margin-top: 4px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
  font-size: 20px;
}

.login-text {
  font-size: 40px;
  font-weight: bold;
}

.check-comp-sty {
  transition: all 0.5s;
  z-index: 999;
}

.check-comp-butt {
  width: 80%;
  height: 70%;
  background-color: #398047;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 18px;
  border-right: 2px solid;
  border-left: 2px solid;
  transition: all 0.5s;
}

.check-comp-butt:hover {
  background-color: #4c9a2a;
  transition: all 0.5s;
  box-shadow: 0 0 40px rgba(123, 243, 151, 0.87);
}

.slide-verify-box {
  position: absolute;
  margin-top: -140px;
}

.loginBanner-core-text {
  font-size: 30px;
  position: absolute;
  font-family: "system-ui", "HarmonyOS Sans SC Medium", sans-serif;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}

.login-col-class {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  transition: all 0.5s;
  margin-left: -10px;
}

.login-col-tip-text:hover {
  box-shadow: 0 0 40px rgba(123, 195, 243, 0.87);
  transition: all 0.5s;
}

.login-col-tip-text {
  width: 80%;
  height: 70%;
  background-color: #5b72e8;
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  border-radius: 40px 0 0 40px;
}

.login-col-input {
  width: 90%;
  height: 70%;
  border-radius: 0 40px 40px 0;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 15px;
  transition: all 0.5s;
}

.login-col-input:hover {
  box-shadow: 0 0 40px rgba(123, 195, 243, 0.87);
  transition: all 0.5s;
}

.login-container-loginButt {
  width: 80%;
  height: 70%;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 18px;
  border-right: 2px solid;
  border-left: 2px solid;
  transition: all 0.5s;
}

.login-container-loginButt:hover {
  transition: all 0.5s;
  box-shadow: 0 0 50px rgba(123, 195, 243, 0.87);
}

.login-container-regButt {
  width: 80%;
  height: 70%;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 18px;
  background-color: #689fcc;
  border-right: 2px solid;
  border-left: 2px solid;
  transition: all 0.5s;


}

.login-container-regButt:hover {
  transition: all 0.5s;
  box-shadow: 0 0 50px rgba(123, 195, 243, 0.87);
}

.login-container-register {
  width: 400px;
  height: 600px;
  color: white;
  border-radius: 40px;
  backdrop-filter: blur(20px);
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  border: rgba(105, 137, 156, 0.44) 2px solid;
  font-family: "HarmonyOS Sans SC", sans-serif;
  margin: 0 0 0 -5000px;
}

.user-checkbox {
  font-size: 15px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  color: white;
}

.login-privacy {
  color: #c3ccff;
  cursor: pointer;
  transition: all 0.5s;
  text-decoration: underline;
}

.check-core-Logo {
  width: 170px;
  margin-top: -50px;
  opacity: 0.8;
  transition: all 0.5s;
}

.check-core-Logo:hover {
  transition: all 0.5s;
  opacity: 1;
  width: 200px;
}
</style>

<template>
  <div class="login-view">

    <div ref="loginBanner"
         class="login-banner"
         :style="{ width: bannerWidth, height: bannerHeight, margin:bannermarginLeft }">
      <video autoplay muted loop class="login-banner-video" disablePictureInPicture :key="BannerVideoURL">
        <source :src="BannerVideoURL" type="video/mp4">
      </video>
      <span class="loginBanner-core-text">
<!--        <span>-->
        <!--          <img alt="Logo" class="check-core-Logo" src="../assets/Logo.png">-->
        <!--        </span>-->
        <span>Collaborative Filtering - Online Learning System</span>
        <span>基于协同过滤算法的在线学习系统</span>
      </span>
    </div>
    <div class="login-container" :style="{margin:loginContainerMarginTop, display: loginContainerDisplay}">
      <div class="login-container-col login-text">
        登录
      </div>
      <div class="login-container-col">
        <a-col class="login-col-class" :span="6">
          <div class="login-col-tip-text">账号</div>
        </a-col>
        <a-col class="login-col-class" :span="18">
          <a-input v-model:value="loginFrom.userName" class="login-col-input" placeholder="账号"/>
        </a-col>
      </div>
      <div class="login-container-col">
        <a-col class="login-col-class" :span="6">
          <div class="login-col-tip-text">密码</div>
        </a-col>
        <a-col class="login-col-class" :span="18">
          <a-input-password v-model:value="loginFrom.password" class="login-col-input" placeholder="密码"/>
        </a-col>
      </div>
      <div class="login-container-col">
        <a-button class="check-comp-butt" type="primary" shape="round">
<!--          <span v-if="isVerified">-->
<!--            验证成功-->
<!--          </span>-->
          <span >
            验证成功
          </span>
        </a-button>

      </div>
      <div class="login-container-col">
        <a-button @click="onLogin" class="login-container-loginButt" type="primary" shape="round">
          登录
        </a-button>
      </div>
      <div class="login-container-col">
        <a-button @click="changeReg" class="login-container-regButt" type="primary" shape="round">
          没有账号？点我创建
        </a-button>
        <div ref="slideVerifyBox" class="slide-verify-box">
<!--          <check-comp ref="checkComp" class="check-comp-sty" @updateValue="updateValue"></check-comp>-->
        </div>
      </div>
    </div>
    <div class="login-container-register"
         :style="{margin:registerContainerMargin, display: registerContainerDisplay}"
    >
      <div class="login-container-col login-text">
        注册
      </div>
      <div class="login-container-col">
        <a-col class="login-col-class" :span="6">
          <div class="login-col-tip-text">账号
          </div>
        </a-col>
        <a-col class="login-col-class" :span="18">
          <a-input v-model:value="registerForm.userName" class="login-col-input" placeholder="注册账号"/>
        </a-col>
      </div>
      <div class="login-container-col">
        <a-col class="login-col-class" :span="6">
          <div class="login-col-tip-text">昵称</div>
        </a-col>
        <a-col class="login-col-class" :span="18">
          <a-input v-model:value="registerForm.nickName" class="login-col-input" placeholder="请输入昵称"/>
        </a-col>
      </div>
      <div class="login-container-col">
        <a-col class="login-col-class" :span="6">
          <div class="login-col-tip-text">密码</div>
        </a-col>
        <a-col class="login-col-class" :span="18">
          <a-input v-model:value="registerForm.password" class="login-col-input" placeholder="请输入密码"/>
        </a-col>
      </div>
      <div class="login-container-col">
        <a-col class="login-col-class" :span="6">
          <div class="login-col-tip-text">确认</div>
        </a-col>
        <a-col class="login-col-class" :span="18">
          <a-input v-model:value="confirmPassword" class="login-col-input" placeholder="请再一次输入密码"/>
        </a-col>
      </div>

      <div class="login-container-col">
        <a-checkbox class="user-checkbox" v-model:checked="checked">
          同意平台<span @click="goToRouter('/privacy')" class="login-privacy">《隐私政策》</span>和《用户协议》
        </a-checkbox>
      </div>
      <div class="login-container-col">
        <a-button @click="onReg" class="login-container-loginButt" type="primary" shape="round">
          注册
        </a-button>
      </div>
      <div class="login-container-col">
        <a-button @click="changeLog" class="login-container-regButt" type="primary" shape="round">
          已有账号？返回登录
        </a-button>
      </div>
    </div>

  </div>

</template>


<script setup lang="ts">
import {onMounted, reactive, ref, watch} from 'vue'
import router from "../router/index.js";
import {notification} from 'ant-design-vue';
import {SmileOutlined} from "@ant-design/icons-vue";
import {h} from 'vue';
import {register, login} from "../api/UserAPIs.ts";
import CheckComp from "../components/CheckComp.vue";
import {getBannerVideo} from "../api/MinIOAPIs.ts";
import {useCommonStore} from "../store/CommonStore.ts";
import {useUserStore} from "../store/UserStore.ts";


// 用于接收从子组件传来的数据
const receivedValue = ref(false)

// 定义一个回调函数来接收子组件传递的数据
const updateValue = (value: boolean) => {
  receivedValue.value = value
}
const isVerified = ref(false);

// 监视updateValue
watch(receivedValue, (newValue) => {
  if (newValue) {
    isVerified.value = true;
    slideVerifyBox.value.style.display = 'none';
  }
})

const slideVerifyBox = ref()
const bannerWidth = ref()
const bannerHeight = ref()
const bannermarginLeft = ref()
const loginContainerMarginTop = ref()
const loginContainerDisplay = ref()
const registerContainerDisplay = ref()

const registerContainerMargin = ref()


const changeReg = () => {
  bannerWidth.value = '1400px'
  bannerHeight.value = '600px'
  bannermarginLeft.value = '0 0 0 0'
  loginContainerMarginTop.value = '0 0 0 4000px'
  registerContainerDisplay.value = 'flex'

  // 等待3秒
  setTimeout(() => {
    loginContainerDisplay.value = 'none'
    bannerWidth.value = null
    bannermarginLeft.value = '0 0 0 200px'
    bannerHeight.value = null
    registerContainerMargin.value = '0 0 0 -800px'

  }, 1000)
}
const changeLog = () => {
  bannerWidth.value = '1400px'
  bannerHeight.value = '600px'
  bannermarginLeft.value = '0 0 0 0'
  registerContainerMargin.value = '0 0 0 -3000px'
  loginContainerDisplay.value = 'flex'
  setTimeout(() => {
    registerContainerDisplay.value = 'none'

    bannerWidth.value = null
    bannermarginLeft.value = null
    bannerHeight.value = null
    loginContainerMarginTop.value = '0 -800px 0 0 '
  }, 1000)
}
const checked = ref(false)

/*const checkButtAcc = () => {
  slideVerifyBox.value.style.display = 'flex';
}

const msg = ref('Hello Vue 3.0 + Vite.')
const onSuccess = () => {
  msg.value = 'Good to see you here!'
}
const onFail = () => {
  msg.value = 'Oops, you got it wrong!'
}*/
onMounted(() => {
});
const goToRouter = (url: any) => {
  router.push(url)
}
// 注册用户表单
const registerForm = reactive({
  userName: '',
  nickName: '',
  password: '',
})
const confirmPassword = ref();

const aliNotification = (message: string, description: string, duration: number) => {
  notification.open(
      {
        message: message,
        description: description,
        duration: duration,
        icon: () => h(SmileOutlined, {style: 'color: #108ee9'})
      }
  )
}

const onReg = () => {
  if (checked.value) {
    if (registerForm.password !== confirmPassword.value) {
      notification.warn(
          {
            message: '提示',
            description: '两次密码不一致，请检查',
            duration: 2,
          }
      )
      return
    }
    register(registerForm).then((res) => {
      if (res.data.code === 200) {
        aliNotification('提示', '注册成功', 2)
        changeLog();
      } else {
        aliNotification('提示', res.data.msg, 4)
      }

    })
  } else {
    aliNotification('提示', '请勾选同意隐私政策', 2)
  }
}
const BannerVideoURL = ref('')
onMounted(() => {
  getBannerVideo().then((res) => {
    BannerVideoURL.value = useCommonStore().minioURLPre + res.data.data
  })
})
const loginFrom = reactive({
  userName: '',
  password: '',
})
const onLogin = () => {
  login(loginFrom).then((res) => {
    if (res.data.code === 200) {
      useUserStore().userInfo = res.data.data
      useUserStore().token = res.data.map.token
      localStorage.setItem('token', useUserStore().token)
      localStorage.setItem('nickname', useUserStore().userInfo.nickName)
      localStorage.setItem('uid', useUserStore().userInfo.id)
      localStorage.setItem('avatar', useUserStore().userInfo.avatar)
      localStorage.setItem('user', JSON.stringify(useUserStore().userInfo))
      let identity = useUserStore().userInfo.identity
      switch (identity) {
        case 'ADMIN': {
          aliNotification('欢迎', '登录成功，欢迎管理员', 2)
          router.push('/admin')
          return
        }
        case 'STUDENT': {
          aliNotification('欢迎', '登录成功，今天有好好学习吗', 2)
          router.push('/student')
          return
        }
        case 'TEACHER': {
          aliNotification('欢迎', '登录成功，欢迎老师', 2)
          router.push('/teacher')
          return
        }
        default: {
          aliNotification('提示', '身份异常', 4)
        }
      }

    } else {
      aliNotification('提示', res.data.msg, 4)
    }
  })
}
</script>