<style scoped>
.student-management-core {
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

.top-core-search {
  float: right;
  width: 300px;
}

.top-core-search-butt {
  float: right;
  width: 100px;
}

.bottom-core {
  width: 100%;
  height: calc(100% - 40px);
}

.bottom-core-content-table {
  width: 100%;
  height: 63vh;
}

.bottom-core-content-table {
  border-radius: 30px;
  margin-top: 13px;
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

.buyBlock {
  width: 70%;
}
</style>
<template>
  <div class="student-management-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>管理员</a-breadcrumb-item>
      <a-breadcrumb-item>学生管理</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-core">
      <div class="top-core">
        <div class="top-core-title">
          <div class="top-core-search-container">
            <a-button @click="dialogVisible=true" class="top-core-butt" type="primary">
              <PlusOutlined/>
              添加学生
            </a-button>
            <a-button @click="exportExcel" class="top-core-butt" type="primary">
              <ExportOutlined/>
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
      <div class="bottom-core">
        <div class="bottom-core-content">
          <el-table :data="studentPre" class="bottom-core-content-table">
            <el-table-column align="center" header-align="center" class="content-table-column" label="序号"
                             type="index"></el-table-column>
            <el-table-column align="center" header-align="center" prop="userName" label="用户名"/>
            <el-table-column align="center" header-align="center" prop="avatar" label="头像">
              <template style="width: 100%; height: 100%; display: flex; justify-items: center; align-items: center;"
                        #default="scope">
                <div style="width: 100%; height: 100%; display: flex; justify-items: center; align-items: center;"
                     v-if="scope.row.avatar">
                  <img :src="commonStore.minioURLPre+scope.row.avatar"
                       style="width: 50px;height: 50px;"
                       alt="as">
                </div>
                <div v-else>
                  <UserOutlined/>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" prop="nickName" label="昵称"/>
            <el-table-column align="center" header-align="center" prop="password" label="密码"/>
            <el-table-column align="center" header-align="center" prop="fund" label="资金"/>
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
            <el-table-column align="center" header-align="center" label="操作" width="200">
              <template #default="scope">
                <el-button type="primary" @click="showModalBuy(scope.row.id)" round plain>购买记录</el-button>
                <a-popconfirm
                    title="您真的要删除吗?"
                    placement="left"
                >
                  <el-button type="danger" round plain>删除</el-button>
                  <template #okButton>
                    <el-button type="danger" @click="deleteEvent(scope.row.id)" round plain>删除</el-button>
                  </template>
                  <template #cancelButton>
                  </template>
                </a-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              style="margin-top: 4px;"
              size="default"
              background
              layout="prev, pager, next"
              :total="pagination.allPage"
              class="mt-4"
              @current-change="handleCurrentChange"
              v-model:current-page="pagination.currentPage"
              v-model:page-size="pagination.sizePage"
          />
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
      <el-form size="large" :inline="true" label-width="auto" :model="addStudentUser" class="add-form-inline">
        <el-form-item class="add-form-input" label="用户名" prop="userName">
          <el-input class="add-form-input-core" v-model="addStudentUser.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item class="add-form-input" label="昵称" prop="nickName">
          <el-input class="add-form-input-core" v-model="addStudentUser.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item class="add-form-input" label="金额" prop="password">
          <el-input class="add-form-input-core" clas v-model="addStudentUser.fund" placeholder="请输入初始密码"/>
        </el-form-item>
        <el-form-item class="add-form-input" label="密码" prop="password">
          <el-input class="add-form-input-core" clas v-model="addStudentUser.password" placeholder="请输入初始密码"/>
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
    <!-- 已购课程弹窗 -->
    <a-modal v-model:open="openBuy" style="width: 70%;" class="buyBlock" title="学生购买记录">
      <a-table :scroll="{  y: 340 }" :dataSource="stuCourseList" :columns="columns" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'score'">
            <a-rate :value="record.score" disabled/>
          </template>
          <template v-if="column.dataIndex === 'cover'">
            <div style="float: right">
              <img :src="commonStore.minioURLPre+record.cover"
                   style="width: 150px"
                   alt="as">
            </div>
          </template>
          <template v-if="column.dataIndex === 'avatar'">
            <div style="float: right">
              <img :src="commonStore.minioURLPre+record.avatar"
                   style="width: 50px;height: 50px;border-radius: 100px"
                   alt="as">
            </div>
          </template>
        </template>
      </a-table>
      <template #footer></template>
      <template #closeIcon></template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {ExportOutlined, PlusOutlined, SearchOutlined, SmileOutlined, UserOutlined} from "@ant-design/icons-vue";
import {h, reactive, ref} from "vue";
import {
  addStudentUserRequest, deleteUserRequest,
  getAllStudentUserByPage,
  searchStudentUserRequest,
  switchBanStatus
} from "../../../api/UserAPIs.ts";
import {notification} from "ant-design-vue";
import {ElNotification} from "element-plus";
import {useCommonStore} from "../../../store/CommonStore.ts";
import {getBuyCourseByUidRequest} from "../../../api/OrderAPIs.ts";
import {getStudentDataShowRequest} from "../../../api/ExcelExportAPIs.ts";

// element通知
const elNotification = (title: string, message: string, position: any) => {
  ElNotification({
    title: title,
    message: message,
    position: position,
  })
}

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
const commonStore = useCommonStore()

const studentPre = ref([])

// 添加学生员弹窗
const dialogVisible = ref(false)

// 模糊搜索
const fuzzySearchContent = ref('')
const fuzzySearch = () => {
  searchStudentUserRequest(fuzzySearchContent.value).then((res) => {
    if (res.data.code === 200) {
      studentPre.value = res.data.data
      elNotification("成功", "搜索成功", 'top-left')
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
}

/**
 * 切换封禁状态
 * @param isDisabled
 * @param id
 */
const disabledEvent = (isDisabled: any, id: any,) => {
  switchBanStatus(id, isDisabled).then(res => {
    if (res.data.code === 200) {
      aliNotification("成功", "封禁状态切换成功", 2)
      handleCurrentChange()
    }
  })
}

// 添加学生模型
const addStudentUser = ref({
  userName: '',
  password: '',
  nickName: '',
  fund: ''
})

// 分页模型
const pagination = reactive({
  currentPage: 1,
  sizePage: 7,
  allPage: 100,
})
/**
 * 分页切换事件
 */
const handleCurrentChange = () => {
  getAllStudentUserByPage(pagination).then((res) => {
    studentPre.value = res.data.data.userList;
  })
}
/**
 * 初始化数据
 */
getAllStudentUserByPage(pagination).then((res) => {
  studentPre.value = res.data.data.userList;
  pagination.allPage = res.data.data.totalCount;
})

/**
 * 提交事件
 */
const submitEvent = () => {
  addStudentUserRequest(addStudentUser.value).then(res => {
    if (res.data.code === 200) {
      dialogVisible.value = false
      elNotification("成功", "添加学生成功", 'top-left')
      handleCurrentChange()
    } else {
      elNotification("失败", res.data.msg, 'top-left')
    }
  })
}

/**
 * 删除事件
 * @param id
 */
const deleteEvent = (id: any) => {
  deleteUserRequest(id).then(res => {
    if (res.data.code === 200) {
      aliNotification("成功", "删除学生成功", 2)
      handleCurrentChange()
    }
  })
}

// 已购课程弹窗，以及代码区
const openBuy = ref<boolean>(false);
const stuCourseList = ref([{
  avatar: '',
  courseId: '',
  cover: '',
  createTime: '',
  nickName: '',
  score: '',
  teacherId: '',
  title: ''
}])
const showModalBuy = (userId: any) => {
  console.log(userId)
  openBuy.value = true
  getBuyCourseByUidRequest(userId).then((res) => {
    stuCourseList.value = res.data.data
  })
}

const columns = [
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    align: 'center'
  },
  {
    title: '课程名',
    dataIndex: 'title',
    key: 'title',
    align: 'center'
  }, {
    title: '授课',
    dataIndex: 'avatar',
    key: 'avatar',
    align: 'right',
    width: 100,

  }, {
    title: '教师',
    dataIndex: 'nickName',
    key: 'nickName',
    width: 150,
  }, {
    title: '评分',
    key: 'score',
    dataIndex: 'score',
    align: 'center'
  }, {
    title: '购买时间',
    key: 'createTime',
    dataIndex: 'createTime',
    align: 'center'
  }
]

// 学生用户导出到Excel
const exportExcel = () => {
  getStudentDataShowRequest()
  elNotification("成功", "数据导出成功", 'top-left')
}
</script>