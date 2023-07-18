<template>
    <section class="auth-layout">
        <img 
            v-if="screenWidth > 768"
            src="https://images.unsplash.com/photo-1529940122574-0096689bc5cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
            alt="Food" 
            class="auth-layout__photo">
        <div class="auth-layout__forms">        
            <RouterView/>
        </div>
    </section>
</template>

<script>

export default {
    data(){
        return{
            screenWidth: null
        }
    },
    methods: {
        handleResizeWidth(){
            this.screenWidth = window.innerWidth
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
@use '@/sass/pages/authLayout';
</style>