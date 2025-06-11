<script setup lang="ts">
// 组件参数接受
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  more: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="card">
    <div class="card__body">{{ props.content }}</div>
    <strong> {{props.title}} </strong>
    <span>{{ props.more }}</span>
  </div>


</template>

<style scoped>
.card {
  --bg: rgba(247, 247, 248, 0.44);
  --hover-bg: #ffe5f4;
  --hover-text: #e50087;
  text-align: center;
  background: var(--bg);
  padding: 1.5em;
  padding-block: 1.8em;
  position: relative;
  overflow: hidden;
  transition:
      0.3s cubic-bezier(0.6, 0.4, 0, 1),
      transform 0.15s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  color: black;
  width: 17vw;
  height: 90px;
  margin: 20px;
  border-radius: 30px;
  cursor: pointer;
  border: #bdbdbd solid 1px;
}
.card:hover {
  transform: scale(1.05);
}

.card__body {
  color: #464853;
  font-size: 1em;
}

.card > :not(span) {
  transition: 0.3s cubic-bezier(0.6, 0.4, 0, 1);
}

.card > strong {
  display: block;
  font-size: 1.4rem;
  letter-spacing: -0.035em;
}

.card span {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--hover-text);
  border-radius: 5px;
  font-weight: bold;
  top: 100%;
  transition: all 0.3s cubic-bezier(0.6, 0.4, 0, 1);
}

.card:hover span {
  top: 0;
  font-size: 1.2em;
}

.card:hover {
  background: var(--hover-bg);
}

.card:hover > div,
.card:hover > strong {
  opacity: 0;
}

</style>