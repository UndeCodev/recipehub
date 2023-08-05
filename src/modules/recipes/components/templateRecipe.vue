<template>
    <section 
        v-if="recipe"
        class="template-recipe"
    >
        <div class="template-recipe-group template-recipe-group--2-columns">
            <div class="template-recipe-group">
                <img 
                    :src="recipe.recipeCover" 
                    alt=""
                    class="template-recipe__coverRecipe">
            </div>
            <div class="template-recipe-group align-content-center">
                <h1 class="heading-primary mb-sm">{{ recipe.title }}</h1>
                <p class="text-normal">
                    {{ recipe.description }}
                </p>
                <div class="template-recipe__information">
                    <h2 
                        class="heading-tertiary text-bold d-grid"
                        v-for="{ type_time, time } in recipe.times"
                        :key="type_time"
                    >
                        {{ type_time }}
                        <span class="text-normal">{{ time }}</span>
                    </h2>
                    <h2 class="heading-tertiary text-bold d-grid">
                        Tiempo total
                        <span class="text-normal">{{ recipe.totalTime }}</span>
                    </h2>
                    <h2 class="heading-tertiary text-bold d-grid">
                        Categoría
                        <span class="text-normal">{{ recipe.category }}</span>
                    </h2>
                    <h2 class="heading-tertiary text-bold d-grid">
                        Raciones
                        <span class="text-normal">{{ recipe.servings }}</span>
                    </h2>
                    <h2 
                        class="heading-tertiary text-bold d-grid"
                        v-if="recipe.yield"
                    >
                        Rendimiento
                        <span class="text-normal">{{ recipe.yield }}</span>
                    </h2>
                </div>
                <p class="text-bold">
                    Receta por:
                    <span class="text-normal">
                        {{ recipe.author }}
                    </span>
                </p>
            </div>
        </div>
        <div class="template-recipe-group" style="place-content: center;">
            <h1 class="heading-primary mb-sm text-center">Vídeo de la receta.</h1>
            <iframe 
                v-if="recipe.video_url"
                style="width: 75rem; height: 45rem;" 
                :src="recipe.video_url" 
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
                    v-for="{ step_text, step_number } in recipe.steps"
                    :key="step_number"
                    class="heading-secondary text-bold mb-lg"
                >
                    {{ step_number }}.-
                    <span class="heading-tertiary text-normal">
                        {{ step_text }}
                    </span>
                </h2>
            </div>
            <div class="template-recipe-group justify-content-end align-content-start">
                <h1 class="headign-primary mb-lg">Ingredientes</h1>
                <li
                    v-for="{ ingredient_text } in recipe.ingredients"
                    :key="ingredient_text"
                >
                    {{ ingredient_text }}
                </li>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            recipe: null
        }
    },
    methods: {
        async getRecipe() {
            try {
                const response = await fetch(`http://localhost:3000/recipes/${this.id}`)

                if (!response.ok) {
                    const { message } = await response.json()
                    throw new Error(message)
                }

                this.recipe = await response.json()
            } catch (error) {
                if(error){
                    this.$router.push({ name: 'recipes' })
                }
            }
        }
    },
    watch: {
      id(){
        this.getRecipe()
      }
    },
    created() {
        this.getRecipe()
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/templateRecipe';
</style>