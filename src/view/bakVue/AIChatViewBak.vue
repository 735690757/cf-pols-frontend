<style scoped>

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
  .top-head{
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
}

.user-input {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-input {
  background-color: #cfe2ff;
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  width: 60vw;
  padding: 45px;
  margin-top: 10px;
  border-radius: 20px;
}
.odd-row {
  background-color: #cfe2ff; /* 奇数行的背景色 */
  font-family: "HarmonyOS Sans SC", sans-serif;
}

.even-row {
  background-color: #f1f1f1; /* 偶数行的背景色 */
  font-family: "HarmonyOS Sans SC", sans-serif;
}
.top-head{
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  max-width: 980px;
  width: 60vw;
  margin-top: 10px;
  height: 90px;
  border-radius: 20px;
  background-color: rgba(137, 129, 252, 0.24);
  backdrop-filter: blur(10px);
  position: fixed;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 22px;
  font-weight: 700;
  top: 0;

}



</style>
<template>
  <div class="core">
    <div class="top-head">
      小瑞智能助手
    </div>
    <div v-for="(item, index) in msgList" :key="index">
      <div
          class="markdown-body"
          v-html="item"
          :class="{'odd-row': index % 2 !== 0, 'even-row': index % 2 === 0}"
      ></div>
    </div>
    <div class="markdown-body" v-if="!isReaderResNull()" v-html="readerRes"></div>
    <div ref="chatBox" class="user-input">
      <a-input v-model:value="userMsg" @keyup.enter="startChatEven(userMsg)" style="width: 500px; margin-right: 20px" placeholder="请输入内容"/>
      <a-button @click="startChatEven(userMsg)">发送</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import MarkdownIt from 'markdown-it'
import markdownItKatex from 'markdown-it-katex'
import {ref} from 'vue'
import {startChatStream} from "../api/AIChatAPIs.ts"

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
eventSource.onmessage = (event) => {
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
