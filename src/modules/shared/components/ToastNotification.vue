<template>
    <Transition>
        <div 
            v-if="notification.show"
            class="toast-notification"
            :class="modifierClass"
            @animationend="handleAnimationEnd"
        >
            <i 
                class="fa-solid icon-md"
                :class="icons[notification.type]"
            ></i>
            <div :class="modifierClass">
                <h3 class="heading-tertiary">{{ notification.title }}</h3>
                <p class="text-regular">{{ notification.description }}</p>
            </div>
            <i 
                class="fa-solid fa-xmark cursor-pointer text-dark"
                @click="notification.show = !notification.show"
            ></i>
        </div>
    </Transition>
</template>

<script>
export default {
    props: {
        notification: {
            type: Object,
            required: true
        },
    },
    data(){
        return{
            icons: {
                error: 'fa-circle-exclamation',
                info: 'fa-circle-info',
                success: 'fa-circle-check',
            },
            classes: {
                error: '--error',
                info: '--info',
                success: '--success',
            },
            modifierClass: null,
        }
    },
    methods: {
        handleAnimationEnd(){
            this.notification.show = false
        }
    },
    mounted(){
        this.modifierClass = `toast-notification${this.classes[this.notification.type]}`
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/components/toastNotification';
@use '@/sass/components/icons';
</style>