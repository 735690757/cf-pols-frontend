<style scoped>
.visual-core {
  border-radius: 10px;
  width: 100%;
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

.amount-withdrawn {
  display: flex;
}

.data-show {
  border: #ffffff 1px solid;
  height: 100%;
  gap: 10px;
  margin-right: 20px;
  transition: all 0.7s;
  margin-top: 20px;
  padding: 10px;
}

.data-show:hover {
  border: #558bff 1px solid;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -20px 0 140px rgba(200, 0, 255, 0.22),
  10px 0 300px rgba(0, 255, 217, 0.19);
  transition: all 0.7s;
  border-radius: 20px;
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
  background-color: rgba(91, 129, 247, 0.84);
  background-image: -webkit-linear-gradient(45deg,
  rgba(255, 255, 255, .2) 25%,
  transparent 25%,
  transparent 50%,
  rgba(255, 255, 255, .2) 50%,
  rgba(255, 255, 255, .2) 75%,
  transparent 75%,
  transparent);
}

.sys-info {
  transition: all 0.7s;
  width: 100%;
}
</style>
<template>
  <div class="visual-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>管理员</a-breadcrumb-item>
      <a-breadcrumb-item>数据可视化</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="core-content">
      <EText style="height: 100px;margin-bottom: 10px;" :font-size="34"
             :core-text="'基于协同过滤算法的个性化在线学习系统'"/>
      <div class="amount-withdrawn" style="margin-top: 10px;">
        <a-card title="系统数据统计" class="data-show" style="height: 300px; width: 60%;">
          <a-row :gutter="16">
            <a-col :span="6">
              <a-statistic title="总用户数" :value="dataVisualData.userCount"
                           :value-style="style"/>
            </a-col>
            <a-col :span="6">
              <a-statistic title="课程总数" :value="dataVisualData.courseCount"
                           :value-style="style"/>
            </a-col>
            <a-col :span="6">
              <a-statistic title="学习点交易量" :value="dataVisualData.orderFund" suffix="Pio"
                           :value-style="style"/>
            </a-col>
            <a-col :span="6">
              <a-statistic title="教师提现待处理数" :value="dataVisualData.pendingPayouts"
                           :value-style="style"/>
            </a-col>
          </a-row>
          <a-divider/>
          <a-row :gutter="16">
            <a-col :span="6">
              <a-statistic title="系统充值总单数" :value="dataVisualData.orderAliCount"
                           :value-style="style"/>
            </a-col>
            <a-col :span="6">
              <a-statistic title="课程平均完成率" :value="dataVisualData.averagePercentage" suffix="%"
                           :value-style="style"/>
            </a-col>
            <a-col :span="6">
              <a-statistic title="充值保有金额" :value="dataVisualData.orderAliFund" suffix="元"
                           :value-style="style"/>
            </a-col>
            <a-col :span="6">
              <a-statistic title="净获利" :value="dataVisualData.orderAliFund-dataVisualData.payoutFund" suffix="元"
                           :value-style="style"/>
            </a-col>
          </a-row>
        </a-card>
        <LoginTimesComp style="height: 300px;width: 40%;" class="data-show"/>

      </div>
      <div class="amount-withdrawn">
        <EIngredientsComp class="data-show"/>
        <EScatterComp class="data-show"/>
      </div>
      <div class="amount-withdrawn">
        <ECourseViewsComp style="height: 100%; width: 100%;" class="data-show"/>
      </div>
      <div class="amount-withdrawn">
        <div class="sys-info data-show">
          <a-typography-title :level="4">系统历史</a-typography-title>
          <a-timeline mode="alternate">
            <a-timeline-item>2024-12-30 协同过滤算法技术验证</a-timeline-item>
            <a-timeline-item>KKFile与MinIO技术验证 2025-01-01</a-timeline-item>
            <a-timeline-item>2025-01-08 我的毕业设计开始了</a-timeline-item>
            <a-timeline-item color="red">
              <template #dot>
                <ClockCircleOutlined style="font-size: 16px"/>
              </template>
              过年暂停了2周 2025-01-22
            </a-timeline-item>
            <a-timeline-item>
              2025-03-07 回来接着写
            </a-timeline-item>
            <a-timeline-item color="red">
              <template #dot>
                <ClockCircleOutlined style="font-size: 16px"/>
              </template>
              考研成绩出来了，准备复试去了 2025-03-15
            </a-timeline-item>
            <a-timeline-item>2025-04-09 拟录取了，继续写毕设</a-timeline-item>
            <a-timeline-item>
              <template #dot>
                <ClockCircleOutlined style="font-size: 16px"/>
              </template>
              开始毕业实习答辩 2025-04-23
            </a-timeline-item>
          </a-timeline>
        </div>
        <EAllReviewDetailsComp style="height: 100%; width: 100%;" class="data-show"/>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import EText from "../../components/EChartsComp/EText.vue";
import EIngredientsComp from "../../components/EChartsComp/EIngredientsComp.vue";
import EScatterComp from "../../components/EChartsComp/EScatterComp.vue";
import ECourseViewsComp from "../../components/EChartsComp/ECourseViewsComp.vue";
import LoginTimesComp from "../../components/UserComp/LoginTimesComp.vue";
import {onMounted, ref} from "vue";
import {getAdminDataShowRequest} from "../../api/DataVisualAPIs.ts";
import {ClockCircleOutlined} from '@ant-design/icons-vue';
import EAllReviewDetailsComp from "../../components/EChartsComp/EAllReviewDetailsComp.vue";

const dataVisualData = ref({
  averagePercentage: 0,
  orderAliCount: 0,
  orderAliFund: 0,
  orderCount: 0,
  orderFund: 0,
  pendingPayouts: 0,
  userCount: 0,
  courseCount: 0,
  payoutFund: 0,
})

// 样式统一
const style = {
  color: '#4e6dd0',
  fontSize: '28px',
  fontWeight: 'bold',
  fontFamily: 'Harmony OS'
}
onMounted(() => {
  getAdminDataShowRequest().then(res => {
    dataVisualData.value = res.data.map
  })
})
</script>