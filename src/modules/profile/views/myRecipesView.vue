<template>
  <h1 
    v-if="!recipes"
    class="heading-primary text-primary d-grid align-content-center text-center"
    style="height: 20rem;"
  >
    Aún no tienes recetas publicadas...
    <span class="heading-tertiary text-normal">Ve a la sección "publicar nueva receta" y comparte tusconocimientos con la comunidad.</span>
  </h1>
  
  <section 
    v-else
    class="my-recipes-layout"
  >
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.user_id"
      :recipe="{
        recipeCover: recipe.recipeCover,
        title: recipe.title,
        category: recipe.category,
        totalTimePrep: recipe.total_time,
        author: user?.name,
        rolAuthor: recipe.rol_name,
        authorPicture: user?.photoURL
      }"
    />
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex'

export default {
  components: {
    RecipeCard: defineAsyncComponent(() => import(/* RecipeCard */'@/modules/recipes/components/recipeCard'))
  },
  data(){
    return{
      user_id: null,
      recipes: null
    }
  },
  methods: {
    async getRecipes(){
      try {
        const response = await fetch(`https://recipehub-api.onrender.com/recipes-card-by-user/${this.user_id}`)
        
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
  computed: {
    ...mapState('auth', ['user'])
  },
  created(){
    this.user_id = this.user.user_id
    this.getRecipes()
  }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/myRecipes';
</style>