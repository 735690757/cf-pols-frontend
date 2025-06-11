<script setup lang="ts">
// 组件参数接受
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  more: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <button>
    {{ props.content }}
  </button>

</template>

<style scoped>
button {
  position: absolute;
  width: 60%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #5f728a;
  background-color: #e0e8ef;
  border-style: solid;
  border-width: 2px 2px 2px 2px;
  border-color: rgba(255, 255, 255, 0.333);
  border-radius: 40px 40px 40px 40px;
  padding: 16px 24px 16px 28px;
  transform: translate(0px, 0px) rotate(0deg);
  transition: 0.2s;
  box-shadow: -4px -2px 16px 0px #ffffff, 4px 2px 16px 0px rgb(95 157 231 / 48%);
  cursor: pointer;
  font-family: "HarmonyOS Sans SC", sans-serif;
}

button:hover {
  color: #516d91;
  background-color: #E5EDF5;
  box-shadow: -2px -1px 8px 0px #ffffff, 2px 1px 8px 0px rgb(95 157 231 / 48%);
}

button:active {
  box-shadow: none;
}
</style>