<template>
    <section 
        v-if="recipes"
        class="recipes-layout"
    >
        <RecipeCard
            v-for="recipe in recipes"
            :key="recipe._id"
            :recipe="{
                id: recipe._id,
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
</template>

<script>
import { defineAsyncComponent, onMounted } from 'vue'
import useRecipes from '../composables/useRecipes'

export default {
    components: {
        RecipeCard: defineAsyncComponent(() => import(/* RecipeCard */'@/modules/recipes/components/recipeCard')),
    },
    setup() {
        // Composables 
        const { 
            getRecipes,
            recipes 
        } = useRecipes()

        // Methods

        // Reactive states

        // Lifecycle Hooks
        onMounted(async() => {
            await getRecipes()
        })

        return {
            recipes,
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/recipes';
</style>