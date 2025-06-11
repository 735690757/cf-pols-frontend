<style scoped>
button {
  padding: 17px 40px;
  border-radius: 50px;
  cursor: pointer;
  border: 0;
  background-color: #d7d7ec;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 15px;
  transition: all 0.5s ease;
}

button:hover {
  letter-spacing: 3px;
  background-color: hsl(261deg 80% 48%);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(93 24 220) 0px 7px 29px 0px;
}

button:active {
  letter-spacing: 3px;
  background-color: hsl(261deg 80% 48%);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
  transform: translateY(10px);
  transition: 100ms;
}
button{
  margin: 20px;
  width: 90%;
}
</style>

<template>
  <button>{{ props.text }}</button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
  },
})
</script>