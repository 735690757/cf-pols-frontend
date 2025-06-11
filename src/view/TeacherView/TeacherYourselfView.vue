<style scoped>
.ym-core {
  padding: 12px;
  background: #ffffff;
  min-height: 560px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 80vh;
}

.core-box-avatar {
  width: 300px;
  height: 560px;
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: rgba(91, 114, 232, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.core-box {
  width: 450px;
  height: 560px;
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: rgba(91, 114, 232, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Yourself-main {
  flex: 1;
}

.core-box-time {
  width: 90%;
  height: 60px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 25px;
  font-weight: 500;
  margin: 20px;
  background-color: rgba(255, 255, 255, 0.55);
  transition: all 0.7s;
  cursor: pointer;
}

.core-box-time span {
  font-size: 20px;
}

.core-box-time:hover {
  transition: all 0.7s;
  box-shadow: inset 0 0 50px #fff,
  inset 10px 0 40px #000dff,
  inset -10px 0 40px #00ff22,
  inset 10px 0 150px #3700ff,
  inset -10px 0 150px #00ff48,
  0 0 25px #fff,
  -10px 0 80px #4800ff,
  10px 0 80px #00ff22;
}

.core-box-log {
  width: 90%;
  height: 430px;
  background-color: rgba(255, 255, 255, 0.55);
  margin: 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.7s;
}

.core-box-log:hover {
  transition: all 0.7s;
}

.core-box-userinfo {
  width: 100%;
  padding: 20px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.core-box-userinfo-username {
  margin-top: 60px;
  background-color: rgba(255, 255, 255, 0.55);
  width: 90%;
  height: 60px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 30px;
}

.core-box-form {
  width: 90%;
  height: 38%;
  display: flex;
  padding: 20px;
  border-radius: 20px;
  flex-direction: column;
  background-image: linear-gradient(to top, #fffafd 0%, #fff3fb 1%, #efefef 100%);
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
  overflow: clip;
  transition: all 0.7s;
  margin-top: 60px;
  z-index: 10;
}

.core-box-form:hover {
  transition: all 0.7s;
  height: 390px;
  margin-top: -220px;
  box-shadow: 6px 8px 16px rgba(0, 0, 0, 0.4);
}

.core-box-form-text {
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
  margin-left: 10px;
  border-radius: 20px;
  height: 40px;
  font-size: 18px;
  font-weight: 500;
  background-image: linear-gradient(to right, rgba(116, 95, 255, 0.26) 0%, rgba(166, 193, 238, 0.51) 100%);

}

.core-box-form-text:hover {
  box-shadow: none;
}

.core-box-form-core {
  margin-left: -10px;
}

.core-box-form-foot {
  display: flex;
  width: 100%;
  justify-content: center;
}

.core-box-userinfo-avatar {
  transition: all 0.7s;
}

.core-box-form-foot-butt {
  width: 80%;
  height: 40px;
  border-radius: 20px;

}

.core-box-avatar-title {
  background-color: rgba(255, 255, 255, 0.54);
  width: 90%;
  height: 60px;
  margin: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 25px;
  font-weight: 500;
  transition: all 0.7s;
}

.core-box-avatar-title {
  transition: all 0.7s;
}

.upload-drag-box {
  display: block;
  width: 90%;
  border-radius: 20px;
  cursor: pointer;
  height: 200px;
  background-image: linear-gradient(to right, rgba(116, 95, 255, 0.26) 0%, rgba(166, 193, 238, 0.51));
}

.core-box-mid {
  background-image: radial-gradient(circle, rgba(209, 107, 165, 0.29), rgba(116, 95, 255, 0.26));
}

.core-box-log-table {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
</style>
<template>
  <div class="Yourself-main">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>教师</a-breadcrumb-item>
      <a-breadcrumb-item>个人信息设置</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="ym-core">
      <div class="core-box-avatar">
        <div :style="{boxShadow:timeShadow}" class="core-box-avatar-title">
          修改头像
        </div>
        <div class="upload-drag-box">
          <a-upload-dragger
              v-model:fileList="fileList"
              :multiple="false"
              name="avatar"
              action="http://localhost:8080/user/uploadAvatar"
              :headers="uploadHeaders"
              :before-upload="beforeUpload"
              @change="handleChange"
              class="upload-drag-avatar"
          >
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">单击或拖动文件到此区域以上传</p>
            <p class="ant-upload-hint">
              支持单次上传，严禁上传特殊数据或其他非图片文件
            </p>
          </a-upload-dragger>
        </div>
      </div>
      <div class="core-box core-box-mid">
        <div class="core-box-userinfo">
          <a-avatar class="core-box-userinfo-avatar" :key="componentKey" :size="userinfoAvatarSize">
            <template #icon>
              <img v-if="watchAvatar" class="userinfo-avatar" alt="tx" :src="userAvatar">
              <UserOutlined v-else/>
            </template>

          </a-avatar>
          <div class="core-box-userinfo-username">
            <span>理趣得心寓目原已行十方</span>
          </div>
        </div>
        <div @mouseenter="coreBoxFormHandleMouseEnter"
             @mouseleave="coreBoxFormHandleMouseLeave"
             :style="{
               height: coreBoxFormHeight,
               marginTop: coreBoxFormMarginTop
             }"
             class="core-box-form">
          <a-form
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              layout="horizontal"
              style="max-width: 600px"
              class="core-box-form-core"
              v-model="userModel"
          >
            <a-form-item label="ID">
              <a-input v-bind:value="userModel.id" disabled class="core-box-form-text"/>
            </a-form-item>
            <a-form-item label="用户名">
              <a-input v-bind:value="userModel.userName" disabled class="core-box-form-text"/>
            </a-form-item>
            <a-form-item label="昵称">
              <a-input v-model:value="userModel.nickName" class="core-box-form-text"/>
            </a-form-item>
            <a-form-item label="输入密码">
              <a-input v-model:value="rePassword" placeholder="请输入密码" class="core-box-form-text"/>
            </a-form-item>
            <a-form-item label="确认密码">
              <a-input v-model:value="reConfirmPassword" placeholder="请再次输入密码" class="core-box-form-text"/>
            </a-form-item>
            <div class="core-box-form-foot">
              <a-button @click="confirmSubmit" class="core-box-form-foot-butt">提交修改</a-button>
            </div>
          </a-form>
        </div>
      </div>
      <div class="core-box">
        <div :style="{boxShadow:timeShadow}" class="core-box-time">
          <span>当前时间</span>
          {{ formattedTime }}
        </div>
        <div :style="{boxShadow:logShadow}" class="core-box-log">
          <el-table :data="userLoginLog" class="core-box-log-table" stripe>
            <el-table-column align="center" header-align="center" label="序号" type="index"></el-table-column>
            <el-table-column align="center" header-align="center" prop="userName" label="用户名"/>
            <el-table-column align="center" header-align="center" prop="loginTime" label="身份">
              <template #default="scope">
                <el-tag
                    type="primary"
                    effect="light"
                    round
                >
                  {{ scope.row.identity }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" prop="loginTime" label="登录时间"/>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment-timezone';
import {h, onMounted, reactive, ref, watch} from "vue";
import {useUserStore} from "../../store/UserStore.ts";
import {notification, type UploadFile} from 'ant-design-vue';
import {InboxOutlined, SmileOutlined, UserOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import type {UploadChangeParam} from 'ant-design-vue';
import {useCommonStore} from "../../store/CommonStore.ts";
import {getUserInfo, getUserLoginLog, logOut, updateUserInfo} from "../../api/UserAPIs.ts";
import router from "../../router";

const labelCol = {style: {width: '75px'}};
const wrapperCol = {span: 18};
const formattedTime = ref('');
// 阿里通知
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
// 设置时区为北京时间
const updateTime = () => {
  formattedTime.value = moment().tz('Asia/Shanghai').format('YYYY年MM月DD日 HH时mm分ss秒');
}
// 设置定时器，每秒更新时间
const startTimer = () => {
  setInterval(updateTime, 1000);
}
const timeShadow = ref('')
/*const timeShadowFun = () => {
  setTimeout(() => {
    timeShadow.value = 'inset 0 0 50px #fff,' +
        'inset 10px 0 40px #f0f,' +
        'inset -10px 0 40px #0ff,' +
        'inset 10px 0 150px #f0f,' +
        'inset -10px 0 150px #0ff,' +
        '0 0 25px #fff, -10px 0 80px #f0f,' +
        '10px 0 80px #0ff'
    setTimeout(() => {
      timeShadow.value = ''
      setTimeout(() => {
        timeShadow.value = 'inset 0 0 50px #fff,' +
            'inset 10px 0 40px #f0f,' +
            'inset -10px 0 40px #0ff,' +
            'inset 10px 0 150px #f0f,' +
            'inset -10px 0 150px #0ff,' +
            '0 0 25px #fff, -10px 0 80px #f0f,' +
            '10px 0 80px #0ff'
        setTimeout(() => {
          timeShadow.value = ''
        }, 1000)
      }, 1000)

    }, 1000)
  }, 1000)
}*/
const logShadow = ref('')
const logShadowFun = () => {
  setTimeout(() => {
    logShadow.value = 'inset 0 0 50px #fff,' +
        'inset 10px 0 40px #f0f,' +
        'inset -10px 0 40px #0ff,' +
        'inset 10px 0 150px #f0f,' +
        'inset -10px 0 150px #0ff,' +
        '0 0 25px #fff, -10px 0 80px #f0f,' +
        '10px 0 80px #0ff'
    setTimeout(() => {
      logShadow.value = ''
      setTimeout(() => {
        logShadow.value = 'inset 0 0 50px #fff,' +
            'inset 10px 0 40px #f0f,' +
            'inset -10px 0 40px #0ff,' +
            'inset 10px 0 150px #f0f,' +
            'inset -10px 0 150px #0ff,' +
            '0 0 25px #fff, -10px 0 80px #f0f,' +
            '10px 0 80px #0ff'
        setTimeout(() => {
          logShadow.value = ''
          timeShadow.value = 'inset 0 0 50px #fff,' +
              'inset 10px 0 40px #f0f,' +
              'inset -10px 0 40px #0ff,' +
              'inset 10px 0 150px #f0f,' +
              'inset -10px 0 150px #0ff,' +
              '0 0 25px #fff, -10px 0 80px #f0f,' +
              '10px 0 80px #0ff'
        }, 1000)
      }, 1000)

    }, 1000)
  }, 1000)
}
// timeShadowFun()
logShadowFun()
// coreBox相关动效
const coreBoxFormHeight = ref('38%');
const userinfoAvatarSize = ref(100);
const coreBoxFormMarginTop = ref('60px');
const coreBoxFormHandleMouseEnter = () => {
  userinfoAvatarSize.value = 180;
  coreBoxFormHeight.value = '390px';
  coreBoxFormMarginTop.value = '-220px';
};
const coreBoxFormHandleMouseLeave = () => {
};

// 用户模型
const userStore = useUserStore()
const userModel = reactive({
  id: userStore.userInfo.id,
  userName: userStore.userInfo.userName,
  nickName: userStore.userInfo.nickName,
  password: ''
})
const emit = defineEmits(['avatarRefresh']);
// 上传图片相关
const fileList = ref([]);
const componentKey = ref(0); // 用于强制刷新组件
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} 头像上传成功.`);
    getUserInfo().then((res) => {
      if (res.data.code === 200) {
        useUserStore().userInfo = res.data.data
        userAvatar.value = useCommonStore().minioURLPre + userStore.userInfo.avatar
        componentKey.value++; // 通过改变 key 强制刷新组件
        // 通知父组件
        emit('avatarRefresh', {avatarUrl: userAvatar.value});
      }
    })
  } else if (status === 'error') {
    message.error(`${info.file.name} 头像上传失败.`);
  }
};

const beforeUpload = (file: UploadFile<unknown>) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('您只能上传 JPG/PNG 文件!');
  }
  const isLt2M = file.size! / 1024 / 1024 < 2; // file.size 可能为 undefined，需确保安全性
  if (!isLt2M) {
    message.error('图片必须小于 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const uploadHeaders = {
  'satoken': localStorage.getItem('token'), // 自定义请求头
};
const userAvatar = ref('')
let watchAvatar = false;
userAvatar.value = useCommonStore().minioURLPre + userStore.userInfo.avatar
if (userStore.userInfo.avatar) {
  watchAvatar = true;
}
//重设密码
const rePassword = ref('')
const reConfirmPassword = ref('')

const confirmSubmit = () => {
  if (rePassword.value !== reConfirmPassword.value) {
    aliNotification('密码不一致', '请重新输入密码', 2)
  } else if (rePassword.value === '' || reConfirmPassword.value === '' || rePassword.value === null || reConfirmPassword.value === null) {
    aliNotification('密码不能为空', '请重新输入密码', 2)
  } else {
    userModel.password = rePassword.value
    updateUserInfo(userModel).then((res) => {
      if (res.data.code === 200) {
        aliNotification('密码修改成功', '请重新登录', 2)
        logOut()
        router.push('/')
        window.location.reload()
      } else {
        aliNotification('密码修改失败', res.data.msg, 2)
      }
    })
  }
}
// 登录日志
const userLoginLog = ref([])
getUserLoginLog().then((res) => {
  if (res.data.code === 200) {
    userLoginLog.value = res.data.data
  } else {
    aliNotification('提示', res.data.msg, 4)
  }
})

onMounted(() => {
  updateTime();
  startTimer();
})
watch(userAvatar, () => {
  watchAvatar = true;
})

</script>