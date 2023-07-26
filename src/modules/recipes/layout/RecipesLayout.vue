<template>
  <section class="recipes-hero">
    <img 
      src="@/assets/backgrounds/rachel-park-hrlvr2ZlUNk-unsplash.jpg" 
      alt="Food"
      class="recipes-hero__background">
    <div class="recipes-hero__content">
      <h1 class="heading-primary text-center text-white">¿Qué deseas preparar hoy?</h1>
      <div class="form-group">
        <input 
          type="text" 
          class="form-input form-input--md" 
          placeholder="Buscador">
        <p class="text-white text-bold mt-sm">Tendencias: <span class="text-normal">ensaladas, cócteles, desayunos, cenas rápidas, vegetarianas</span></p>
      </div>
    </div>
  </section>
  <RecipesHeader/>
  <section 
    class="recipe-categories"
    v-if="categories"
  >
    <h1 class="heading-primary text-bold text-primary mb-md text-center">Descubre nuevos intereses</h1>
    <div class="recipe-categories__cards">
      <article 
        class="card-recipe-category"
        v-for="{ category_id, category, category_cover } in showCategories"
        :key="category_id"
      >
        <img 
          :src="category_cover" 
          :alt="category" 
          class="card-recipe-category__image">
        <h2 
          class="heading-secondary text-white"
        >
          {{ category }}
        </h2>
      </article>
    </div>
    <button 
      v-if="isShowAllRecipes != true"
      class="btn btn--primary mt-md ml-auto"
      @click="isShowAllRecipes = true"
    >
      Mostrar más
    </button>
    <button 
      v-else
      class="btn btn--primary mt-md ml-auto"
      @click="isShowAllRecipes = false"
    >
      Mostrar menos
    </button>
    <h1 class="heading-primary text-bold text-primary mt-lg text-center">Explora las recetas de la comunidad</h1>
  </section>
  <div class="recipes-main">
    <RouterView/>
  </div>

  <Transition v-if="showNotification">
    <ToastNotification 
      :notification="notification"
    />
  </Transition>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    components: {
      RecipesHeader: defineAsyncComponent(() => import(/* RecipesHeader */'@/modules/recipes/components/RecipesHeader')),
      ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */'@/modules/shared/components/ToastNotification'))
    },
    data() {
      return {
        categories: null,
        notification: {
          type: null,
          title: null,
          description: null,
          show: false
        },
        showNotification: false,
        isShowAllRecipes: false
      }
    },
    methods: {
        async getCategories(){
            try {
                const response = await fetch('https://recipehub-api.onrender.com/category')

                if(!response.ok){
                    const { message } = await response.json()
                    throw new Error(message)
                }

                this.categories = await response.json()
            } catch (error) {
                this.showNotification  = true
                this.notification.show = true
                this.notification.type = 'error'
                this.notification.title = error.message
                this.notification.description = 'No se pudieron cargar las categorías de las recetas, intenta de nuevo más tarde.'

                setTimeout(() => {
                    this.$router.push({ name: 'home' })
                }, 5500);
            }
        },
    },
    computed: {
      showCategories(){
        return this.isShowAllRecipes ? this.categories : this.categories.slice(0, 15)
      }
    },
    created(){
        this.getCategories()
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/recipes';
@use '@/sass/components/form';
@use '@/sass/components/card';
@use '@/sass/components/button';
</style>