<template>
  <section class="recipes-hero">
    <img 
      src="@/assets/backgrounds/rachel-park-hrlvr2ZlUNk-unsplash.jpg" 
      alt="Food"
      class="recipes-hero__background">
    <div class="recipes-hero__content">
      <h1 class="heading-primary text-center text-white">¿Qué deseas preparar hoy?</h1>
      <div class="form-group">
        <input 
          type="text" 
          class="form-input form-input--md" 
          placeholder="Buscador">
        <p class="text-white text-bold mt-sm">Tendencias: <span class="text-normal">flower, wallpapers, backgrounds, happy, love</span></p>
      </div>
    </div>
  </section>
  <RouterView/>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/recipes';
@use '@/sass/components/form';
</style>