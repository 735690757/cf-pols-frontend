<script setup lang="ts">
import {computed, h, onMounted, ref} from 'vue'
import {getTeacherEarningRequest} from "../../api/OrderAPIs.ts";
import {getTeacherFundRequest} from "../../api/UserAPIs.ts";
import {getSystemSettingRequest} from "../../api/SystemSettingAPIs.ts";
import {notification} from "ant-design-vue";
import {SmileOutlined} from "@ant-design/icons-vue";
import {addPayoutRequest} from "../../api/PayoutAPIs.ts";

// 封装一个通知
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
const withdrawAmount = ref<number>(0)
const mergedOrders = ref([{
  title: '',
  amount: '',
  createTime: ''
}])
const hideZeroEarnings = ref(false) // 新增开关状态

// 计算属性过滤数据
const filteredOrders = computed(() => {
  if (!hideZeroEarnings.value) return mergedOrders.value
  return mergedOrders.value.filter(order => order.amount !== '0.0')
})

// 教师学习点数
const teacherFund = ref(0)
// 抽成率
const commissionRate = ref(100)
onMounted(() => {
  let uid = localStorage.getItem('uid');
  getTeacherEarningRequest(uid).then((res) => {
    mergedOrders.value = res.data.data
  })
  getTeacherFundRequest(uid).then((res) => {
    teacherFund.value = res.data.data
  })
  getSystemSettingRequest().then((res) => {
    commissionRate.value = res.data.data[0].rate / 100
  })
})

// 申请记录
const payoutAmount = ref({
  userId: 0,
  nickName: '',
  learnCount: 0,
  payout: 0,
})
// 提现
const toPayout = () => {
  if (withdrawAmount.value == 0 || withdrawAmount.value > teacherFund.value) {
    aliNotification('提现失败', '提现金额不能为0或超过当前学习点数', 2)
    return
  }
  payoutAmount.value = {
    userId: Number(localStorage.getItem('uid')),
    nickName: localStorage.getItem('nickname') || '',
    learnCount: withdrawAmount.value,
    payout: (withdrawAmount.value * (1 - commissionRate.value)) / 10
  }
  console.log(payoutAmount.value)
  addPayoutRequest(payoutAmount.value).then((res) => {
    if (res.data.code == 200) {
      aliNotification('提现申请', '提现申请，请等待审核', 2)
    } else {
      aliNotification('提现失败', '提现失败，请稍后再试', 2)
    }
  })
  // getTeacherEarningRequest(payoutAmount.value.userId).then((res) => {
  //   mergedOrders.value = res.data.data
  // })
  // getTeacherFundRequest(payoutAmount.value.userId).then((res) => {})
}
</script>

<template>
  <div class="earnings-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>教师</a-breadcrumb-item>
      <a-breadcrumb-item>收益提现</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="core-content">
      <div class="filter-control">
        <span style="margin-right: 8px">隐藏零收益</span>
        <a-switch v-model:checked="hideZeroEarnings"/>
      </div>
      <div class="earnings-container">

        <a-table :dataSource="filteredOrders" :columns="[
          { title: '课程名称', dataIndex: 'title', key: 'title' },
          { title: '收益(学习点)', dataIndex: 'amount', key: 'amount' },
          { title: '日期', dataIndex: 'createTime', key: 'createTime' }
        ]" rowKey="id" class="earnings-table" :pagination="{ pageSize: 6 }"/>
        <a-card title="收益提现" class="withdraw-card">
          <div class="k-bord my-found">
            <p>学习点持有数：{{ teacherFund }}</p>
          </div>
          <div class="k-bord">
            <p>当前抽成率</p>
            <span>{{ commissionRate * 100 }}%</span>
          </div>
          <div class="k-bord my-found">
            <p>[{{ withdrawAmount }}×(1-{{ commissionRate }})]/10={{
                (withdrawAmount * (1 - commissionRate)) / 10
              }} RMB</p>
          </div>
          <a-form layout="vertical">
            <a-form-item label="提现数量">
              <a-input-number v-model:value="withdrawAmount" :min="100" :max="teacherFund" style="width: 100%"/>
            </a-form-item>
            <a-button @click="toPayout" type="primary" block>申请提现</a-button>
          </a-form>
        </a-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.earnings-core {
  height: 100%;
  width: 100%;
}

.core-content {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -100px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  height: 90%;
  width: 100%;
  border-radius: 20px;
  padding: 13px;
  background-color: #fff;
}

.earnings-container {
  display: flex;
  gap: 20px;
}

.earnings-table {
  flex: 2;
}

.withdraw-card {
  flex: 1;
  min-width: 300px;
}

.filter-control {
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
  position: relative;
}

.k-bord {
  background: linear-gradient(90deg, rgba(255, 189, 135, 0.38), rgba(255, 133, 209, 0.77));
  background-size: 200% 100%;
  animation: shine 3s infinite linear;
  width: 100%;
  height: 100px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  00px 0 10px rgba(200, 0, 255, 0.22),
  10px 0 80px rgba(0, 255, 217, 0.19);
  margin-bottom: 16px;
}

.k-bord p {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.k-bord span {
  font-size: 40px;
  font-weight: 700;
  font-family: "HarmonyOS Sans SC", sans-serif;
  color: transparent;
  background: linear-gradient(90deg, #0f0, #00f);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine 5s infinite linear;
}

@keyframes shine {
  0% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0% center;
  }
}

@-webkit-keyframes shine {
  0% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0% center;
  }
}

.my-found {
  height: 50px;
  font-size: 20px;
}

.my-found p {
  font-size: 18px;
}
</style>