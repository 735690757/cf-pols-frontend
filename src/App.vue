<script setup lang="ts">

console.log(`%c %c POLS-CF by 诗岸梦行舟 %c 版本：1.0.0 %c 因为我们是为人民服务的，所以，我们如果有缺点就不怕别人批评。———— 毛泽东`,
    'color: #3eaf7c; font-size: 16px;line-height:30px;',
    'background: #35495e; padding: 4px; border-radius: 3px 0 0 3px; color: #fff',
    'background: #41b883; padding: 4px; border-radius: 0 3px 3px 0; color: #fff',
    'color: black; font-size: 14px; line-height:30px;',
);
</script>

<template>
  <div class="box">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </RouterView>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
