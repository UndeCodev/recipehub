<template>
    <section class="auth-layout">
        <img 
            v-if="screenWidth > 768"
            src="https://images.unsplash.com/photo-1529940122574-0096689bc5cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
            alt="Food" 
            class="auth-layout__photo">
        <div class="auth-layout__forms">        
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
    </section>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const screenWidth = ref(null);
    
    const handleResizeWidth = () => {
      screenWidth.value = window.innerWidth;
    };
    
    onMounted(() => {
      screenWidth.value = window.innerWidth;
      window.addEventListener('resize', handleResizeWidth);
    });
    
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResizeWidth);
    });
    
    return { screenWidth };
  }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/authLayout';
</style>