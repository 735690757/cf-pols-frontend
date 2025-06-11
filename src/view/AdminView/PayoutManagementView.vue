<script setup lang="ts">
import {h, onMounted, ref} from "vue";
import {agreePayoutRequest, getPayoutRequest, successPayoutRequest} from "../../api/PayoutAPIs.ts";
import {SmileOutlined} from "@ant-design/icons-vue";
import {notification} from "ant-design-vue";

const columns = [
  {
    title: '提现ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center'

  }, {
    title: '提现人',
    dataIndex: 'nickName',
    key: 'nickName',
    align: 'center'
  }, {
    title: '日期',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center'

  },
  {
    title: '使用学习点(Pionts)',
    dataIndex: 'learnCount',
    key: 'learnCount',
    align: 'center'

  },
  {
    title: '金额(元)',
    dataIndex: 'payout',
    key: 'payout',
    align: 'center'

  },
  {
    title: '届时抽成率',
    key: 'ratio',
    align: 'center'

  },
  {
    title: '应付学习点数',
    dataIndex: 'learnCount',
    key: 'learnCount',
    align: 'center'

  },
  {
    title: '状态',
    dataIndex: 'ispaid',
    key: 'ispaid',
    align: 'center'

  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    align: 'center'
  }
]

const withdrawalHistory = ref([
  {
    id: 1,
    createTime: '2023-05-01',
    nickName: 'John Brown',
    payout: 100,
    learnCount: 100,
    ispaid: 0,
  }
])

onMounted(() => {
  getPayoutRequest().then((res) => {
    withdrawalHistory.value = res.data.data
  })
})
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
const agreePayout = (id: any) => {
  agreePayoutRequest(id).then((res) => {
    if (res.data.code === 200) {
      aliNotification('同意提现成功', '同意提现成功', 2)
      getPayoutRequest().then((res) => {
        withdrawalHistory.value = res.data.data
      })
    }
  })
}

const sucPayout = (id: any) => {
  successPayoutRequest(id).then((res) => {
    if (res.data.code === 200) {
      aliNotification('通知', '现已经提示教师', 2)
      getPayoutRequest().then((res) => {
        withdrawalHistory.value = res.data.data
      })
    }
  })
}

const roundToTwo = (value: number): number => {
  return Math.round(value * 100) / 100;
};
</script>

<template>
  <div class="payout-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>管理员</a-breadcrumb-item>
      <a-breadcrumb-item>提现管理</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="core-content">
      <a-table :columns="columns" :dataSource="withdrawalHistory" bordered :pagination="{ pageSize: 7 }">
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
          <template v-if="column.key === 'action'">
            <a-button v-if="record.ispaid==0" style="background-color:#735efd;" type="primary"
                      @click="agreePayout(record.id)">同意提现
            </a-button>
            <a-button v-if="record.ispaid==1" style="background-color:#108de7;" type="primary"
                      @click="sucPayout(record.id)">提示成功
            </a-button>
            <a-button disabled v-if="record.ispaid==2" style="background-color:#ffffff;" type="primary"
                      @click="console.log(record)">提现成功
            </a-button>
          </template>
          <template v-if="column.key === 'ratio'">
            <!--        保留两位小数    -->
            <a-tooltip placement="top">
              <a-tag color="#108ee9" style="font-size: 14px">{{ roundToTwo(1 - (record.payout / ((record.learnCount) / 10))) * 100 }}%</a-tag>
            </a-tooltip>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "HarmonyOS Sans SC", sans-serif;
}

.payout-core {
  width: 100%;
}

/*滚动条整体样式*/
.core-content::-webkit-scrollbar {
  width: 10px;
  height: 1px;
  border: none;
}

/*滚动条里面小方块*/
.core-content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #f66666;
  background-image: -webkit-linear-gradient(45deg,
  rgba(255, 255, 255, .2) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, .2) 50%,
  rgba(255, 255, 255, .2) 75%,
  transparent 75%,
  transparent);
}

.core-content {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -100px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  width: 100%;
  border-radius: 20px;
  padding: 12px;
  background: #ffffff;
  min-height: 560px;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>