<template>
  <section class="recipes-header">
    
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    components: {
      CustomLink: defineAsyncComponent(() => import(/* CustomLink */ '@/components/CustomLink')),
    },
    data() {
        return {
            links: [
                { to: 'home', name: 'Inicio', icon: 'house' },
                { to: 'recipes', name: 'Recetas', icon: 'utensils' },
                { to: 'about', name: 'Acerca de', icon: 'message' },
            ],
        }
    },
    
}
</script>

<style lang="scss" scoped>
@use '@/sass/components/recipeHeader';
</style>