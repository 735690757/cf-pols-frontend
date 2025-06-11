<template>
  <div class="spinner">
    <div class="spinner1"></div>
  </div>
</template>

<style scoped>
.spinner {
  background-image: linear-gradient(rgb(186, 66, 255) 35%,rgb(0, 225, 255));
  width: 30px;
  height: 30px;
  animation: spinning82341 1.7s linear infinite;
  text-align: center;
  border-radius: 50px;
  filter: blur(1px);
  box-shadow: 0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255);
}

.spinner1 {
  background-color: rgba(255, 255, 255, 0.68);
  width: 30px;
  height: 30px;
  border-radius: 50px;
  filter: blur(10px);
}

@keyframes spinning82341 {
  to {
    transform: rotate(360deg);
  }
}
</style>