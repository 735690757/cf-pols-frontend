<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, ref, shallowRef, watch} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'

export default {
  components: {Editor, Toolbar},
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref(props.modelValue)

    // 工具栏配置
    const toolbarConfig = {
      excludeKeys: ['uploadImage', 'uploadVideo'],
    }

    // 编辑器配置
    const editorConfig = {
      placeholder: '请输入内容...',
      MENU_CONF: {
        // 禁用图片上传
        uploadImage: {
          disabled: true, // 禁用图片上传
        },
        // 禁用视频上传
        uploadVideo: {
          disabled: true, // 禁用视频上传
        },
      },
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor: any) => {
      editorRef.value = editor // 记录 editor 实例，重要！

    }

    // 监听 valueHtml 的变化，并通知父组件
    watch(valueHtml, (newValue) => {
      emit('update:modelValue', newValue)
    })
    watch(
        () => props.modelValue,
        (newValue) => {
          if (editorRef.value && newValue !== valueHtml.value) {
            valueHtml.value = newValue; // 更新 valueHtml
            editorRef.value.setHtml(newValue); // 手动更新编辑器内容
          }
        },
        {immediate: true} // 初始化时立即执行
    );
    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
    }
  },
}
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        style="border-bottom: 1px solid #ccc;height: 90px;"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="min-height: 300px; height: 40vh; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"

    />
  </div>
</template>

<style scoped>

</style>