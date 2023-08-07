<template>
    <div 
        v-if="notification.show"
        class="toast-notification"
        :class="modifierClass"
        @animationend="notification.show = false"
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
</template>

<script>
import { ref } from 'vue'

export default {
    props: {
        notification: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const icons = ref({
            error: 'fa-circle-exclamation',
            info: 'fa-circle-info',
            success: 'fa-circle-check',            
        })

        const classes = ref({
            error: '--error',
            info: '--info',
            success: '--success',
        })

        const modifierClass = ref(null)
        modifierClass.value = `toast-notification${classes.value[props.notification.type]}`

        return {
            icons,
            modifierClass,
        }
    },
}
</script>

<style lang="scss" scoped>
@use '@/sass/components/toastNotification';
@use '@/sass/components/icons';
</style>