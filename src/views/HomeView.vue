<template>
  <section class="hero">
    <img
        src="@/assets/backgrounds/ella-olsson-oPBjWBCcAEo-unsplash.jpg"
        alt="Food"
        class="hero__background"
    />
    <div class="hero__content">
        <h1
            class="heading-primary mb-sm"
        >
            <span
                class="text-primary text-uppercase"
            >
                RecipeHub
            </span>
            recetas fáciles, rápidas y deliciosas.
        </h1>
        <p class="paragraph">
            Descubre recetas deliciosas y fáciles de hacer para cualquier ocasión. Aprende a preparar desde desayunos hasta postres con fotos, videos y pasos detallados. ¡Descubre nuestro catalogo de recetas y sorprende a tu paladar!
        </p>
        <button class="btn btn--primary mt-md">
            Explorar recetas 
            <i class="fa-solid fa-arrow-right-long ml-sm"></i>
        </button>
    </div>
  </section>
  <section style="height: 100vh"></section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@use "@/sass/pages/home";
@use "@/sass/components/button";
</style>