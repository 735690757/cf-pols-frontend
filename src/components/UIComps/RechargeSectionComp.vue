<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.cards .red {
  background-color: rgba(244, 63, 94, 0.66);
}

.cards .blue {
  background-color: rgba(59, 130, 246, 0.66);
}

.cards .green {
  background-color: rgba(34, 197, 94, 0.66);
}

.cards .card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 120px;
  width: 350px;
  color: white;
  cursor: pointer;
  transition: 400ms;
  border-radius: 20px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  font-size: 21px;
  user-select: none;
}

.cards .card p.tip {
  font-size: 1em;
  font-weight: 700;
}

.cards .card p.second-text {
  font-size: .7em;
}

.cards .card:hover {
  transform: scale(1.1, 1.1);
  backdrop-filter: blur(10px);
}

.cards .card:active {
  transform: scale(1.2, 0.8);
}

.cards:hover > .card:not(:hover) {
  filter: blur(10px);
  transform: scale(0.9, 0.9);
}

.core {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="core">
    <a-modal style="width: 800px" v-model:open="open" title="历史充值记录" @ok="handleOk">
      <a-table :scroll="{ y:250 }" pagination="false" :data-source="fromData" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'createTime'">
            {{ record.createTime.substring(0, 10) }}
          </template>
          <template v-else-if="column.dataIndex === 'status'">
            <a-tag v-if=" record.status === 1 " color="green">成功</a-tag>
            <a-tag v-else color="red">失败</a-tag>
          </template>
          <template v-else>
            {{ record[column.dataIndex] }}
          </template>
        </template>
      </a-table>
      <template #footer>

      </template>
    </a-modal>
    <div class="cards">
      <div class="card red">
        <p class="tip">您当前持有的学习点数量</p>
        <p class="second-text">{{ props.learnCount }} points</p>
      </div>
      <div class="card blue">
        <p class="tip">累计充值金额</p>
        <p class="second-text">{{ acc }} RMB</p>
      </div>
      <div @click="showModal" class="card green">
        <p class="tip">查看历史充值记录</p>
        <p class="second-text">点我查看</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, ref} from "vue";
import {getMyOrderRequest} from "../../api/OrderAPIs.ts";

const props = defineProps({
  learnCount: {
    type: Number,
    default: 0
  },
  acc: {
    type: Number,
    default: 0
  },
  uid: {
    type: String,
    default: ""
  }
})
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};

const columns = [
  {
    title: '充值标识',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '充值金额',
    dataIndex: 'money',
    align: 'center',
    key: 'money',
  },
  {
    title: '充值方式',
    dataIndex: 'paymentMethod',
    align: 'center',
    key: 'paymentMethod',
  }, {
    title: '充值状态',
    dataIndex: 'status',
    align: 'center',
    key: 'status',
  }, {
    title: '充值时间',
    dataIndex: 'createTime',
    align: 'center',
    key: 'createTime',
  },
];
const fromData = ref([{
  id: 0,
  userId: 0,
  interfaceInfoId: 0,
  money: 0,
  paymentMethod: "",
  status: 0,
  createTime: "",
  updateTime: "",
  isDelete: 0
}])
onMounted(() => {
  getMyOrderRequest().then(res => {
    fromData.value = res.data.data
  })
})

</script>