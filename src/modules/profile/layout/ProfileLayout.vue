<template>
    <div class="profile-layout">
        <nav class="navbar-profile">
            <CustomLink
                v-for="link in links"
                :key="link.to"
                :link="link"
            />
        </nav>
        <RouterView/>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
        CustomLink: defineAsyncComponent(() => import(/* CustomLink */'@/components/CustomLink'))
    },
    data(){
        return{
            links: [
                { to: 'profile-my-recipes', name: 'Mis recetas', icon: 'mug-hot' },
                { to: 'profile-favorite-recipes', name: 'Recetas favoritas', icon: 'bookmark' },
                { to: 'profile-information', name: 'Información personal', icon: 'address-card' },
                { to: 'profile-new-recipe', name: 'Publicar nueva receta', icon: 'circle-plus' },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/layout/profileLayout';
</style>