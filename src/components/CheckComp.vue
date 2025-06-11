<script setup lang="ts">
import PuzzleVerify from 'puzzle-verify'
import 'puzzle-verify/lib/style.css'
import imgP from "../assets/images/loginP.png"
import c1 from "../assets/images/checkP/c1.jpg"
import {ref} from 'vue'

const imgSrc = ref(imgP)
const imgSrc1 = ref(imgP)
const imgSrc2 = ref(c1)

const emit = defineEmits(['updateValue'])
const sendValue = () => {
  emit('updateValue', true)  // 触发事件，并传递数据
}
// success回调函数
const success = (any) => {
  sendValue();
}
// refresh回调函数
const refresh = () => {
  if (imgSrc.value === imgSrc1) {
    imgSrc.value = imgSrc2
  } else {
    imgSrc.value = imgSrc1
  }
}
// fail回调函数
const fail = (any) => {
}
</script>

<template>
  <div>
    <PuzzleVerify
        @success=success
        @fail=fail
        @refresh=refresh
        :tip="'块给爷托块！！！'"
        :successTip="'success!'"
        :imgSrc="imgSrc"/>
  </div>
</template>

<style scoped>

</style>