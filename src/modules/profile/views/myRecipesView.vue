<template>
  <section class="my-recipes-layout">
    <RecipeCard
      :recipe="{
        recipeCover: 'https://ik.imagekit.io/ooasyrel0/pexels-alleksana-5949898-vertical.jpg?updatedAt=1689112159858',
        title: 'Sopa a la tailandesa de coco y curry',
        category: 'Desayunos',
        totalTimePrep: '30 minutos',
        author: 'Diego Vite Hernández',
        rolAuthor: 'Publicador',
        authorPicture: 'https://ik.imagekit.io/ooasyrel0/WhatsApp_Image_2023-07-01_at_12.26.19_R6EkL4XWx.jpg?updatedAt=1689662405998'
      }"
    />
    <RecipeCard
      :recipe="{
        recipeCover: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
        title: 'Pastel de chocolate',
        category: 'Cenas',
        totalTimePrep: '1 Hora',
        author: 'Jane Doe',
        rolAuthor: 'Publicador',
        authorPicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      }"
    />
    <RecipeCard
      :recipe="{
        recipeCover: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        title: 'Pastel de chocolate',
        category: 'Cenas',
        totalTimePrep: '1 Hora',
        author: 'Jane Doe',
        rolAuthor: 'Publicador',
        authorPicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      }"
    />
    <RecipeCard
      :recipe="{
        recipeCover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        title: 'Pastel de chocolate',
        category: 'Cenas',
        totalTimePrep: '1 Hora',
        author: 'Jane Doe',
        rolAuthor: 'Publicador',
        authorPicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      }"
    />
    <RecipeCard
      :recipe="{
        recipeCover: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        title: 'Pastel de chocolate',
        category: 'Cenas',
        totalTimePrep: '1 Hora',
        author: 'Jane Doe',
        rolAuthor: 'Publicador',
        authorPicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      }"
    />
    <RecipeCard
      :recipe="{
        recipeCover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        title: 'Pastel de chocolate',
        category: 'Cenas',
        totalTimePrep: '1 Hora',
        author: 'Jane Doe',
        rolAuthor: 'Publicador',
        authorPicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      }"
    />
  </section>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    RecipeCard: defineAsyncComponent(() => import(/* RecipeCard */'@/modules/recipes/components/recipeCard'))
  }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/myRecipes';
</style>