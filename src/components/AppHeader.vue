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
                v-if="authStatus === 'authenticated' && screenWidth < 768"
                class="header__profile-info">
                <img 
                    :src="photoURL" 
                    :alt="username"
                    class="header__profile-picture">

                <h3 class="heading-tertiary text-bold d-grid">
                    {{ username }}
                    <span class="text-normal">{{ email }}</span>
                </h3>
            </div>
            <CustomLink
                v-for="link in publicLinks"
                :key="link.to"
                :link="link"
            />
            <div 
                v-if="authStatus === 'authenticated' && screenWidth < 768"
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
            v-if=" authStatus === 'authenticated' && screenWidth > 768"
            :src="photoURL" 
            @click="showMenuAuth = !showMenuAuth"
            alt="Diego"
            class="header__profile-picture cursor-pointer">
        <div 
            v-if=" authStatus === 'authenticated' && screenWidth > 768 && showMenuAuth"
            class="header__profile"
            :class="{'header__profile--active' : showMenuAuth}"
        >
            <div 
                class="header__profile-info cursor-pointer"
                @click="$router.push({ name: 'profile-my-recipes' })"
            >
                <img 
                    :src="photoURL" 
                    :alt="username"
                    class="header__profile-picture">
                <h3 class="heading-tertiary text-bold d-grid">
                    {{ username }}
                    <span class="text-normal">{{ email }}</span>
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
        
        <div class="header__auth-buttons" v-if="authStatus !== 'authenticated'">
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
import { defineAsyncComponent, ref } from 'vue'
import useAuth from '@/modules/auth/composables/useAuth'

export default {
    components: {
        CustomLink: defineAsyncComponent(() => import(/* CustomLink */'@/components/CustomLink'))
    },
    setup() {
        // Composables
        const { 
            authStatus, 
            username, 
            email, 
            photoURL,
            logout,
            authLinks,
            publicLinks
        } = useAuth()

        // Reactive states
        const showMenu = ref(false),
              showMenuAuth = ref(false),
              screenWidth  = ref(null)

        // Methods
        const handleResizeWidth = () => {
            screenWidth.value = window.innerWidth
        }

        screenWidth.value = window.innerWidth
        window.addEventListener('resize', handleResizeWidth())

        return {
            authLinks,
            authStatus,
            email,
            logout,
            photoURL,
            publicLinks,
            username,
            showMenu,
            showMenuAuth,
            screenWidth,
            handleResizeWidth
        }
    },
    beforeUnmount(){
        window.removeEventListener('resize', handleResizeWidth())
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/layout/header';
@use '@/sass/components/button';
@use '@/sass/components/icons';
</style>