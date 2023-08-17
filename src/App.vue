<template>
  <AppHeader/>
  <main class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    AppHeader: defineAsyncComponent(() => import(/* AppHeader */'@/components/AppHeader'))
  }
}
</script>
