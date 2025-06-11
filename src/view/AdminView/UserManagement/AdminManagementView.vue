<style scoped>
.admin-management-core {
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
  inset -10px 0 40px rgba(0, 102, 255, 0.18),
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
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.top-core-butt {
  background-color: rgba(116, 95, 255, 0.89);
  margin: 10px;
  height: 40px;
  width: 180px;
  border-radius: 40px;
  font-family: "HarmonyOS Sans SC", sans-serif;
  color: #ffffff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-core {
  width: 100%;
  height: calc(100% - 40px);
}

.top-core-search {
  float: right;
  width: 300px;
}

.top-core-search-butt {
  float: right;
  width: 100px;
}

.bottom-core-content-table {
  width: 100%;
  height: 64vh;
}

.content-table-column {
  font-family: "HarmonyOS Sans SC", sans-serif;
  color: #da3131;
  font-size: 16px;
}

.add-form-inline {
  padding: 20px;
}

.add-form-input {
  width: 400px;
  margin-left: 14px;
}

.add-form-input-core {
  border-radius: 20px;
}

:deep(.el-input__wrapper) {
  border-radius: 20px;
  background-color: rgba(116, 95, 255, 0.09);
}

.bottom-core-content-table {
  border-radius: 30px;
  margin-top: 13px;
}
</style>
<template>
  <div class="admin-management-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>管理员</a-breadcrumb-item>
      <a-breadcrumb-item>管理员管理</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-core">
      <div class="top-core">
        <div class="top-core-title">
          <div class="top-core-search-container">
            <a-button @click="dialogVisible=true" class="top-core-butt" type="primary">
              <PlusOutlined/>
              添加管理员
            </a-button>
            <a-button @click="exportExcel" class="top-core-butt" type="primary">
              <ExportOutlined />
              导出到Excel
            </a-button>
          </div>
          <div class="top-core-search-container">
            <a-input v-model:value="fuzzySearchContent" placeholder="请输入" class="top-core-butt top-core-search">
            </a-input>
            <a-button @click="fuzzySearch" class="top-core-butt top-core-search-butt" type="primary">
              <SearchOutlined/>
              搜索
            </a-button>
          </div>
        </div>
      </div>
      <!--  核心表格  -->
      <div class="bottom-core">
        <div class="bottom-core-content">
          <el-table :data="adminUsersPre" class="bottom-core-content-table">
            <el-table-column align="center" header-align="center" class="content-table-column" label="序号"
                             type="index"></el-table-column>
            <el-table-column align="center" header-align="center" prop="userName" label="用户名"/>
            <el-table-column align="center" header-align="center" prop="avatar" label="头像">
              <template #default="scope">
                <img v-if="scope.row.avatar" :src="commonStore.minioURLPre+scope.row.avatar"
                     style="width: 50px;height: 50px" alt="as">
                <UserOutlined v-else/>
              </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" prop="nickName" label="昵称"/>
            <el-table-column align="center" header-align="center" prop="password" label="密码"/>
            <el-table-column align="center" header-align="center" prop="identity" label="身份"/>
            <el-table-column align="center" header-align="center" prop="isDisabled" label="封禁">
              <template #default="scope">
                <el-switch
                    v-model="scope.row.isDisabled"
                    inline-prompt
                    size="large"
                    style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66;"
                    active-text="已封禁"
                    inactive-text="未封禁"
                    @click="disabledEvent(scope.row.isDisabled, scope.row.id)"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" prop="createTime" label="创建时间"/>
            <el-table-column align="center" header-align="center" prop="modifyTime" label="修改时间"/>
            <el-table-column align="center" header-align="center" label="操作">
              <template #default="scope">
                <a-popconfirm
                    title="您真的要删除吗?"
                    placement="left"
                >
                  <el-button type="danger" round plain>删除</el-button>
                  <template #okButton>
                    <el-button type="danger" @click="deleteAdminUser(scope.row.id)" round plain>删除</el-button>
                  </template>
                  <template #cancelButton>
                  </template>
                </a-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!--  添加弹窗  -->
    <el-dialog
        v-model="dialogVisible"
        title="添加管理员"
        width="500"
        draggable="draggable"
        center="center"
        style="border-radius: 20px; background-image:linear-gradient(to top, #ffffff, rgba(190,200,244,0.41))"
    >
      <el-form size="large" :inline="true" label-width="auto" :model="addAdminUser" class="add-form-inline">
        <el-form-item class="add-form-input" label="用户名" prop="userName">
          <el-input class="add-form-input-core" v-model="addAdminUser.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item class="add-form-input" label="昵称" prop="nickName">
          <el-input class="add-form-input-core" v-model="addAdminUser.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item class="add-form-input" label="密码" prop="password">
          <el-input class="add-form-input-core" clas v-model="addAdminUser.password" placeholder="请输入初始密码"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button style="width: 80px;border-radius: 20px" @click="dialogVisible = false">取消</el-button>
          <el-button style="background-color:#745fff; border: #5b72e8; width: 80px;border-radius: 20px" type="primary"
                     @click="submitEvent">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  PlusOutlined,
  ExportOutlined,
  SearchOutlined,
  SmileOutlined,
  UserOutlined
} from '@ant-design/icons-vue';
import {
  addAdminUserRequest,
  deleteUserRequest,
  getAllUser,
  searchUserRequest,
  switchBanStatus
} from "../../../api/UserAPIs.ts";
import {h, ref} from "vue";
import {useCommonStore} from "../../../store/CommonStore.ts";
import {notification} from 'ant-design-vue';
import {ElNotification} from "element-plus";
import {getAdminDataShowRequest} from "../../../api/ExcelExportAPIs.ts";

// 阿里通知
const aliNotification = (message: string, description: string, duration: number) => {
  notification.open(
      {
        message: message,
        description: description,
        duration: duration,
        icon: () => h(SmileOutlined, {style: 'color: #108ee9'})
      }
  )
}
// element通知
const elNotification = (title: string, message: string, position: any) => {
  ElNotification({
    title: title,
    message: message,
    position: position,
  })
}

const adminUsersPre = ref<any>([])
const commonStore = useCommonStore()
getAllUser().then(res => {
  adminUsersPre.value = res.data.data;
})
/**
 * 切换封禁状态
 * @param isDisabled
 * @param id
 */
const disabledEvent = (isDisabled: any, id: any,) => {
  switchBanStatus(id, isDisabled).then(res => {
    if (res.data.code === 200) {
      aliNotification("成功", "封禁状态切换成功", 2)
    }
  })
}
// 添加管理员弹窗
const dialogVisible = ref(false)

// 添加管理员模型
const addAdminUser = ref({
  userName: '',
  password: '',
  nickName: '',
})

/**
 * 提交添加管理员
 */
const submitEvent = () => {
  addAdminUserRequest(addAdminUser.value).then(res => {
    if (res.data.code === 200) {
      aliNotification("成功", "添加管理员成功", 2)
      dialogVisible.value = false
      getAllUser().then(res => {
        adminUsersPre.value = res.data.data;
      })
    } else {
      aliNotification("失败", res.data.msg, 2)
    }
  })
}

/**
 * 删除管理员
 * @param id
 */
const deleteAdminUser = (id: any) => {
  deleteUserRequest(id).then(res => {
    if (res.data.code === 200) {
      aliNotification("成功", "删除管理员成功", 2)
      getAllUser().then(res => {
        adminUsersPre.value = res.data.data;
      })
    } else {
      aliNotification("失败", res.data.msg, 2)
    }
  })
}

// 模糊搜索
const fuzzySearchContent = ref('')
const fuzzySearch = () => {
  if (fuzzySearchContent.value === '') {
    getAllUser().then(res => {
      adminUsersPre.value = res.data.data;
    })
  }
  searchUserRequest(fuzzySearchContent.value).then(res => {
    if (res.data.code === 200) {
      adminUsersPre.value = res.data.data
      elNotification("成功", "搜索成功", 'top-left')
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
}

// 导出数据到excel
const exportExcel = () => {
  getAdminDataShowRequest()
  elNotification("成功", "数据导出成功", 'top-left')
}
</script>