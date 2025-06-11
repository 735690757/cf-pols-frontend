<style scoped>
.core-body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input__container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(255, 255, 255, 0.3);
  padding: 15px;
  border-radius: 20px;
  position: relative;
  width: 60%;
  height: 90%;
}

.input__container::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  filter: blur(25px);
  border-radius: 20px;
  background-color: #e499ff;
  background-image: radial-gradient(at 47% 69%, hsla(17, 62%, 65%, 1) 0px, transparent 50%),
  radial-gradient(at 9% 32%, hsla(222, 75%, 60%, 1) 0px, transparent 50%);
}

.upload-drag-box {
  display: block;
  width: 90%;
  border-radius: 20px;
  cursor: pointer;
  height: 200px;
  background-image: linear-gradient(to right, rgba(116, 95, 255, 0.26) 0%, rgba(166, 193, 238, 0.51));
}

</style>

<template>

  <div class="core-body">
    <div class="input__container">
      <a-upload-dragger
          v-model:fileList="fileList"
          :multiple="false"
          name="avatar"
          action="http://localhost:8080/user/uploadAvatar"
          :headers="uploadHeaders"
          :before-upload="beforeUpload"
          @change="handleChange"
          class="upload-drag-avatar"
          :showUploadList="false"
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

</template>

<script setup lang="ts">
import {InboxOutlined} from "@ant-design/icons-vue";
import {h, ref} from "vue";
import {type UploadFile} from 'ant-design-vue';
import type {UploadChangeParam} from 'ant-design-vue';
import {getUserInfo} from "../../../api/UserAPIs.ts";
import {useUserStore} from "../../../store/UserStore.ts";
import {SmileOutlined} from '@ant-design/icons-vue';
import {useCommonStore} from "../../../store/CommonStore.ts";
import {notification} from 'ant-design-vue';
// 阿里通知
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

const emit = defineEmits(['avatarRefresh']);
const userStore = useUserStore()
// 上传图片相关
const fileList = ref([]);
const componentKey = ref(0); // 用于强制刷新组件
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status === 'done') {
    aliNotification('上传成功', '头像已更新', 2)
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
    aliNotification('上传失败', '请检查网络连接或稍后再试', 2)
  }
};

const beforeUpload = (file: UploadFile<unknown>) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    aliNotification('上传失败', '您只能上传 JPG/PNG 文件!', 2)
  }
  const isLt2M = file.size! / 1024 / 1024 < 12;
  if (!isLt2M) {
    aliNotification('上传失败', '图片必须小于 12MB!', 2)
  }
  return isJpgOrPng && isLt2M;
};

const uploadHeaders = {
  'satoken': localStorage.getItem('token'), // 自定义请求头
};
const userAvatar = ref('')
userAvatar.value = useCommonStore().minioURLPre + userStore.userInfo.avatar
</script>