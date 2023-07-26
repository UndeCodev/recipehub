<template>
    <div class="profile">
        <div class="profile__information">
            <img 
                :src="user?.photoURL" 
                alt="Diego Vite Hernández - picture"
                class="profile__information-picture">
            <h2 class="heading-primary text-normal mt-md">{{ user?.name }}</h2>
            <h3 class="heading-secondary text-regular">{{ user?.rolAuthor }}</h3>
        </div>
        <nav class="profile__navbar">
            <CustomLink
                v-for="link in links"
                :key="link.to"
                :link="link"
            />
        </nav>
        <div class="profile__content">
            <RouterView/>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        CustomLink: defineAsyncComponent(() => import(/* CustomLink */'@/components/CustomLink'))
    },
    data(){
        return{
            links: [
                { to: 'profile-my-recipes', name: 'Mis recetas', icon: 'mug-hot' },
                { to: 'profile-new-recipe', name: 'Publicar nueva receta', icon: 'circle-plus' },
                { to: 'profile-favorite-recipes', name: 'Recetas favoritas', icon: 'bookmark' },
                { to: 'profile-information', name: 'Información personal', icon: 'address-card' },
            ]
        }
    },
    computed: {
        ...mapGetters('auth', ['user'])
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/layout/profileLayout';
</style>