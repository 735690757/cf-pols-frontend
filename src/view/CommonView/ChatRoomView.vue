<style>
.tip {
  color: white;
  text-align: center;
  border-radius: 15px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  padding: 12px 20px;
  width: auto;
  display: inline-block !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.start-chat {
  float: right;
  transition: transform 0.3s ease;
}

.right {
  background: linear-gradient(135deg, #4066ff 0%, #2949c4 100%);
  position: relative;
}

.left {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  position: relative;
}

.left-icon {
  margin: 0;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
}

.left-icon:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.2);
}

.left-icon:active {
  transform: scale(0.95);
}

.start-box {
  background: linear-gradient(135deg, rgba(0, 0, 139, 0.2) 0%, rgba(0, 0, 139, 0.3) 100%);
  border-radius: 15px;
  margin-top: 12px;
  padding: 15px;
  font-family: "HarmonyOS Sans SC", serif;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.start-box .username {
  flex: 1;
  margin-left: 16px;
  color: white;
}

.start-box .actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.start-box .chat-status {
  font-size: 12px;
  color: rgba(195, 50, 205, 0.66);
  margin-left: 5px;
}

.start-box:hover {
  background: linear-gradient(135deg, rgba(0, 0, 139, 0.3) 0%, rgba(0, 0, 139, 0.4) 100%);
  transform: translateX(5px);
}

.card-my {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.card-my:hover {
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.core-box-chat {
  transition: all 0.4s ease;
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.send-butt {
  float: right;
  margin-top: 12px;
  transition: all 0.3s ease;
}

.core {
  font-family: "HarmonyOS Sans SC", serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
}

.header {
  padding-top: 80px;
}

.textarea-box {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  color: #333;
  font-family: "HarmonyOS Sans SC", serif;
}

.textarea-box:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  outline: none;
}

.card-my {
  margin-left: 80px;
}

/* 添加滚动条美化 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}
</style>
<template>
  <div ref="bossBBos" class="core" style="padding: 10px; margin-bottom: 50px">
    <div class="header">
    </div>
    <el-row>
      <el-col :span="8">
        <el-card class="card-my" style="width: 100%; min-height: 200px; color: #333">
          <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">
            在线用户
          </div>
          <div class="start-box" v-for="user in users" :key="user.username">
            <span class="username">{{ user.username }}</span>
            <div class="actions">
              <CommentOutlined class="el-icon-chat-dot-round start-chat left-icon" @click="chatUser = user.username" />
              <BellOutlined class="left-icon" />
              <span class="chat-status" v-if="user.username === chatUser">聊天中...</span>
            </div>
          </div>
        </el-card>
        <el-card class="card-my" style="width: 100%; height: 425px; color: #333;margin-top: 20px">
          <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">
            功能区
          </div>
          <FunctionButtComp @click="WallpaperGet" text="随机背景" />
          <FunctionButtComp @click="removeMessage()" text="清空聊天记录" />
          <FunctionButtComp @click="reloadSocket()" text="重载Socket连接" />
          <FunctionButtComp @click="getOut()" text="退出聊天" />
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="core-box-chat" style="width: 800px; margin: 0 auto;
                    border-radius: 25px; box-shadow: 0 0 10px #ccc">
          <div style="text-align: center; line-height: 50px;">
            即时聊天（{{ chatUser }}）
          </div>
          <div ref="chatBBox" style="
              height: 350px;
              overflow:auto;
              background-size: cover;
              background-position:center;
              border-top: 1px solid #ccc" v-html="content"></div>
          <div style="height: 240px;display: flex;justify-content: center; align-items: center;flex-direction: column">
            <textarea @keyup.enter="send" v-model="text" class="textarea-box" style="height: 160px; width: 90%; padding: 20px; resize: none; border: none; border-top: 1px solid #ccc;
             border-bottom: 1px solid #ccc; outline: none"></textarea>
            <div style="text-align: right; padding-right: 10px">
              <SendButtComp class="send-butt" type="primary" size="default" @click="send">发送</SendButtComp>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { BellOutlined, CommentOutlined } from "@ant-design/icons-vue";
import SendButtComp from "../../components/UIComps/SendButtComp.vue";
import FunctionButtComp from "../../components/UIComps/FunctionButtComp.vue";
import { ref } from "vue";
import { getWallpaper } from "../../api/WebAPIs.ts";


const chatBBox = ref()
const bossBBos = ref()
const userWallpaper = ref('')
const WallpaperGet = () => {
  getWallpaper().then(res => {
    userWallpaper.value = res.data.data
    chatBBox.value.style.backgroundImage = `url(${userWallpaper.value})`
    bossBBos.value.style.backgroundImage = `url(${userWallpaper.value})`
  })
}
WallpaperGet()
</script>
<script lang="ts">
import { getUserAvatarByUsernameRequest } from "../../api/UserAPIs.ts";
import moment from "moment-timezone";
import router from "../../router";

let socket: any;
export default {
  name: "Im",
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      user: {
        avatar: ""
      },
      isCollapse: false,
      users: [{
        username: '',
        avatar: ''
      }],
      chatUser: '',
      text: "",
      messages: [],
      content: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    send() {
      if (!this.chatUser) {
        // @ts-ignore
        this.$message({ type: 'warning', message: "请选择聊天对象" })
        return;
      }
      if (!this.text) {
        // @ts-ignore
        this.$message({ type: 'warning', message: "请输入内容" })
      } else {
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          // @ts-ignore
          let message = { from: this.user.username, to: this.chatUser, text: this.text }
          socket.send(JSON.stringify(message));
          // @ts-ignore
          this.messages.push({ user: this.user.username, text: this.text })
          // 构建消息内容，本人消息
          // @ts-ignore
          this.createContent(null, this.user.userName, this.text)
          this.text = '';
        }
      }
    },
    createContent(remoteUser: any, nowUser: any, text: any) {  // 这个方法是用来将 json的聊天消息数据转换成 html的。
      let html = ''
      let userAvatarZUrl = 'http://localhost:9090/cf-pols-minio/'
      // 当前用户消息
      if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
        getUserAvatarByUsernameRequest(nowUser).then(res => {
          userAvatarZUrl += res.data.data;
          html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
            "  <div class=\"el-col el-col-22\" style=\"text-align: right; padding-right: 10px\">\n" +
            "    <span style='position: absolute;margin-top: 40px; font-size: 13px; color: #b3b3b3'>" + moment().tz('Asia/Shanghai').format('HH:mm:ss') + "</span>\n" +
            "    <div class=\"tip left\">" + text + "</div>\n" +
            "  </div>\n" +
            "  <div class=\"el-col el-col-2\">\n" +
            "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
            "    <img src=\"" +
            userAvatarZUrl +
            "\" style=\"object-fit: cover;\">\n" +
            "  </span>\n" +
            "  </div>\n" +
            "</div>";
          this.content += html;
        })

      } else if (remoteUser) {   // remoteUser表示远程用户聊天消息，蓝色的气泡
        getUserAvatarByUsernameRequest(remoteUser).then(res => {
          userAvatarZUrl += res.data.data;
          html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
            "  <div class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
            "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
            "    <img src=\"" +
            userAvatarZUrl +
            "\" style=\"object-fit: cover;\">\n" +
            "  </span>\n" +
            "  </div>\n" +
            "  <div class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 10px\">\n" +
            "    <span style='position: absolute;margin-top: 40px; font-size: 13px; color: #b3b3b3'>" + moment().tz('Asia/Shanghai').format('HH:mm:ss') + "</span>\n" +
            "    <div class=\"tip right\">" + text + "</div>\n" +
            "  </div>\n" +
            "</div>";
          this.content += html;
        })
      }
    },
    init() {
      // @ts-ignore
      this.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
      // @ts-ignore
      let username = this.user.userName;
      // let nickName = this.user.nickName;
      this.circleUrl = 'http://localhost:9090/cf-pols-minio/' + this.user.avatar;
      let _this = this;
      if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        let socketUrl = "ws://localhost:8080/imserver/" + username;
        if (socket != null) {
          socket.close();
          socket = null;
        }
        // 开启一个websocket服务
        socket = new WebSocket(socketUrl);
        //打开事件
        socket.onopen = function () {
          console.log("websocket已打开");
        };
        //  浏览器端收消息，获得从服务端发送过来的文本消息
        socket.onmessage = function (msg: any) {
          let data = JSON.parse(msg.data)
          if (data.users) {  // 获取在线人员信息
            _this.users = data.users.filter((user: any) => user.username !== username)  // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
            // 给每个人加上头像
            _this.users.forEach(user => {
              user.avatar = 'http://localhost:9090/cf-pols-minio/8635a004408729c609c3a0be2d740854.jpg';
            })

          } else {
            if (data.from === _this.chatUser) {
              // @ts-ignore
              _this.messages.push(data)
              // 构建消息内容
              _this.createContent(data.from, null, data.text)
            }
          }
        };
        //关闭事件
        socket.onclose = function () {
          console.log("websocket已关闭");
        };
        //发生了错误事件
        socket.onerror = function () {
          console.log("websocket发生了错误");
        }
      }
    },
    removeMessage() {
      this.messages = [];
      this.content = '';
    },
    reloadSocket() {
      if (socket != null) {
        socket.close();
        socket = null;
      }
      this.init();
    },
    getOut() {
      socket.send(JSON.stringify({
        type: 'logout',
        // @ts-ignore
        username: this.user.username
      }))
      socket.close();
      // router.back();
      router.push('/student').then(() => {
        window.location.reload();
      })


    },
  }
}

</script>
