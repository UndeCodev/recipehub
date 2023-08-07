<template>
  <section class="recipes-hero">
    <img src="@/assets/backgrounds/rachel-park-hrlvr2ZlUNk-unsplash.jpg" alt="Food" class="recipes-hero__background">
    <div class="recipes-hero__content">
      <h1 class="heading-primary text-center text-white">¿Qué deseas preparar hoy?</h1>
      <div class="form-group">
        <input type="text" class="form-input form-input--md" placeholder="Buscador">
        <p class="text-white text-bold mt-sm">Tendencias: <span class="text-normal">ensaladas, cócteles, desayunos, cenas
            rápidas, vegetarianas</span></p>
      </div>
    </div>
  </section>
  <RecipesHeader />
  <section class="recipe-categories" v-if="categories">
    <h1 class="heading-primary text-bold text-primary mb-md text-center">Descubre nuevos intereses</h1>
    <div class="recipe-categories__cards">
      <article class="card-recipe-category" v-for="{ _id, category, photoURL } in categories"
        :key="_id">
        <img :src="photoURL" :alt="category" class="card-recipe-category__image">
        <h2 class="heading-secondary text-white">
          {{ category }}
        </h2>
      </article>
    </div>
    <!-- <button v-if="isShowAllRecipes != true" class="btn btn--primary mt-md ml-auto" @click="isShowAllRecipes = true">
      Mostrar más
    </button>
    <button v-else class="btn btn--primary mt-md ml-auto" @click="isShowAllRecipes = false">
      Mostrar menos
    </button> -->
    <h1 class="heading-primary text-bold text-primary mt-lg text-center">Explora las recetas de la comunidad</h1>
  </section>
  <div class="recipes-main">
    <RouterView />
  </div>

  <Transition v-if="showNotification">
    <ToastNotification :notification="notification" />
  </Transition>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import useRecipes from '../composables/useRecipes'
import useNotification from '@/modules/shared/composables/useNotification'

export default {
  components: {
    RecipesHeader: defineAsyncComponent(() => import(/* RecipesHeader */'@/modules/recipes/components/RecipesHeader')),
    ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */'@/modules/shared/components/ToastNotification'))
  },
  setup() {
    const { 
        notification,
        showNotification,
        toastNotification
    } = useNotification()

    const { 
      getRecipeCategories,
      categories 
    } = useRecipes()

    const onLoadCategories = async () => {
      const { ok, message } = await getRecipeCategories()

      if (!ok) toastNotification('error', 'Error al cargar las categorías.', message)
    }

    onLoadCategories()

    return {
      categories,
      showNotification,
      notification
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/recipes';
@use '@/sass/components/form';
@use '@/sass/components/card';
@use '@/sass/components/button';
</style>