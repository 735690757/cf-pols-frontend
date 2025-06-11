<template>
  <div ref="docxContainer" style="border: 1px solid #ccc; padding: 16px; overflow-y: auto; height: 500px;">
    <!-- 文档内容将显示在此处 -->
    <p v-if="!docxContainer">docxContainer 未初始化</p> <!-- 调试信息 -->
    <p v-if="loading">加载中...</p> <!-- 调试信息 -->
    <p v-if="error">{{ error }}</p> <!-- 调试信息 -->
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {renderAsync} from 'docx-preview'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
})

const docxContainer = ref<HTMLElement | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const loadDocxFromURL = async (url: string) => {
  if (!docxContainer.value) return

  loading.value = true
  error.value = null

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Network response was not ok')
    const arrayBuffer = await response.arrayBuffer()
    await renderAsync(arrayBuffer, docxContainer.value)
  } catch (err: any) {
    console.error('Error loading .docx file from URL:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

watch(
    () => props.src,
    (newSrc) => {
      if (newSrc) loadDocxFromURL(newSrc)
    },
    {immediate: true}
)
</script>

<style scoped>
/* 添加一些样式优化文档预览效果 */
</style>
