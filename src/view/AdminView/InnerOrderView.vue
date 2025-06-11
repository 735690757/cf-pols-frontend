<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getSystemOrderRequest} from "../../api/OrderAPIs.ts";
import {useCommonStore} from "../../store/CommonStore.ts";

const columns = [
  {
    title: '开通课程名称',
    dataIndex: 'title',
    key: 'title',
    width: 150,
    align: 'center'
  }, {
    title: '用户头像',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 60,
    align: 'center'
  }, {
    title: '用户昵称',
    dataIndex: 'nickName',
    key: 'nickName',
    width: 150,
    align: 'center'
  }, {
    title: '学习点数',
    dataIndex: 'amount',
    key: 'amount',
    width: 150,
    align: 'center'
  }, {
    title: '用户评分',
    dataIndex: 'score',
    key: 'score',
    width: 150,
    align: 'center'
  }, {
    title: '日期',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 150,
    align: 'center'
  }
]
const orderData = ref([{
  title: '',
  avatar: '',
  nickName: '',
  amount: 0,
  score: 1,
  createTime: ''
}])
const addStruct = ref({
  nowDayCount: 0,
  allEarning: 0
})
onMounted(() => {
  getSystemOrderRequest().then(res => {
    orderData.value = res.data.data
    addStruct.value.nowDayCount = res.data.map.nowDayCount
    addStruct.value.allEarning = res.data.map.allEarning
  })
})
</script>

<template>
  <div class="all-course-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>管理员</a-breadcrumb-item>
      <a-breadcrumb-item>内部</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-core">
      <div class="top-core">
        <div class="top-core-title">
          <div class="top-core-search-container">
            <a class="top-core-butt top-core-search">今日新增订单量：{{ addStruct.nowDayCount }}</a>
          </div>
          <div class="top-core-search-container">
            <a class="top-core-butt top-core-search" style="width: 160px">订单总量：{{ orderData.length }}</a>
          </div>
          <div class="top-core-search-container">
            <a class="top-core-butt top-core-search" style="width: 180px">流通总量：{{ addStruct.allEarning }}</a>
          </div>
        </div>
      </div>
      <div class="core-table">
        <a-table class="core-table-core" :scroll="{  y: 460 }" :data-source="orderData" :columns="columns"
                 :pagination="{ pageSize: 5 }">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'avatar'">
              <img :src="useCommonStore().minioURLPre+record.avatar" alt="tx"
                   style="width: 40px; border-radius: 50%">
            </template>

            <template v-if="column.dataIndex === 'amount'">

              <a-tag v-if="record.amount==0" color="green">Free</a-tag>
              <a-tag v-else-if="record.amount>0" color="red">{{ record.amount }} Pio</a-tag>
            </template>
            <template v-if="column.dataIndex === 'score'">
              <a-rate disabled v-model:value="record.score"/>
            </template>
            <template v-if="column.dataIndex === 'createTime'">
              <!--              如果createTime是今天，就加一个badge-->
              <a-badge-ribbon style="position: relative;margin-top: -50px;width: 70px;margin-left: 130px;"
                              color="purple"
                              v-if="record.createTime && record.createTime.substring(0, 10) === new Date().toISOString().substring(0, 10)"
                              text="新增">
                <a-badge
                    v-if="record.createTime && record.createTime.substring(0, 10) === new Date().toISOString().substring(0, 10)"
                    color="#87d068"
                    :text="record.createTime"/>
              </a-badge-ribbon>
            </template>
          </template>
        </a-table>
      </div>

    </div>
  </div>
</template>

<style scoped>
.all-course-core {
  width: 100%;
}

.content-core {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -100px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  padding: 12px;
  background: #ffffff;
  min-height: 560px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 80vh;
}


.top-core {
  box-shadow: inset 0 0 50px rgba(255, 255, 255, 0.18),
  inset 10px 0 40px rgba(0, 13, 255, 0.16),
  inset -10px 0 40px rgba(255, 196, 0, 0.18),
  inset 100px 0 150px rgba(55, 0, 255, 0.18),
  inset -10px 0 150px rgba(0, 166, 255, 0.22),
  0 0 25px rgba(255, 255, 255, 0.26),
  -100px 0 100px rgba(72, 0, 255, 0.22),
  100px 0 800px rgba(0, 178, 255, 0.19);
  border-radius: 40px;
}

.top-core-search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.top-core-title {
  align-items: center;
  display: flex;
  height: 60px;
}

.top-core-search-container {
  display: flex;
  justify-items: center;
  align-items: center;
}

.top-core-butt {
  background-color: rgba(116, 95, 255, 0.89);
  margin: 10px;
  height: 40px;
  width: 150px;
  border-radius: 40px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  color: #ffffff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-core-search {
  float: right;
  width: 200px;
}

.top-core-search-butt {
  float: right;
  width: 100px;
}

.core-table {
  margin-top: 20px;
  height: 100%;
}


</style>