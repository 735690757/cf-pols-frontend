<script setup lang="ts">
import {computed, h, onMounted, ref} from 'vue'
import router from "../../router";
import VortexBackgroundComp from "../../components/AnimationComp/VortexBackgroundComp.vue";
import {useRoute} from "vue-router";
import {getUserFundRequest} from "../../api/UserAPIs.ts";
import {getCourseInfoRequest} from "../../api/CourseAPIs.ts";
import {buyCourseRequest} from "../../api/OrderAPIs.ts";
import {notification} from "ant-design-vue";
import {SmileOutlined} from "@ant-design/icons-vue";

const paymentAmount = ref(168.00)
// const orderNumber = ref('DD202405200001')
const userPoints = ref(1000.00)
const currentDate = ref(new Date().toISOString().split('T')[0])
const isLoading = ref(false) // 新增加载状态

const userId = ref()
const courseId = ref()
const isPremiumMember = computed(() => userPoints.value === -1)
const route = useRoute()

// 课程模型
const paymentMethods = ref({
  id: 0,
  teacherId: 0,
  cover: '',
  title: '',
  courseDescribe: '',
  price: 0,
})
onMounted(() => {
  // 接收路由参数：userid和courseid
  userId.value = route.query.userId
  courseId.value = route.query.courseId

  // 查询用户学习点数
  getUserFundRequest().then(response => {
    userPoints.value = Number(response.data.data)
  })
  // 查询课程详情，解构学习点数
  getCourseInfoRequest(courseId.value).then(response => {
    paymentMethods.value.id = response.data.data.id
    paymentMethods.value.teacherId = response.data.data.teacherId
    paymentMethods.value.cover = response.data.data.cover
    paymentMethods.value.title = response.data.data.title
    paymentMethods.value.courseDescribe = response.data.data.courseDescribe
    paymentMethods.value.price = Number(response.data.data.price)
    paymentAmount.value = Number(response.data.data.price)
  })
})
// 阿里通知
const aliNotification = (message: string, description: string, duration: number) => {
  notification.open(
      {
        message: message,
        description: description,
        duration: duration,
        icon: () => h(SmileOutlined, {style: 'color: #108ee9'}),
        top: 100
      }
  )
}

const handlePayment = async () => {
  if (!isPremiumMember.value && userPoints.value < paymentAmount.value) {
    return alert('学习点数不足，请充值')
  }

  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  // alert(isPremiumMember.value ?
  //     '高级会员支付成功！' :
  //     `支付成功！已扣除${paymentAmount.value}点`
  // )
  buyCourseRequest(userId.value, courseId.value).then(response => {
    if (response.data.code === 200) {
      aliNotification('成功', '购买成功,即将跳转', 2)
      setTimeout(() => {
        router.push('/student')
      }, 2000)
    } else {
      aliNotification('失败', '购买失败，'+response.data.msg, 2)
    }
    isLoading.value = false
  })

}

const goToRecharge = () => {
  router.push('/student/recharge')
}
// 取消订单
const handleCancelOrder = () => {
  router.back()
}

</script>

<template>
  <div class="core-box">
    <VortexBackgroundComp style="position: absolute;z-index: -1"/>
    <div class="payment-container">
      <div class="order-card hover-grow">
        <h2 class="card-title">订单信息</h2>
        <div class="order-info">
          <p class="order-number">课程名：{{ paymentMethods.title }}</p>
          <p class="order-number">课程描述：{{ paymentMethods.courseDescribe }}</p>
          <p class="order-date">购买日期：{{ currentDate }}</p>
          <p class="amount">支付：{{ paymentAmount.toFixed(2) }} Points</p>
        </div>
      </div>

      <!-- 支付信息 -->
      <div class="payment-methods">
        <h3 class="section-title">支付方式</h3>
        <div class="method-item active">
          <div class="method-icon">
            <img src="/Logox2.png" style="width: 44px; height: 44px;">
          </div>
          <span>学习点数支付</span>
        </div>

        <div class="points-info">
          <div class="points-info">
            <p v-if="!isPremiumMember">当前学习点数: <strong>{{ userPoints }}</strong>点</p>
            <p v-else class="premium-info">
              <el-icon name="star"/>
              您是高级会员，无需支付学习点数
            </p>
            <p v-if="!isPremiumMember">支付后将剩余: <strong>{{ Math.max(userPoints - paymentAmount, 0) }}</strong>点
            </p>
            <p v-if="!isPremiumMember && userPoints < paymentAmount" class="points-warning">
              <el-icon name="warning"/>
              学习点数不足，还差{{ (paymentAmount - userPoints).toFixed(2) }}点
            </p>
          </div>
        </div>
      </div>

      <!-- 操作按钮 - 添加加载动画 -->
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <el-button
            type="primary"
            class="pay-button"
            :class="{ 'disabled-button': !isPremiumMember && userPoints < paymentAmount }"
            :disabled="!isPremiumMember && (userPoints < paymentAmount || isLoading)"
            @click="handlePayment"
        >
          <span v-if="!isLoading">确认支付</span>
          <span v-else class="loading-text">处理中<span class="loading-dots"></span></span>
        </el-button>
        <el-button class="cancel-button" @click="handleCancelOrder">取消订单</el-button>
        <el-button
            v-if="!isPremiumMember && userPoints < paymentAmount"
            type="warning"
            class="recharge-button"
            @click="goToRecharge"
        >
          去充值
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.core-box {
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

}

.hover-grow {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-grow:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.ripple {
  position: relative;
  overflow: hidden;
}

.ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 1%, transparent 1%) center/15000%;
  opacity: 0;
  transition: opacity 0.5s, background-size 0.5s;
}

.ripple:active:after {
  background-size: 100%;
  opacity: 1;
  transition: 0s;
}

.loading-text {
  display: inline-flex;
  align-items: center;
}

.loading-dots:after {
  content: ".";
  animation: dots 1.5s steps(5, end) infinite;
}

@keyframes dots {

  0%,
  20% {
    content: ".";
  }

  40% {
    content: "..";
  }

  60% {
    content: "...";
  }

  80%,
  100% {
    content: "";
  }
}

.payment-container {
  min-width: 500px;
  max-width: 700px;
  margin: auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.82);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.order-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.card-title {
  color: #333;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
}

.order-number {
  color: #666;
  font-size: 14px;
}

.amount {
  font-size: 32px;
  color: #ff6b6b;
  margin-top: 15px;
  font-weight: 700;
}

.section-title {
  color: #444;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 500;
}

.method-item {
  display: flex;
  align-items: center;
  padding: 18px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: white;
}

.method-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.method-item.active {
  border-color: #409eff;
  background-color: rgba(64, 158, 255, 0.05);
}

.method-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
  margin-right: 15px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.pay-button {
  padding: 12px 36px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  background: linear-gradient(135deg, #409eff 0%, #337ecc 100%);
  border: none;
  transition: all 0.3s;
}

.disabled-button {
  background: linear-gradient(135deg, #ff8c66 0%, #ff704d 100%) !important;
  opacity: 0.7;
  cursor: not-allowed;
}

.cancel-button {
  padding: 12px 36px;
  font-size: 16px;
  border-radius: 8px;
  color: #666;
  border: 1px solid #ddd;
}

.points-info {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 15px;
}

.points-info p {
  margin: 8px 0;
}

.points-info strong {
  color: #409eff;
  font-weight: 600;
}

.points-warning {
  color: #f56c6c;
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 8px 12px;
  background-color: #fff6f6;
  border-radius: 6px;
  border-left: 3px solid #f56c6c;
}

.points-warning .el-icon {
  margin-right: 6px;
}

.order-date {
  color: #666;
  font-size: 14px;
  margin: 8px 0;
}

.recharge-button {
  padding: 12px 36px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  background: linear-gradient(135deg, #e6a23c 0%, #d48816 100%);
  border: none;
  transition: all 0.3s;
}

.recharge-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(230, 162, 60, 0.2);
}

.premium-info {
  color: #e6a23c;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.premium-info .el-icon {
  margin-right: 8px;
  color: #e6a23c;
}
</style>