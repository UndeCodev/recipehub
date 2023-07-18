<template>
  <header class="header">
    <img 
        src="@/assets/logos/recipehub-icon.svg" 
        alt="RecipeHub Logo" 
        class="header__logo">
    <!-- <i class="fa-solid fa-magnifying-glass"></i> -->
    <div 
        class="header__menu"
        :class="{ 'header__menu--active' : showMenu }"
    >
        <nav class="header__navbar">
            <CustomLink
                v-for="link in links"
                :key="link.to"
                :link="link"
            />
        </nav>
        <div class="header__auth-group">
            <i class="fa-solid fa-magnifying-glass" v-show="false"></i>
            <template v-if="currentState === 'authenticated'">
                <div 
                    class="header__profile cursor-pointer" 
                    @click="$router.push({ name: 'profile-redirect' })"
                >
                    <img 
                        :src="profilePicture" 
                        :alt="username"
                        class="header__profile-picture">
                    <p class="header__profile-info text-capitalize text-normal">
                        {{ username }}
                        <small class="text-lowercase text-regular">
                            {{ email }}
                        </small>
                    </p>
                </div>
                <button 
                    type="button"
                    class="btn btn--secondary header__profile-logout"
                    @click="onLogout"
                >
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </template>
            <template v-else>
                <RouterLink 
                    class="btn btn--secondary"
                    :to="{ name: 'auth-sign-up' }"
                >
                    Registrarse
                </RouterLink>
                <RouterLink 
                    class="btn btn--primary"
                    :to="{ name: 'auth-sign-in' }"
                >
                    Iniciar sesión
                </RouterLink>
            </template>
        </div>
    </div>
    <button 
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
            links: [
                { to: 'home', name: 'Inicio', icon: 'house' },
                { to: 'recipes', name: 'Recetas', icon: 'utensils' },
                { to: 'about', name: 'Acerca de', icon: 'message' },
            ]
        }
    },
    methods: {
        ...mapMutations(['logout']),
        onLogout(){
            this.logout()
            this.$router.push({ name: 'home' })
        }
    },
    computed: {
        ...mapGetters(['username', 'currentState', 'email', 'profilePicture'])
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/layout/header';
@use '@/sass/components/button';
@use '@/sass/components/icons';
</style>