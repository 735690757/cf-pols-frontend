<script setup lang="ts">
import {defineProps} from "vue";

defineProps({
  notificationHeading: {
    type: String,
    required: true,
    default: "标题",
  },
  notificationPara: {
    type: String,
    required: true,
    default: "内容",
  },
  notificationBtn: {
    type: String,
    required: true,
    default: "Yes",
  },
  notificationBtn2: {
    type: String,
    required: true,
  },
  notificationBtn3: {
    type: String,
    required: true,
  },
  notificationBtn4: {
    type:String,
  }
})
</script>

<template>
  <div class="notificationCard">
    <p class="notificationHeading">{{ notificationHeading }}</p>
    <svg class="bellIcon" viewBox="0 0 448 512">
      <path
          d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"></path>
    </svg>
    <p class="notificationPara">{{ notificationPara }}</p>
    <div class="buttonContainer">
      <button class="AllowBtn">{{ notificationBtn }}</button>
    </div>
  </div>
</template>

<style scoped>
.notificationCard {
  font-size: 30px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  height: 280px;
  background: rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 35px;
  gap: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.123);
  border-radius: 20px;
}

.bellIcon {
  width: 50px;
  margin: 20px 0px;
}

.bellIcon path {
  fill: rgb(168, 131, 255);
}

.notificationHeading {
  color: black;
  font-weight: 600;
  font-size: 0.8em;
}

.notificationPara {
  color: rgb(133, 133, 133);
  font-size: 0.6em;
  font-weight: 600;
  text-align: center;
}

.buttonContainer {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.AllowBtn {
  width: 210px;
  height: 25px;
  background-color: rgb(168, 131, 255);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 0.7em;
  font-weight: 600;
  cursor: pointer;
}

.NotnowBtn {
  width: 120px;
  height: 25px;
  color: rgb(168, 131, 255);
  border: none;
  background-color: transparent;
  font-weight: 600;
  font-size: 0.7em;
  cursor: pointer;
  border-radius: 20px;
}

.NotnowBtn:hover {
  background-color: rgb(239, 227, 255);
}

.AllowBtn:hover {
  background-color: rgb(153, 110, 255);
}

</style>