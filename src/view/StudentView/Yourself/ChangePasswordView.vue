<style scoped>
.core {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #ccc;
  flex-direction: column;
}

.title {
  width: 100%;
  height: 15%;
  padding-left: 20px;
  font-family: "HarmonyOS Sans SC Medium", serif;
  font-size: 18px;
  border-bottom: #cacaca 1px solid;
  padding-top: 5px;
}

.core-body {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input__container {
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(255, 255, 255, 0.3);
  padding: 15px;
  border-radius: 20px;
  position: relative;
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

.input__label {
  display: block;
  margin-left: 0.4em;
  color: #000;
  text-transform: uppercase;
  font-size: 0.9em;
  font-weight: bold;
  width: 80%
}

.input__description {
  font-size: 0.6em;
  font-weight: bold;
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
}

.input {
  border: none;
  outline: none;
  width: 100%;
  padding: 0.6em;
  padding-left: 0.9em;
  border-radius: 20px;
  background: #fff;
  transition: background 300ms, color 300ms;
}

.input:hover, .input:focus {
  background: rgb(0, 0, 0);
  color: #fff;
}
</style>
<template>
  <div class="core">
    <div class="core-body">
      <div class="input__container">
        <label class="input__label">密码</label>
        <div style="display: flex; width: 100%; justify-content: center; align-items: center; flex-direction: column;">
          <input v-model="passwordNew" style="width: 90%" placeholder="请输入新密码" class="input" name="text" type="password">
          <input v-model="passwordNewRe" style="margin: 10px;width: 90%"  placeholder="请再次确认新密码" class="input" name="text" type="password">
        </div>
        <SubmitButtComp @click="submit"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SubmitButtComp from "../../../components/SubmitButtComp.vue";
import {h, ref} from "vue";
import {updateUserInfo, whoAmIRequest} from "../../../api/UserAPIs.ts";
import {notification} from "ant-design-vue";
import {SmileOutlined} from "@ant-design/icons-vue";

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

const userInfo = ref({
  id: 0,
  userName: '',
  nickName: '',
  password: '',
  avatar: '',
  identity: '',
  fund: '',
  isDisabled: false,
  createTime: '',
  modifyTime: ''
})
whoAmIRequest().then((res) => {
  if (res.data.code === 200) {
    userInfo.value = res.data.data
  }
})

const passwordNew = ref('')
const passwordNewRe = ref('')

const submit = () => {
  if (passwordNew.value !== passwordNewRe.value){
    aliNotification('注意', '两次密码不一致', 2)
    return
  }
  userInfo.value.password = passwordNew.value
  updateUserInfo(userInfo.value).then((res) => {
    if (res.data.code === 200) {
      aliNotification('修改成功', '修改成功', 2)
      window.location.reload()
    } else {
      aliNotification('修改失败', res.data.msg, 2)
    }
  })
}
</script>