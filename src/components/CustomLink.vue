<template>
    <RouterLink
        :to="route"
        v-slot="{ href, isActive }"
        class="router-link text-decoration-none"
    >
        <a 
            :href="href"    
            :class="[`router-link router-link${isActive ? '--active' : '--normal'}`]"
        >
            {{ link.name }}
        </a>
    </RouterLink>
</template>

<script>
import { computed } from 'vue'
export default {
    props: {
        link: {
            type: Object,
            required: true
        }
    },
    setup(props){

        return {
            route: computed(() => props.link.params?.id === undefined 
                ? { name: props.link.to }
                : { name: props.link.to, params: { id: props.link.params.id } }
            )
        }
    },
}
</script>

<style lang="scss" scoped>
</style>