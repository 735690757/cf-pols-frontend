<style>
.tip {
  color: white;
  text-align: center;
  border-radius: 10px;
  font-family: sans-serif;
  padding: 10px;
  width: auto;
  display: inline-block !important;
  display: inline;
}

.start-chat {
  float: right;
}

.right {
  background-color: rgba(64, 0, 255, 0.67);
}

.left {
  background-color: forestgreen;
}

.left-icon {
  margin-left: 10px;
  float: right;
  font-size: 20px;
  margin-right: 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.5s;
  color: white;
}

.left-icon:hover {
  transition: all 0.5s;
  transform: scale(1.2);
}

.left-icon:active {
  transform: scale(0.9);

}

.start-box {
  background-color: rgba(0, 0, 139, 0.37);
  border-radius: 20px;
  margin-top: 10px;
  font-family: "HarmonyOS Sans SC", serif;
}

.card-my {
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.32);
  backdrop-filter: blur(5px);
  transition: all 0.4s;
}

.card-my:hover {
  backdrop-filter: blur(15px);
  transition: all 0.4s;
}

.core-box-chat {
  transition: all 0.4s;
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.32);
}

.send-butt {
  float: right;
  margin-top: 12px;
}

.core {
  font-family: "HarmonyOS Sans SC", serif;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: no-repeat;
  background-size: cover;
  border-radius: 20px;
  box-shadow:
      0 0 25px rgba(255, 255, 255, 0.26),
      -100px 0 100px rgba(200, 0, 255, 0.22),
      100px 0 800px rgba(0, 255, 217, 0.19);
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
}

/* 添加响应式布局 */
@media screen and (max-width: 1350px) {
  .el-col {
    width: 100% !important;
  }

  .core-box-chat {
    width: 100% !important;
  }

  .card-my {
    margin-left: 0 !important;
  }
}

.textarea-box {
  background: rgba(172, 172, 172, 0.4);
  border-radius: 20px;
}

.card-my {
  margin-left: 20px;
}
</style>
<template>
  <div style="height: 80vh;width: 100%">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>教师/管理员</a-breadcrumb-item>
      <a-breadcrumb-item>聊天</a-breadcrumb-item>
    </a-breadcrumb>
    <div ref="bossBBos" class="core" style="padding: 10px; margin-bottom: 10px;width: 100%">
      <div class="header">
      </div>
      <el-row>
        <el-col :span="8">
          <el-card class="card-my" style="width: 100%; min-width: 300px; min-height: 200px; color: #333">
            <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">
              在线用户
            </div>
            <div class="start-box" style="padding: 10px 0" v-for="user in users" :key="user.username">
              <span style="margin-left: 16px;color: white">{{ user.username }}</span>
              <CommentOutlined class="el-icon-chat-dot-round start-chat left-icon"
                               style="margin-left: 10px; cursor: pointer"
                               @click="chatUser = user.username"></CommentOutlined>
              <BellOutlined class="left-icon"/>

              <span style="font-size: 12px;color: rgba(195,50,205,0.66); margin-left: 5px"
                    v-if="user.username === chatUser">聊天中...</span>
            </div>
          </el-card>
          <el-card class="card-my" style="width: 100%;  min-width: 300px; height: 355px; color: #333;margin-top: 20px">
            <div style="padding-bottom: 10px; border-bottom: 1px solid #ccc">
              功能区
            </div>
            <FunctionButtComp @click="WallpaperGet" text="随机背景"/>
            <FunctionButtComp style="margin-top: 0;" @click="removeMessage()" text="清空聊天记录"/>
            <FunctionButtComp style="margin-top: 0;" @click="reloadSocket()" text="重载Socket连接"/>
            <FunctionButtComp style="margin-top: 0;" @click="getOut()" text="退出聊天"/>
          </el-card>
        </el-col>
        <el-col :span="16">
          <div class="core-box-chat" style="width: 700px; min-width: 590px; margin: 0 auto;
                    border-radius: 25px; box-shadow: 0 0 10px #ccc">
            <div style="text-align: center; line-height: 50px;">
              即时聊天（{{ chatUser }}）
            </div>
            <div ref="chatBBox" style="
              height: 300px;
              overflow:auto;
              background-size: cover;
              background-position:center;
              border-top: 1px solid #ccc" v-html="content"></div>
            <div
                style="height: 220px;display: flex;justify-content: center; align-items: center;flex-direction: column">
            <textarea @keyup.enter="send"
                      v-model="text"
                      class="textarea-box"
                      style="height: 100px; width: 90%; padding: 20px; resize: none; border: none; border-top: 1px solid #ccc;
             border-bottom: 1px solid #ccc; outline: none"></textarea>
              <div style="text-align: right; padding-right: 10px">
                <SendButtComp class="send-butt" type="primary" size="default" @click="send"></SendButtComp>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script setup lang="ts">
import {BellOutlined, CommentOutlined} from "@ant-design/icons-vue";
import SendButtComp from "../../components/UIComps/SendButtComp.vue";
import FunctionButtComp from "../../components/UIComps/FunctionButtComp.vue";
import {ref} from "vue";
import {getWallpaper} from "../../api/WebAPIs.ts";


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
import {getUserAvatarByUsernameRequest} from "../../api/UserAPIs.ts";
import moment from "moment-timezone";
import router from "../../router";

let socket: any;
export default {
  name: "Im",
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      user: {},
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
        this.$message({type: 'warning', message: "请选择聊天对象"})
        return;
      }
      if (!this.text) {
        // @ts-ignore
        this.$message({type: 'warning', message: "请输入内容"})
      } else {
        if (typeof (WebSocket) == "undefined") {
          console.log("您的浏览器不支持WebSocket");
        } else {
          // @ts-ignore
          let message = {from: this.user.username, to: this.chatUser, text: this.text}
          socket.send(JSON.stringify(message));
          // @ts-ignore
          this.messages.push({user: this.user.username, text: this.text})
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
      // @ts-ignore
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
              // @ts-ignore
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
      router.back()

    },
  }
}

</script>

