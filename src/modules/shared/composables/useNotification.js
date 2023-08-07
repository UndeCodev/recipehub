import { ref } from 'vue';

const useNotification = () => {
    const showNotification = ref(false)
    
    const notification = ref({
        type: null,
        title: null,
        description: null,
        show: false
    });

    return {
        showNotification,
        notification,

        // Methods
        toastNotification: (type, title, description) => {
            showNotification.value = true
            notification.value.show = true
            notification.value.type = type
            notification.value.title = title
            notification.value.description = description
        }
    }
}

export default useNotification;