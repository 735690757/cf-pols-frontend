<style scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
  font-family: "HarmonyOS Sans SC", sans-serif;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

.katex {
  font-size: 1.1em !important;
  line-height: 1.6 !important;
  vertical-align: middle !important;
}

.katex-display {
  margin: 1em 0 !important;
  text-align: center !important;
  display: block !important;
}

.markdown-body {
  word-break: break-word; /* 防止长公式溢出 */
  overflow-x: auto; /* 横向滚动条 */
  background-color: #cfe2ff;
  width: 60vw;
  border-radius: 20px;
  margin-top: 10px;

}

.core {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  background-image: url(../../assets/images/bg-aichat.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
.user-input-box{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -10px;
}
.user-input-box:hover .user-input{
  backdrop-filter: blur(10px);
  transition: all 0.7s;
  transform: translateY(0px);
}
.user-input {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-input {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  width: 60vw;
  padding: 25px 45px;
  margin-top: 10px;
  border-radius: 40px;
  transition: all 0.7s;
  transform: translateY(35px);
}

.user-input:hover {
  background-color: rgba(137, 129, 252, 0.13);
  backdrop-filter: blur(10px);
  transition: all 0.7s;
  transform: translateY(0px);
}

.even-row-0 {
  background-color: rgba(255, 255, 255, 0) !important;
  height: 100px;
}

.odd-row {
  background-color: rgba(207, 226, 255, 0.82); /* 奇数行的背景色 */
  font-family: "HarmonyOS Sans SC", sans-serif;
}

.even-row {
  background-color: rgba(210, 208, 248, 0.49); /* 偶数行的背景色 */
  font-family: "HarmonyOS Sans SC", sans-serif;
  text-align: right;

}

.top-head {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  max-width: 980px;
  width: 920px;
  margin-top: 20px;
  height: 85px;
  border-radius: 40px;
  background-color: rgba(137, 129, 252, 0.24);
  backdrop-filter: blur(10px);
  position: fixed;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 22px;
  font-weight: 700;
  top: 0;
}

/*滚动条整体样式*/
.core::-webkit-scrollbar {
  width: 10px;
  height: 1px;
  border: none;
}

/*滚动条里面小方块*/
.core::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #58a6df;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, .2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, .2) 50%,
      rgba(255, 255, 255, .2) 75%,
      transparent 75%,
      transparent
  );
}

/*.core {
  overflow: auto;        !* 启用滚动 *!
  scrollbar-width: none; !* Firefox 隐藏滚动条 *!
  -ms-overflow-style: none; !* IE 10+ 隐藏滚动条 *!
}

.core::-webkit-scrollbar {
  display: none;         !* Chrome、Safari 隐藏滚动条 *!
}*/
.user-input-box {
  position: fixed;
  bottom: 20px;
}

.user-input {
  width: 60vw;

}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>

<template>
  <div class="core">
    <div class="top-head">
      <LeftOutlined @click="router.back()" style="position: absolute; left: 40px"/>
      <img src="../../assets/Logo.png" alt="logo" style="width: 40px; height: 40px; margin: 10px;"/>
      <span>小瑞智能助手</span>
      <div style="margin-left: 20px;" v-if="!isReaderResNull()">
        <AISpinner/>
      </div>
    </div>
    <!--  消息渲染  -->
    <div v-for="(item, index) in msgList" :key="index">
      <div
          class="markdown-body"
          v-html="item"
          :class="{'odd-row': index % 2 !== 0, 'even-row': index % 2 === 0 , 'even-row-0': index === 0}"
      ></div>
    </div>

    <div class="markdown-body" style="flex-shrink: 0; word-wrap: break-word;" v-if="!isReaderResNull()"
         v-html="readerRes"></div>

    <div ref="chatBox" v-if="!isReaderResNull()"></div>
    <div class="user-input-box">
      <div class="user-input">

        <a-input v-model:value="userMsg" @keyup.enter="startChatEven(userMsg)"
                 style="width: 500px; margin-right: 20px; border-radius: 20px;height: 40px"
                 placeholder="请输入内容"/>
        <transition name="fade" mode="out-in">
          <a-button v-if="isReaderResNull()" shape="round" style="background-color:#7066d3;color: white;height: 40px"
                    @click="startChatEven(userMsg)">发送
          </a-button>
        </transition>
        <transition name="fade" mode="in-out">
          <div v-if="!isReaderResNull()">
            <AISpinner/>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import MarkdownIt from 'markdown-it'
import markdownItKatex from 'markdown-it-katex'
import {ref} from 'vue'
import {startChatStream} from "../../api/AIChatAPIs.ts";
import {LeftOutlined} from '@ant-design/icons-vue'
import router from "../../router";
import AISpinner from "../../components/AISpinner.vue";

const userMsg = ref('')
const chatBox = ref()
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(code, lang): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre><code class="hljs ${lang}">${hljs.highlight(code, {language: lang}).value}</code></pre>`
      } catch (__) {
      }
    }
    return `<pre><code class="hljs">${md.utils.escapeHtml(code)}</code></pre>`
  }
}).use(markdownItKatex)  // 正确使用插件

const readerRes = ref('')
const eventSource = startChatStream("你是谁")
const response = ref('')
const msgList = ref([''])
eventSource.onmessage = (event: any) => {
  const chunk = event.data
  if (chunk === '[complete]') {
    eventSource.close()
    msgList.value.push(readerRes.value)
    response.value = ''
    readerRes.value = ''
    return
  }

  response.value += chunk
  let readerResValue = response.value.replace(/\\\[(.*?)\\\]/gs, '$$$1$$')
  readerResValue = md.render(readerResValue.replace(/\\\((.*?)\\\)/gs, '$$$1$$'))
  readerRes.value = readerResValue

}
const startChatEven = (msg: string) => {
  msgList.value.push(userMsg.value)
  userMsg.value = ''
  const eventSource = startChatStream(msg)
  eventSource.onmessage = (event) => {
    if (msg.trim() === '') return;

    const chunk = event.data
    if (chunk === '[complete]') {
      eventSource.close()
      msgList.value.push(readerRes.value)
      readerRes.value = ''
      response.value = ''
      return
    }
    response.value += chunk
    let readerResValue = response.value.replace(/\\\[(.*?)\\\]/gs, '$$$1$$')
    readerResValue = md.render(readerResValue.replace(/\\\((.*?)\\\)/gs, '$$$1$$'))
    readerRes.value = readerResValue
    chatBox.value.scrollIntoView();

  }
}

const isReaderResNull = () => {
  return readerRes.value === ''
}
</script>