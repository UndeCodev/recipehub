<template>
    <div class="profile">
        <div class="profile__information">
            <img 
                :src="photoURL" 
                :alt="`${username} - picture`"
                class="profile__information-picture">
            <h2 class="heading-primary text-normal mt-md">{{ username }}</h2>
            <h3 class="heading-secondary text-regular">{{ rol }}</h3>
        </div>
        <nav class="profile__navbar">
            <CustomLink
                v-for="link in authLinks"
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
import { defineAsyncComponent, ref } from 'vue'
import useAuth from '@/modules/auth/composables/useAuth'

export default {
    components: {
        CustomLink: defineAsyncComponent(() => import(/* CustomLink */'@/components/CustomLink'))
    },
    setup() {
        // Composables
        const { 
            username, 
            photoURL, 
            rol,
            authLinks
        } = useAuth()

        return {
            authLinks,
            username,
            photoURL,
            rol
        }
    },
}
</script>

<style lang="scss" scoped>
@use '@/sass/layout/profileLayout';
</style>