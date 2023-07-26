<template>
    <section 
        v-if="recipes"
        class="recipes-layout"
    >
        <RecipeCard
            v-for="recipe in recipes"
            class="cursor-pointer"
            @click="$router.push({ name: 'recipe-by-id', params: { id: recipe.recipe_id } })"
            :key="recipe.user_id"
            :recipe="{
                recipeCover: recipe.recipeCover,
                title: recipe.title,
                category: recipe.category,
                totalTimePrep: recipe.totalTime,
                author: recipe.author,
                rolAuthor: recipe.rolAuthor,
                authorPicture: recipe.authorPicture
            }"
        />
    </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    components: {
        RecipeCard: defineAsyncComponent(() => import(/* RecipeCard */'@/modules/recipes/components/recipeCard'))
    },
    data() { 
        return { 
            recipes: null
        }
    },  
    methods: {
        async getRecipes(){
            try {
                const response = await fetch(`https://recipehub-api.onrender.com/recipes-cards`)
                
                if(!response.ok){
                    const { message } = await response.json()
                    throw new Error(message)
                }

                this.recipes = await response.json()
            } catch (error) {
                if(error.message) this.recipes = null 
            }
        }
    },
    created() {
        this.getRecipes()
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/recipes';
</style>