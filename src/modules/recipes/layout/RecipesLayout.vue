<template>
    <section class="hero">
        <div class="hero__content">
            <h1 class="heading-primary mb-md text-center">
                ¿Qué deseas cocinar hoy?
            </h1>
            <div class="form-group search-box">
                <input 
                    type="text" 
                    class="form-input form-input--md search-box__input"
                    placeholder="Descubre recetas fascinantes"
                    v-model="searchTerm">
                <template
                    v-if="searchTerm"
                >
                    <SearchFilter
                        class="search-box__results"
                        :searchTerm="searchTerm"
                    />
                </template>
            </div>
            
            <p class="paragraph mt-sm">
                <span class="text-bold">
                    Tendencias:
                </span> 
                Platos principales, desayunos, comida vegana, postres, pastas.
            </p>
        </div>
        <div class="hero__background">
            <img
                src="@/assets/backgrounds/plate.png"
                alt="Food"
                class="hero__meal"
            />
        </div>
    </section>
    <div class="recipe-header">
        <RouterLink :to="{ name: 'recipes-home' }">
            Explorar
        </RouterLink>
        <button 
            class="btn" 
            @click="productContainers.scrollLeft -= containerWidth"
        >
            <i class="fa-solid fa-chevron-left"></i>
        </button>
        <div class="recipe-header__navbar" ref="productContainers">
            <template v-if="routeCategories">
                <CustomLink
                    v-for="route in routeCategories"
                    :key="route.to"
                    :link="route"
                />
            </template>
        </div>
        <button 
            class="btn" 
            @click="productContainers.scrollLeft += containerWidth"
        >
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    </div>
    <section class="recipes-main">
        <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
        </router-view>
    </section>
</template>

<script>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import useRecipes from '../composables/useRecipes';
export default {
    components: {
        CustomLink: defineAsyncComponent(() => import(/* webpackChunkName: 'CustomLink' */ '@/components/CustomLink')),
        SearchFilter: defineAsyncComponent(() => import(/* webpackChunkName: 'SearchFilter' */ '@/modules/recipes/components/searchFilter')),
    },
    setup() {
        // Composables
        const { 
            categories,
            getCategories,
        } = useRecipes()

        // Methods

        // Reactive states
        const routeCategories = ref([]) 
        
        const productContainers = ref(null),
              containerWidth = ref(null)

        // Lifecycle hooks
        onMounted(async() => {
            await getCategories()

            routeCategories.value = categories.value.map(({ category }) => (
                { 
                    to: 'recipes-category', 
                    name: category, 
                    params: { id: category }
                }
            ))

            containerWidth.value = productContainers.value.getBoundingClientRect().width;
        })

        return {
            routeCategories,
            productContainers, 
            containerWidth,

            searchTerm: ref(null)
        }
    }
};
</script>

<style lang="scss" scoped>
@use "@/sass/pages/recipes";
@use "@/sass/components/form";
@use "@/sass/components/button";
</style>