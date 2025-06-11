<script setup lang="ts">
import {h, onMounted, ref} from 'vue';
import {getSystemSettingRequest, updateSystemSettingRequest} from "../../api/SystemSettingAPIs.ts";
import {notification} from "ant-design-vue";
import {SmileOutlined} from "@ant-design/icons-vue";
import ECPUUsageComp from "../../components/EChartsComp/ECPUUsageComp.vue";
import EMemoryUsageComp from "../../components/EChartsComp/EMemoryUsageComp.vue";
import {useCommonStore} from "../../store/CommonStore.ts";

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

// 系统设置对象
const systemSettings = ref({
  rate: 10,
  date:''
});
/*const siteName = ref('我的系统');
const maintenanceMode = ref(false);
const themeColor = ref('#1890ff');*/

const formatter = (value: number) => {
  return `${value}%`;
};
const saveSettings = () => {
  updateSystemSettingRequest(systemSettings.value).then((res) => {
    if (res.data.code === 200) {
      aliNotification('保存成功', '系统设置已保存', 2)
    }
  })
}
onMounted(() => {
  getSystemSettingRequest().then((res) => {
    systemSettings.value = res.data.data[0]
  })
})
const backupNow = () => {
  aliNotification('开始备份', '系统数据库正在备份中...', 2)
  window.location.href = useCommonStore().baseURL+"setting/backup";
}
</script>

<template>
  <div class="top-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>管理员</a-breadcrumb-item>
      <a-breadcrumb-item>系统设置</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="system-settings-core">

      <div class="settings-panel">
        <a-typography-title>系统设置</a-typography-title>

        <!--        <div class="setting-item">-->
        <!--          <label>网站名称</label>-->
        <!--          <input type="text" v-model="siteName" class="setting-input">-->
        <!--        </div>-->

        <!--        <div class="setting-item">-->
        <!--          <label>主题颜色</label>-->
        <!--          <input type="color" v-model="themeColor" class="setting-color">-->
        <!--        </div>-->

        <!--        <div class="setting-item">-->
        <!--          <label>系统状态</label>-->
        <!--          <div class="toggle-switch">-->
        <!--            <input type="checkbox" id="maintenance" v-model="maintenanceMode">-->
        <!--            <label for="maintenance" class="toggle-label">-->
        <!--              {{ maintenanceMode ? '维护中' : '正常运行' }}-->
        <!--            </label>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="setting-item-chart">
          <ECPUUsageComp/>
          <EMemoryUsageComp/>
        </div>
        <div class="setting-item">
          <a-button class="save-btn" @click="saveSettings" type="primary">保存</a-button>
          <label>收益抽成比例 <span style="color: #e66666">( 请确保抽成率大于14%，否则会亏损 )</span></label>
          <div class="rate-display">
            {{ systemSettings.rate }}%
          </div>
          <div class="rate-slider">
            <a-slider v-model:value="systemSettings.rate" :tip-formatter="formatter"/>
          </div>
        </div>
        <div class="setting-item">
          <span class="save-btn backup-sty" type="primary">上一次备份时间：{{ systemSettings.date}}</span>
          <label>系统数据库备份 <span style="color: #6693e6">( 建议每隔7天执行一次 )</span></label>
          <a-button style="width: 30%;border-radius: 10px;background-color:#1676fd;margin-top: 13px;" @click="backupNow" type="primary">
            开始备份
          </a-button>
        </div>
        <!--        <button class="save-btn">保存设置</button>-->
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-core {
  width: 100%;
  height: 100%;
}

.system-settings-core {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  -100px 0 100px rgba(200, 0, 255, 0.22),
  100px 0 800px rgba(0, 255, 217, 0.19);
  width: 100%;
  border-radius: 20px;
  padding: 13px;
  background-color: rgba(255, 255, 255, 0.74);
  min-height: 560px;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.settings-panel {
  padding: 20px;

}

/*滚动条整体样式*/
.system-settings-core::-webkit-scrollbar {
  width: 10px;
  height: 1px;
  border: none;
}

/*滚动条里面小方块*/
.system-settings-core::-webkit-scrollbar-thumb {
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

.rate-display {
  margin-bottom: 10px;
  font-size: 20px;
  color: #333;
}

.setting-item-chart {
  margin-bottom: 20px;
  margin-left: 10px;
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  transition: all 0.2s;
  height: 300px;
  display: flex;
  background-color: rgba(228, 153, 255, 0.13);
  background-image: radial-gradient(at 47% 69%, hsla(17, 62%, 65%, 0.25) 0px, transparent 50%),
  radial-gradient(at 9% 32%, hsla(222, 75%, 60%, 0.13) 0px, transparent 50%);

}

.setting-item-chart:hover {
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.26),
  00px 0 10px hsla(222, 75%, 60%, 0.13),
  10px 0 80px hsla(222, 75%, 60%, 0.13)
}

.setting-item {
  margin-bottom: 20px;
  margin-left: 10px;
  margin-top: 10px;
  background-color: rgb(232, 232, 232);
  width: 50%;
  padding: 10px;
  border-radius: 20px;
  transition: all 0.2s;
  height: 100px;
}

.setting-item:hover {
  background-color: rgba(233, 242, 255, 0.94);
  transition: all 0.2s;

}

.setting-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 16px;
  font-family: "HarmonyOS Sans SC", sans-serif;
}

.setting-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.setting-color {
  width: 50px;
  height: 30px;
}

.toggle-switch {
  display: flex;
  align-items: center;
}

.toggle-switch input[type="checkbox"] {
  margin-right: 10px;
}


.slider {
  flex: 1;
  margin-right: 10px;
}

.save-btn {
  position: relative;
  float: right;
  border-radius: 10px;
}

.backup-sty {
  background-color: rgba(22, 118, 253, 0.17);
  padding: 5px;
}

</style>