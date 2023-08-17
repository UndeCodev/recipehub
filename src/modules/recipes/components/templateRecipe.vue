<template>
    <section 
        v-if="recipeById"
        class="template-recipe"
    >
        <div class="template-recipe-group template-recipe-group--2-columns">
            <div class="template-recipe-group">
                <img 
                    :src="recipeById.images.photoURL" 
                    alt=""
                    class="template-recipe__coverRecipe">
            </div>
            <div class="template-recipe-group align-content-center">
                <h1 class="heading-primary mb-sm">{{ recipeById.title }}</h1>
                <p class="text-normal">
                    {{ recipeById.description }}
                </p>
                <div class="template-recipe__information">
                    <h2 
                        class="heading-tertiary text-bold d-grid"
                        v-for="{ type, time } in recipeById.times"
                        :key="type"
                    >
                        {{ type }}
                        <span class="text-normal">{{ time }}</span>
                    </h2>
                    <h2 class="heading-tertiary text-bold d-grid">
                        Tiempo total
                        <span class="text-normal">{{ recipeById.totalTime }}</span>
                    </h2>
                    <h2 class="heading-tertiary text-bold d-grid">
                        Categoría
                        <span class="text-normal">{{ recipeById.category.category }}</span>
                    </h2>
                    <h2 class="heading-tertiary text-bold d-grid">
                        Raciones
                        <span class="text-normal">{{ recipeById.servings }}</span>
                    </h2>
                    <h2 
                        class="heading-tertiary text-bold d-grid"
                        v-if="recipeById.yield"
                    >
                        Rendimiento
                        <span class="text-normal">{{ recipeById.yield }}</span>
                    </h2>
                </div>
                <p class="text-bold">
                    Receta por:
                    <span class="text-normal">
                        {{ recipeById.author.name }}
                    </span>
                </p>
            </div>
        </div>
        <div class="template-recipe-group" style="place-content: center;" v-if="recipeById.videoURL != null">
            <h1 class="heading-primary mb-sm text-center">Vídeo de la receta.</h1>
            <iframe 
                v-if="recipeById.videoURL"
                style="width: 75rem; height: 45rem;" 
                :src="recipeById.videoURL" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope; picture-in-picture; web-share" 
                allowfullscreen
            ></iframe>
        </div>
        <div class="template-recipe-group template-recipe-group--2-columns">
            <div class="template-recipe-group template-recipe__steps align-content-center">
                <h1 class="headign-primary mb-lg">Pasos</h1>
                <h2
                    v-for="{ text, step } in recipeById.steps"
                    :key="step"
                    class="heading-secondary text-bold mb-lg"
                >
                    {{ step }}.-
                    <span class="heading-tertiary text-normal">
                        {{ text }}
                    </span>
                </h2>
            </div>
            <div class="template-recipe-group justify-content-end align-content-start">
                <h1 class="headign-primary mb-lg">Ingredientes</h1>
                <li
                    v-for="{ ingredient } in recipeById.ingredients"
                    :key="ingredient"
                >
                    {{ ingredient }}
                </li>
            </div>
        </div>
    </section>
</template>

<script>
import { onMounted, watch } from 'vue'
import useRecipes from '../composables/useRecipes'
export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props){
        // Composables
        const { 
            recipeById,
            getRecipeById
        } = useRecipes()
        
        // Methods
        watch(
            () => props.id,
            async() => {
                await getRecipeById(props.id)
            }
        )

        // Lifecycle Hooks
        onMounted(async() => {
            await getRecipeById(props.id)
        })

        return {
            recipeById
        }
    }

}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/templateRecipe';
</style>