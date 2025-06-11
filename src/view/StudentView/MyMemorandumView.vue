<script setup lang="ts">
import TopBar from "../../components/TopBar.vue";
import {onMounted, ref, h} from "vue";
import {getBannerVideo} from "../../api/MinIOAPIs.ts";
import {useCommonStore} from "../../store/CommonStore.ts";
import AuroraBackgroundComp from "../../components/AnimationComp/AuroraBackgroundComp.vue";
import {
  DeleteOutlined,
  CopyOutlined, SmileOutlined, DownCircleOutlined
} from '@ant-design/icons-vue';
import {addMemorandum, deleteMemorandumRequest, getMemorandumRequest} from "../../api/MemorandumAPIs.ts";
import FooterComp from "../../components/FooterComp.vue";
import {notification} from "ant-design-vue";

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

interface Note {
  id: number;
  createTime: string;
  content: string;
  color?: string;  // 添加可选的颜色属性
}

const getRandomMacaronColor = () => {
  const colors = [
    'rgba(255,211,182,0.77)', 'rgba(255,170,165,0.77)', 'rgba(123,188,255,0.77)',
    'rgba(255,195,160,0.77)', 'rgba(255,103,125,0.77)',
    'rgba(212,165,165,0.77)', 'rgba(244,178,241,0.77)', 'rgba(248,195,205,0.77)',
    'rgba(242,213,204,0.77)', 'rgba(242,232,201,0.77)',
    'rgba(232,243,214,0.77)', 'rgba(211,228,205,0.77)', 'rgba(187,222,214,0.77)',
    'rgba(181,234,215,0.77)', 'rgba(199,206,234,0.77)',
    'rgba(223,231,253,0.77)', 'rgba(179,213,218,0.77)', 'rgba(226,207,196,0.77)',
    'rgba(245,230,232,0.77)', 'rgba(255,245,228,0.77)'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const NavigationBarFixed = ref(true);
const BannerVideoURL = ref('');
const hoverNote = ref<number | null>(null);
const notes = ref<Note[]>([{
  id: 1,
  createTime: '',
  content: '今天天气不错',
  color: ''
}
]);
const newNote = ref('')

onMounted(() => {
  getBannerVideo().then((res) => {
    BannerVideoURL.value = useCommonStore().minioURLPre + res.data.data
  })
});

// 获取所有便签
const getAllNotes = () => {
  getMemorandumRequest(localStorage.getItem('uid')).then(res => {
    notes.value = res.data.data
    for (const note of notes.value) {
      note.color = getRandomMacaronColor();
    }
  })
}
onMounted(() => {
  getAllNotes()
})

// 删除便签
const deleteNote = (nid: any) => {
  deleteMemorandumRequest(nid).then(res => {
    if (res.data.code === 200) {
      getAllNotes()
      aliNotification('删除成功', '便签已从列表中删除', 2)
    }
  })
}

// 添加便签
const addNote = () => {
  if (newNote.value) {
    // 封装
    const memorandumModel = {
      userId: localStorage.getItem('uid'),
      content: newNote.value
    }
    addMemorandum(memorandumModel).then(res => {
      if (res.data.code === 200) {
        getAllNotes()
        aliNotification('添加成功', '便签已添加到列表', 2)
        newNote.value = ''
      }
    })
  }
};
// 复制便签
const copyNote = (content: any) => {
  navigator.clipboard.writeText(content).then(() => {
    aliNotification('复制成功', '便签内容已复制到剪贴板', 2)
  }).catch(() => {
    aliNotification('复制失败', '无法复制便签内容', 2)
  })
}

// 再装载
const reNote = (content: any) => {
  newNote.value = content
}
</script>

<template>
  <div class="new-core">
    <div class="memorandum-core">
      <AuroraBackgroundComp style="position: absolute;z-index: -1;height: 100vh"/>
      <div class="stu-header">
        <TopBar :fixedState="NavigationBarFixed" style="position: absolute"/>
        <video autoplay muted loop class="banner-video" disablePictureInPicture :key="BannerVideoURL">
          <source :src="BannerVideoURL" type="video/mp4">
        </video>
      </div>
      <div class="notes-container">
        <div class="note-card" v-for="(note, index) in notes" :key="note.id" :style="{
                backgroundColor: note.color,
                animationDelay: `${index * 0.1}s`
            }" @mouseenter="hoverNote = note.id" @mouseleave="hoverNote = null">
          <h3>{{ note.createTime }}</h3>
          <span style="word-break: break-word;">{{ note.content }}</span>
          <div style="margin-top: 30px;">
            <button class="delete-button butt-re" @click="reNote(note.content)">
              <DownCircleOutlined/>
            </button>
            <button class="delete-button butt-copy" @click="copyNote(note.content)">
              <CopyOutlined/>
            </button>
            <button class="delete-button" @click="deleteNote(note.id)">
              <DeleteOutlined/>
            </button>
          </div>

        </div>
      </div>
      <div class="add-note-container">
        <div class="add-note">
          <textarea v-model="newNote" placeholder="来灵感了！" class="note-textarea"></textarea>
          <button @click="addNote" class="add-button">添加笔记</button>
        </div>
      </div>
      <!--  脚丫子  -->
      <FooterComp/>
    </div>
  </div>
</template>

<style scoped>
.new-core {
  width: 100%;
}

.memorandum-core {
  height: 100%;
  background-image: linear-gradient(120deg, rgba(189, 132, 250, 0.26) 0%, rgba(244, 143, 146, 0) 100%);
}

.stu-header {
  height: 110px;
  object-fit: cover;
  background-color: rgba(214, 222, 255, 0);
}

.banner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 0 80px 80px;
  filter: blur(10px);
}

.notes-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 30px;
  margin-top: 20px;
}

/* 修改note-card样式，移除固定颜色 */
.note-card {
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 150px;
  opacity: 0;
  transform: translateY(50px);
  animation: slideUp 0.5s ease-out forwards;
  position: relative;
  /* 添加相对定位 */
}

.delete-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 68px;
  height: 28px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.7);
  border: solid 1px rgba(154, 154, 154, 0.51);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-button:hover {
  background: rgba(255, 0, 0, 0.48);
  transform: scale(1.1);
}

.butt-copy {
  right: 90px;
}

.butt-re {
  right: 170px;
}

.butt-re:hover {
  background: rgba(0, 34, 255, 0.48);
}

.butt-copy:hover {
  background: rgba(67, 255, 0, 0.48);
  transform: scale(1.1);
}

.delete-button svg {
  color: #ff4d4f;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.note-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.add-note-container {
  grid-column: 1 / -1;
  padding: 0 30px 30px;
  display: flex;
  justify-content: center;
}

.add-note {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  width: 750px;
}

.add-note:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.note-textarea {
  min-height: 120px;
  resize: vertical;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s;
  background: rgba(255, 255, 255, 0.7);
}

.note-textarea:focus {
  outline: none;
  border-color: #4c7eaf;
  box-shadow: 0 0 0 2px rgba(76, 149, 175, 0.2);
}

.add-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #7bbcff, #5aa1e8);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #5aa1e8, #4a8fd6);
}

.add-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
