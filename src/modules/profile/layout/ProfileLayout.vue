<template>
    <div class="profile">
        <div class="profile__navbar">
            <CustomLink
                v-for="link in authLinks"
                :key="link.to"
                :link="link"
            />
        </div>
        <div class="profile__main">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
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