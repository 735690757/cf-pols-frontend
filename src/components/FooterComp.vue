<style scoped>
.core-footer {
  width: 100%;
  height: 60px;
  background-color: rgba(239, 239, 239, 0.27);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}

.loader {
  width: 12px;
  height: 12px;
  position: relative;
  margin-top: -9px;
  margin-right: 20px;
}

.loader:before {
  content: '';
  width: 12px;
  height: 2px;
  background: #f0808050;
  position: absolute;
  left: 0;
  top: 25px;
  border-radius: 50%;
  animation: shadow324 0.5s linear infinite;
}

.loader:after {
  content: '';
  width: 100%;
  height: 100%;
  background: #f08080;
  position: absolute;
  left: 0;
  border-radius: 4px;
  animation: jump7456 0.5s linear infinite;
}


@keyframes jump7456 {
  15% {
    border-bottom-right-radius: 3px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow324 {

  0%,
  100% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1);
  }
}

.footer-POLS {
  height: 25px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.7s;
  margin-top: -3px;
  margin-right: 10px;
}

.footer-POLS:hover {
  transition: all 0.7s;
  box-shadow: inset 0 0 50px #fff,
  inset 10px 0 40px #000dff,
  inset -10px 0 40px #0066ff,
  inset 10px 0 150px #3700ff,
  inset -10px 0 150px #00a6ff,
  0 0 25px #fff,
  -10px 0 80px #4800ff,
  10px 0 80px #00b2ff;
}

.footer-BHU {
  height: 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.7s;
  margin-left: 10px;
  margin-right: 10px;
}

.footer-BHU:hover {
  transition: all 0.7s;
  box-shadow: inset 0 0 50px #fff,
  inset 10px 0 40px #000dff,
  inset -10px 0 40px #0066ff,
  inset 10px 0 150px #3700ff,
  inset -10px 0 150px #00a6ff,
  0 0 25px #fff,
  -10px 0 80px #4800ff,
  10px 0 80px #00b2ff;
}
</style>
<template>
  <!--  脚丫子  -->
  <div class="core-footer">
    <div style="display: flex; flex-direction: row;margin-bottom: 5px;">
      <div class="loader"></div>
      <span>CF-POLS 基于协同过滤算法的个性化在线学习系统</span>
    </div>
    <div style="display: flex; flex-direction: row;margin-bottom: -10px;">
      <img alt="POLS" class="footer-POLS"
           src="../assets/Logo.png">
      ©2025 Created by 刘珂瑞 / 诗岸梦行舟 BHU.
      <img alt="BHU" class="footer-BHU"
           @click="openBHU"
           src="../assets/images/BHU.png">
      CSC.
    </div>
  </div>
</template>

<script setup lang="ts">
const openBHU = () => {
  window.open('https://csc.beihua.edu.cn/');
}
</script>