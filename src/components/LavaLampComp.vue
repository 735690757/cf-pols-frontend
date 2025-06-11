<template>
  <div class="lava-lamp">
    <div class="bubble"></div>
    <div class="bubble1"></div>
    <div class="bubble2"></div>
    <div class="bubble3"></div>
  </div>

</template>

<style scoped>
@keyframes drop {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(180px);
  }
  100% {
    transform: translateY(0px);
  }
}

.lava-lamp:hover {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.7s;
  height: 210px;

}

.lava-lamp {
  position: relative;
  width: 50px;
  height: 200px;
  background: rgba(18, 18, 18, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  overflow: hidden;
  transition: all 0.7s;
  cursor: pointer;
}

.bubble {
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  background: linear-gradient(to bottom, rgba(230, 73, 128, 0.38), rgba(255, 135, 135, 0.44));
  border-radius: 50%;
  left: 15px;
  animation: drop 10s ease-in-out infinite;
}

.bubble1 {
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  background: linear-gradient(to bottom, rgba(130, 201, 30, 0.51), rgba(59, 201, 219, 0.94));
  border-radius: 50%;
  left: 1px;
  animation: drop 6s ease-in-out infinite;
}

.bubble2 {
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  background: linear-gradient(to bottom, rgba(121, 80, 242, 0.79), rgba(247, 131, 172, 0.7));
  border-radius: 50%;
  left: 30px;
  animation: drop 8s ease-in-out infinite;
}

.bubble3 {
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  background: linear-gradient(to bottom, rgba(68, 129, 235, 0.47), rgba(4, 190, 254, 0.49));
  border-radius: 50%;
  left: 20px;
  animation: drop 12s ease-in-out infinite;
}

</style>