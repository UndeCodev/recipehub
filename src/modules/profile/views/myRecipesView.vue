<template>
  <h1 
    v-if="!recipesByAuthor"
    class="heading-primary text-primary d-grid align-content-center text-center"
    style="min-height: 20rem;"
  >
    Aún no tienes recetas publicadas
    <span class="heading-tertiary text-normal mt-sm">Ve a la sección "publicar nueva receta" y comparte tus conocimientos con la comunidad.</span>
  </h1>
  
  <section 
    v-else
    class="my-recipes-layout"
  >
    <RecipeCard
      v-for="recipe in recipesByAuthor"
      :key="recipe._id"
      :recipe="{
        recipeCover: recipe.images.photoURL,
        title: recipe.title,
        category: recipe.category.category,
        totalTime: recipe.totalTime,
        author: recipe.author.name,
        rolAuthor: recipe.author.rol.name,
        authorPicture: recipe.author.images.photoURL
      }"
    />
  </section>  

  <!-- <Transition v-if="showNotification"> -->
    <!-- <ToastNotification  -->
      <!-- :notification="notification" -->
    <!-- /> -->
  <!-- </Transition> -->
</template>

<script>
import { defineAsyncComponent, onMounted } from 'vue'
import useRecipes from '@/modules/recipes/composables/useRecipes';
import useNotification from '@/modules/shared/composables/useNotification';

export default {
  components: {
    RecipeCard: defineAsyncComponent(() => import(/* RecipeCard */'@/modules/recipes/components/recipeCard')),
    ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */ '@/modules/shared/components/ToastNotification'))
  },
  setup() {
    // Composables  
    const { 
      getRecipesByAuthor,
      recipesByAuthor
    } = useRecipes()

    // Methods

    // Reactive states

    // Lifecycle hooks
    onMounted(async() => {
      await getRecipesByAuthor()

      if(!recipesByAuthor.value.length) recipesByAuthor.value = null
    })

    return {
      recipesByAuthor
    }
  },
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/myRecipes';
</style>