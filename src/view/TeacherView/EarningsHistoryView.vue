<script setup lang="ts">
import {h, onMounted, ref} from 'vue'
import {notification} from "ant-design-vue";
import {SmileOutlined} from "@ant-design/icons-vue";
import {getTeacherPayoutRequest} from "../../api/PayoutAPIs.ts";
import EText from "../../components/EChartsComp/EText.vue";

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

// 提现历史数据
const withdrawalHistory = ref([
  {
    id: 0,
    userId: 0,
    nickName: '',
    learnCount: 0,
    payout: 0,
    ispaid: 0,
    createTime: ''
  }
])

// 表格列定义
const columns = [
  {
    title: '日期',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '金额(元)',
    dataIndex: 'payout',
    key: 'payout',
  },
  {
    title: '应付学习点数',
    dataIndex: 'learnCount',
    key: 'learnCount',
  },
  {
    title: '状态',
    dataIndex: 'ispaid',
    key: 'ispaid',
  },
]

onMounted(() => {
  let uid = localStorage.getItem('uid')
  getTeacherPayoutRequest(uid).then((res) => {
    withdrawalHistory.value = res.data.data
  })
})
</script>

<template>
  <div class="earnings-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>教师</a-breadcrumb-item>
      <a-breadcrumb-item>提现记录</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="core-content">
      <a-table :columns="columns" :dataSource="withdrawalHistory" bordered :pagination="{ pageSize: 5 }">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'amount'">
            <span>金额(元)</span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'ispaid'">
            <template v-if="record.ispaid == 1">
              <a-tag color="#108ee9">处理中</a-tag>
            </template>
            <template v-else-if="record.ispaid == 0">
              <a-tag color="#f50">待审核</a-tag>
            </template>
            <template v-else-if="record.ispaid == 2">
              <a-tag color="#87d068">已打款</a-tag>
            </template>
          </template>
        </template>
      </a-table>
      <EText :core-text="'审核进行中，请耐心等待打款结果'"/>
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

.my-found p {
  font-size: 18px;
}
</style>