<style scoped>
.comment-core {
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
</style>

<template>
  <div class="comment-core">
    <a-breadcrumb style="margin: 10px 0">
      <a-breadcrumb-item>教师</a-breadcrumb-item>
      <a-breadcrumb-item>课程评论</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="core-content">
      <div class="search-bar">
        <a-input-search v-model:value="searchText" placeholder="搜索评论内容" style="width: 300px"
                        @search="handleSearch"/>
        <a-select v-model:value="filterStatus" style="width: 150px; margin-left: 10px" @change="handleFilterChange">
          <a-select-option value="all">全部状态</a-select-option>
          <a-select-option value="published">已发布</a-select-option>
          <a-select-option value="rejected">已撤销</a-select-option>
        </a-select>
      </div>

      <a-table :columns="columns" :data-source="commentList" row-key="id" :pagination="{ pageSize: 5 }"
               style="margin-top: 20px">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" danger @click="handleDelete(record)">
                删除
              </a-button>
              <a-button type="link" @click="handleRecover(record)">
                恢复
              </a-button>
            </a-space>
          </template>
          <template v-else-if="column.key === 'isDelete'">
            <a-tag :color="getStatusColor(record.isDelete)">
              {{ getStatusText(record.isDelete) }}
            </a-tag>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted, h} from 'vue';
import {deleteCommentRequest, getTeacherCommentRequest, recoverCommentRequest} from "../../../api/CommentAPIs.ts";
import {notification} from "ant-design-vue";
import {SmileOutlined} from "@ant-design/icons-vue";

const searchText = ref('');
const filterStatus = ref('all');

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return '已发布';
    case 1:
      return '已撤销';
  }
};

const getStatusColor = (status: number) => {
  if (status == 0) {
    return 'green';
  }
  return 'red';
};


const columns = [
  {
    title: '评论者',
    dataIndex: 'userName',
    key: 'userName',
    align: 'center'
  }, {
    title: '回复目标',
    dataIndex: 'target',
    key: 'target',
    align: 'center'
  },
  {
    title: '评论内容',
    dataIndex: 'content',
    key: 'content',
    ellipsis: true,
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'isDelete',
    key: 'isDelete',
    align: 'center'
  },
  {
    title: '评论时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center'
  },
  {
    title: '操作',
    key: 'action',
    align: 'center'
  },
];

const commentList = ref([{
  id: 1,
  studentName: 'John Brown',
  content: 'This is a comment.',
  status: 'published',
  createTime: '2023-07-01',
}]);
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
const handleSearch = () => {
  const uid = localStorage.getItem('uid');
  getTeacherCommentRequest(uid).then((res) => {
    if (res.data.code === 200) {
      let filteredData = res.data.data;
      if (searchText.value.trim()) {
        filteredData = filteredData.filter(item =>
            item.content.includes(searchText.value.trim())
        );
      }
      commentList.value = filteredData;
    }
  });
};

const handleFilterChange = (value: string) => {
  const uid = localStorage.getItem('uid');
  getTeacherCommentRequest(uid).then((res) => {
    if (res.data.code === 200) {
      let filteredData = res.data.data;
      if (value !== 'all') {
        const targetStatus = value === 'published' ? 0 : 1;
        filteredData = filteredData.filter(item => item.isDelete === targetStatus);
      }
      commentList.value = filteredData;
    }
  });
};

const handleRecover = (record: any) => {
  recoverCommentRequest(record.id).then((res) => {
    if (res.data.code === 200) {
      aliNotification('回复成功', '回复成功', 2)
      getTeacherCommentRequest(localStorage.getItem('uid')).then((res) => {
        commentList.value = res.data.data
      })
    }
  })
}

const handleDelete = (record: any) => {
  deleteCommentRequest(record.id).then((res) => {
    if (res.data.code === 200) {
      let uid = localStorage.getItem('uid')
      aliNotification('删除成功', '删除成功', 2)
      getTeacherCommentRequest(uid).then((res) => {
        commentList.value = res.data.data
      })
    }
  })
};

onMounted(() => {
  const uid = localStorage.getItem('uid');
  getTeacherCommentRequest(uid).then((res) => {
    if (res.data.code === 200) {
      commentList.value = res.data.data;
    }
  });
})
</script>
