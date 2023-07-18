<template>
    <RouterLink
        :to="route"
        v-slot="{ href, isActive }"
        class="router-link text-decoration-none"
    >
        <i 
            v-if="link.icon"
            class="fa-solid"
            :class="`fa-${link.icon} fa-solid${isActive ? '--active' : '--normal'}`"
        ></i>
        <a 
            :href="href"    
            :class="[`router-link router-link${isActive ? '--active' : '--normal'}`]"
        >
            {{ link.name }}
        </a>
    </RouterLink>
</template>

<script>
export default {
    props: {
        link: {
            type: Object,
            required: true
        }
    },
    computed: {
        route(){
          return this.link.id === undefined
            ? { name: this.link.to }
            : { name: this.link.to, params: { id: this.link.id } }
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/components/icons';
</style>