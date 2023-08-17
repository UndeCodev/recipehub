<template>
    <h1 v-if="!recipes" class="text-center">No hay recetas con esta categoría</h1>
    <section 
        v-else
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
import { defineAsyncComponent, onMounted, watch } from 'vue'
import useRecipes from '../composables/useRecipes'

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        RecipeCard: defineAsyncComponent(() => import(/* RecipeCard */'@/modules/recipes/components/recipeCard')),
    },
    setup(props){
        // Composables
        const { 
            recipes,
            getRecipesByCategory
        } = useRecipes()

        onMounted(async() => {
            await getRecipesByCategory(props.id)
        })

        watch(
            () => props.id,
            async() => {
                await getRecipesByCategory(props.id)
            }
        )

        return {
            recipes
        }
    }
}
</script>

<style>

</style>