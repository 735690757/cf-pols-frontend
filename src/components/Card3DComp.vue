<script setup lang="ts">
// 接受组件传参
const props = defineProps({
  title: {
    type: String,
    default: 'Hello World'
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  courseDescription: {
    type: String,
    default: 'Hello World'
  },
})
</script>

<template>
  <div class="container noselect">
    <div class="canvas">
      <div class="tracker tr-1"></div>
      <div class="tracker tr-2"></div>
      <div class="tracker tr-3"></div>
      <div class="tracker tr-4"></div>
      <div class="tracker tr-5"></div>
      <div class="tracker tr-6"></div>
      <div class="tracker tr-7"></div>
      <div class="tracker tr-8"></div>
      <div class="tracker tr-9"></div>
      <div class="tracker tr-10"></div>
      <div class="tracker tr-11"></div>
      <div class="tracker tr-12"></div>
      <div class="tracker tr-13"></div>
      <div class="tracker tr-14"></div>
      <div class="tracker tr-15"></div>
      <div class="tracker tr-16"></div>
      <div class="tracker tr-17"></div>
      <div class="tracker tr-18"></div>
      <div class="tracker tr-19"></div>
      <div class="tracker tr-20"></div>
      <div class="tracker tr-21"></div>
      <div class="tracker tr-22"></div>
      <div class="tracker tr-23"></div>
      <div class="tracker tr-24"></div>
      <div class="tracker tr-25"></div>
      <div id="card">
        <div id="prompt">
          <a-avatar class="header-box-avatar" :src="props.avatarUrl" size="large"/>
          <br/>
          <span class="title-text">
          {{ props.title }}
          </span>
        </div>
        <div class="title">{{ courseDescription }}</div>
        <div class="subtitle">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* From Uiverse.io by kennyotsu */
/*works janky on mobile :<*/
.container {
  position: relative;
  height: 160px;
  width: 100%;
  border-radius: 14px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  transition: 200ms;
}

#prompt {
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.title-text {
  position: absolute;
  width: 200px;
  margin-left: 300px;
  font-size: 18px;
}

.header-box-avatar {
  width: 100px;
  height: 100px;
  margin-left: -40px;
}

#card {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  transition: 700ms;
  background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
}

.subtitle {
  transform: translateY(160px);
  color: rgb(134, 110, 221);
  text-align: center;
  width: 100%;
}

.title {
  opacity: 0;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  transition-delay: 100ms;
  position: absolute;
  font-size: x-large;
  font-weight: bold;
  padding: 10px;
  color: white;
}

.tracker:hover ~ #card .title {
  opacity: 1;
}

#prompt {
  bottom: 8px;
  left: 12px;
  z-index: 20;
  font-size: 20px;
  font-weight: bold;
  transition: 300ms ease-in-out-out;
  position: absolute;
  max-width: 110px;
  color: rgb(255, 255, 255);
}

.tracker {
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100%;
}

.tracker:hover {
  cursor: pointer;
}

.tracker:hover ~ #card #prompt {
  opacity: 0;
}

.tracker:hover ~ #card {
  transition: 300ms;
  filter: brightness(1.1);
}

.container:hover #card::before {
  transition: 200ms;
  content: '';
  opacity: 80%;
}

.canvas {
  perspective: 800px;
  inset: 0;
  z-index: 200;
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas: "tr-1 tr-2 tr-3 tr-4 tr-5"
    "tr-6 tr-7 tr-8 tr-9 tr-10"
    "tr-11 tr-12 tr-13 tr-14 tr-15"
    "tr-16 tr-17 tr-18 tr-19 tr-20"
    "tr-21 tr-22 tr-23 tr-24 tr-25";
}

#card::before {
  content: '';
  background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
  filter: blur(2rem);
  opacity: 30%;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  transition: 200ms;
}

.tr-1 {
  grid-area: tr-1;
}

.tr-2 {
  grid-area: tr-2;
}

.tr-3 {
  grid-area: tr-3;
}

.tr-4 {
  grid-area: tr-4;
}

.tr-5 {
  grid-area: tr-5;
}

.tr-6 {
  grid-area: tr-6;
}

.tr-7 {
  grid-area: tr-7;
}

.tr-8 {
  grid-area: tr-8;
}

.tr-9 {
  grid-area: tr-9;
}

.tr-10 {
  grid-area: tr-10;
}

.tr-11 {
  grid-area: tr-11;
}

.tr-12 {
  grid-area: tr-12;
}

.tr-13 {
  grid-area: tr-13;
}

.tr-14 {
  grid-area: tr-14;
}

.tr-15 {
  grid-area: tr-15;
}

.tr-16 {
  grid-area: tr-16;
}

.tr-17 {
  grid-area: tr-17;
}

.tr-18 {
  grid-area: tr-18;
}

.tr-19 {
  grid-area: tr-19;
}

.tr-20 {
  grid-area: tr-20;
}

.tr-21 {
  grid-area: tr-21;
}

.tr-22 {
  grid-area: tr-22;
}

.tr-23 {
  grid-area: tr-23;
}

.tr-24 {
  grid-area: tr-24;
}

.tr-25 {
  grid-area: tr-25;
}

.tr-1:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-2:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-3:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg);
}

.tr-4:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(5deg) rotateZ(0deg);
}

.tr-5:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(10deg) rotateZ(0deg);
}

.tr-6:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-7:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-8:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(0deg) rotateZ(0deg);
}

.tr-9:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(5deg) rotateZ(0deg);
}

.tr-10:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(10deg) rotateZ(0deg);
}

.tr-11:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-12:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-13:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
}

.tr-14:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(5deg) rotateZ(0deg);
}

.tr-15:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(10deg) rotateZ(0deg);
}

.tr-16:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-17:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-18:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(0deg) rotateZ(0deg);
}

.tr-19:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(5deg) rotateZ(0deg);
}

.tr-20:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(10deg) rotateZ(0deg);
}

.tr-21:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-22:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-23:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
}

.tr-24:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(5deg) rotateZ(0deg);
}

.tr-25:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(10deg) rotateZ(0deg);
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                 supported by Chrome, Edge, Opera and Firefox */
}
</style>