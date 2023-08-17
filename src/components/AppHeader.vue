<template>
    <header 
        class="header"
        :class="{ 'header--fixed' : isFixed  }"
    >
    <img 
        src="@/assets/logos/recipehub-icon.svg" 
        alt="RecipeHub - Logo" 
        class="header__logo">
    <nav class="header__navbar">
        <CustomLink
            v-for="link in publicLinks"
            :key="link.to"
            :link="link"
        />
    </nav>
    <template
        v-if="authStatus === 'authenticated'"
    >
        <div 
            class="navbar-auth"
        >
            <router-link
                :to="{ name: 'profile-my-recipes' }"
            >
                <img 
                    :src="photoURL" 
                    :alt="username" 
                    class="navbar-auth__photo">
            </router-link>
            <button 
                class="btn btn--primary"
                @click="onLogout"
            >
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
        </div>
    </template>
    <router-link 
        v-else
        class="btn btn--white header__login"
        :to="{ name: 'auth-sign-in' }"
    >
        Iniciar sesión
    </router-link>
    <button class="header__menu-icon">
        <span></span>
        <span></span>
        <span></span>
    </button>
  </header>
</template>

<script>
import useAuth from '@/modules/auth/composables/useAuth'
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
    components: {
        CustomLink: defineAsyncComponent(() => import(/* webpackChunkName: "CustomLink" */'@/components/CustomLink'))
    },
    setup() {
        // Composables
        const router = useRouter()
        
        const { 
            publicLinks,
            photoURL,
            authStatus,
            username,

            logout
            } = useAuth()
        
        // Reactive states
        const isFixed = ref(false)

        onMounted(() => {
            window.addEventListener('scroll', () => {
              isFixed.value = window.scrollY > 0;
            });
        });

        return {
            publicLinks,
            photoURL,
            authStatus,
            username,
            isFixed,

            onLogout: () => {
                logout()
                router.push({ name: 'recipes-home' })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/layout/header';
@use '@/sass/components/button';
</style>