<script setup lang="ts">
import {onMounted, onBeforeUnmount} from 'vue'
import router from "../../router";

// 粒子类定义
class Particle {
  x: number
  y: number
  size: number
  color: string
  velocityY: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.size = Math.random() * 3 + 1
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`
    this.velocityY = Math.random() * 3 + 1
  }

  update(canvasHeight: number) {
    this.y += this.velocityY
    if (this.y > canvasHeight) {
      this.y = 0
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

let particles: Particle[] = []
let animationId: number

// 粒子数量
const numParticles = 100

onMounted(() => {
  const canvas = document.getElementById('particleCanvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // 初始化粒子
  particles = []
  for (let i = 0; i < numParticles; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    particles.push(new Particle(x, y))
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(canvas.height)
      particles[i].draw(ctx)
    }
    animationId = requestAnimationFrame(animate)
  }

  animate()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', () => {
  })
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="root">
    <div class="core-pe">
      <canvas id="particleCanvas"/>
      <div class="pe-title">
        <span style="position: absolute; left: 30px">
          <img src="../../assets/images/logo-gif.gif" @click="goBack" class="d-logo" alt="">
        </span>
        <span>——《回首望去满是我青春年华》——</span>
      </div>
      <div class="pe-content">
        <span>写到这里了，也就意味着我的大学时光即将结束了</span>
        <span>或者说，我的本科旅途即将结束了</span>
        <span>每次写课程设计的时候，我总喜欢在程序里留下些小彩蛋</span>
        <span>除了任课老师以外，或者连同他也无人在意这份惊喜</span>
        <span>但我依然喜欢在程序里留下些痕迹</span>
        <span>如果这篇文章恰巧被你看到了，或是老师亦或是其他人要求我打开的话</span>
        <span>斯....那可能还挺尴尬</span>
        <span>不管了，加纳（-.-)/</span>
        <span>回想起大学里，留下最深刻的回忆也许就是一个个期末考试、课程作业、实验报告......</span>
        <span>当然还有那些可爱的同学们</span>
        <span>如此这些交织交错，一同成为了我的青春画卷</span>
        <span>我想对这四年我遇到的所有人说一声感谢</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #000;
  font-family: 'HarmonyOS Sans SC', sans-serif;
}

canvas {
  display: block;
}

#particleCanvas {
  position: absolute;
}

.core-pe {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(#f5f5f5, rgba(174, 175, 255, 0.47) 50%, transparent);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(10px);

}

.root:before {
  content: '';
  background-image: url("../../assets/images/bg-course-01.jpg");
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(10px);
}

.pe-title {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(188, 102, 246, 0.34);
  font-family: 楷体, 'HarmonyOS Sans SC', sans-serif;
  font-size: 35px;
  border-radius: 10px;
}

.pe-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 楷体, 'HarmonyOS Sans SC', sans-serif;
  font-size: 29px;
  padding-top: 10px;
  flex-direction: column;
}
.pe-content span{
  margin-top: 20px;
}

.d-logo{
  width: 160px;
  margin-top: 160px;
  border-radius: 40px;
  margin-left: 10px;
  transition: all 0.5s;
  cursor: pointer;
}
.d-logo:hover{
  transition: all 0.5s;
  transform: scale(1.1);
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.5);
}
</style>
