<template>
  <article 
    class="card-recipe"
    @click="$router.push({ name: 'recipe-by-id', params: { id: recipe.id } })"
  >
    <img 
      :src="recipe.recipeCover" 
      alt="Food"
      class="card-recipe__cover">
    <div class="card-recipe__content">
      <div class="card-recipe__header">
        <h2 class="heading-secondary text-white">{{ recipe.title }}</h2>
        <div class="card-recipe__header-group">
          <h3 class="heading-tertiary text-normal text-white">
            <i class="fa-solid fa-tag"></i>
            {{ recipe.category }}
          </h3>
          <h3 class="heading-tertiary text-normal text-white">
            <i class="fa-solid fa-clock"></i>
            {{ recipe.totalTime }}
          </h3>
        </div>
      </div>
      <div 
        v-if="recipe.author"
        class="card-recipe__footer"
      >
        <img 
          :src="recipe.authorPicture" 
          alt="People"
          class="card-recipe__footer-picture">
        <h2 class="heading-tertiary text-white text-bold">
          {{ recipe.author }}
          <span class="text-regular text-white d-block">
            {{ recipe.rolAuthor }}
          </span>
        </h2>
      </div>
    </div>
  </article>
</template>

<script>
export default {
    props: {
      recipe: {
        type: Object,
        required: true
      }
    },
}
</script>

<style lang="scss" scoped>
@use '@/sass/components/card';
@use '@/sass/components/icons';
</style>