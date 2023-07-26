<template>
  <header class="header">
    <img 
        src="@/assets/logos/recipehub-icon.svg" 
        alt="RecipeHub Logo" 
        class="header__logo cursor-pointer"
        @click="$router.push({ name: 'home' })">
    <div 
        class="header__menu"
        :class="{'header__menu--active' : showMenu}"
    >
        <nav 
            class="header__navbar"
        >
            <div 
                v-if="currentState === 'authenticated' && screenWidth < 768"
                class="header__profile-info">
                <img 
                    :src="user.photoURL" 
                    alt="Diego"
                    class="header__profile-picture">

                <h3 class="heading-tertiary text-bold d-grid">
                    {{ user.name }}
                    <span class="text-normal">{{ user.email }}</span>
                </h3>
            </div>
            <CustomLink
                v-for="link in links"
                :key="link.to"
                :link="link"
            />
            <div 
                v-if="currentState === 'authenticated' && screenWidth < 768"
                class="header__profile-auth-links"
            >
                <CustomLink
                    v-for="link in authLinks"
                    :key="link.to"
                    :link="link"
                />
            </div>
        </nav>

        <img 
            v-if=" currentState === 'authenticated' && screenWidth > 768"
            :src="user.photoURL" 
            @click="showMenuAuth = !showMenuAuth"
            alt="Diego"
            class="header__profile-picture cursor-pointer">
        
        
        <div 
            v-if=" currentState === 'authenticated' && screenWidth > 768 && showMenuAuth"
            class="header__profile"
            :class="{'header__profile--active' : showMenuAuth}"
        >
            <div 
                class="header__profile-info cursor-pointer"
                @click="$router.push({ name: 'profile-my-recipes' })"
            >
                <img 
                    :src="user.photoURL" 
                    alt="Diego"
                    class="header__profile-picture">
                <h3 class="heading-tertiary text-bold d-grid">
                    {{ user.name }}
                    <span class="text-normal">{{ user.email }}</span>
                </h3>
            </div>
            <div 
                class="header__profile-auth-links"
            >
                <CustomLink
                    v-for="link in authLinks"
                    :key="link.to"
                    :link="link"
                />
                <RouterLink
                    class="router-link router-link--normal d-grid"
                    @click="logout"
                    :to="{ name: 'home' }"
                >
                    <i class="fa-solid fa-arrow-right-from-bracket text-bold"></i> 
                    <a 
                        class="router-link router-link--normal"
                    >
                        Cerrar sesión
                    </a>
                </RouterLink>
            </div>
        </div>
        
        <div class="header__auth-buttons" v-if="currentState !== 'authenticated'">
            <button
                class="btn btn--primary"
                @click="$router.push({ name: 'auth-sign-in' })"
            >
                Iniciar sesión
            </button>
        </div>
    </div>
    <button 
        v-if="screenWidth < 768"
        class="header__icon-menu"
        :class="{ 'header__icon-menu--active' : showMenu }"
        @click="showMenu = !showMenu"
    >
        <span class="header__icon-menu-line"></span>
        <span class="header__icon-menu-line"></span>
        <span class="header__icon-menu-line"></span>
    </button>
  </header>
</template>

<script>
import { defineAsyncComponent } from 'vue'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('auth') 

export default {
    components: {
        CustomLink: defineAsyncComponent(() => import(/* CustomLink */'@/components/CustomLink'))
    },
    data(){
        return{
            showMenu: false,
            showMenuAuth: false,
            screenWidth: null,
            links: [
                { to: 'home', name: 'Inicio', icon: 'house' },
                { to: 'recipes-home', name: 'Recetas', icon: 'utensils' },
                { to: 'about', name: 'Acerca de', icon: 'message' },
            ],
            authLinks: [
                { to: 'profile-my-recipes', name: 'Mis recetas', icon: 'mug-hot' },
                { to: 'profile-new-recipe', name: 'Publicar nueva receta', icon: 'circle-plus' },
                { to: 'profile-favorite-recipes', name: 'Recetas favoritas', icon: 'bookmark' },
                { to: 'profile-information', name: 'Información personal', icon: 'address-card' },
            ]
        }
    },
    computed: {
        ...mapGetters(['currentState', 'user'])
    },
    methods: {
        ...mapMutations(['logout']),
        handleResizeWidth(){
            this.screenWidth = window.innerWidth
        },
        onLogout(){
            this.logout()
            this.$router.push({ name: 'home' })
        }
    },
    mounted(){
        this.screenWidth = window.innerWidth
        window.addEventListener('resize', this.handleResizeWidth)
    },
    beforeUnmount(){
        window.removeEventListener('resize', this.handleResizeWidth)
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/layout/header';
@use '@/sass/components/button';
@use '@/sass/components/icons';
</style>