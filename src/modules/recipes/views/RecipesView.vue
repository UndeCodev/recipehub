<template>
    <section 
        v-if="recipes"
        class="recipes-layout"
    >
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe._id"
      :recipe="{
        recipeCover: recipe.images.photoURL,
        title: recipe.title,
        category: recipe.category.category,
        totalTime: recipe.totalTime,
        author: recipe.author?.name,
        rolAuthor: recipe.author?.rol.name,
        authorPicture: recipe.author?.images.photoURL
      }"
    />
    </section>
    <Transition v-if="showNotification">
    <ToastNotification 
      :notification="notification"
    />
  </Transition>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import useRecipes from '../composables/useRecipes'
import useNotification from '@/modules/shared/composables/useNotification'

export default {
    components: {
        RecipeCard: defineAsyncComponent(() => import(/* RecipeCard */'@/modules/recipes/components/recipeCard')),
        ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */'@/modules/shared/components/ToastNotification')),
    },
    setup() {
        
        const { 
            notification,
            showNotification,
            toastNotification
        } = useNotification()

        const { 
            getRecipes,
            recipes 
        } = useRecipes()

        const onLoadRecipes = async() => {
            const { ok, message } = await getRecipes()

            if(!ok) toastNotification('error', 'Error al cargar las recetas.', message)
        }

        onLoadRecipes()
        

        return {
            recipes,
            notification,
            showNotification
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/recipes';
</style>