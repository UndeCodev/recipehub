<template>
  <AppHeader/>
  <main class="main">
    <RouterView/>
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

<style lang="scss">
</style>