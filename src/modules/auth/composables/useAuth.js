import { useStore } from "vuex";
import { computed, ref } from 'vue';

const useAuth = () => {
    // Composables
    const store = useStore();

    // Reactive states
    const publicLinks = ref([
        { to: 'home', name: 'Inicio', icon: 'house' },
        { to: 'recipes-home', name: 'Recetas', icon: 'utensils' },
        { to: 'about', name: 'Acerca de', icon: 'message' },
    ]);

    const authLinks = ref([
        { to: 'profile-my-recipes', name: 'Mis recetas', icon: 'mug-hot' },
        { to: 'profile-new-recipe', name: 'Publicar nueva receta', icon:'circle-plus' },
        { to: 'profile-favorite-recipes', name: 'Recetas favoritas', icon:'bookmark' },
        { to: 'profile-information', name: 'Información personal', icon: 'address-card' }
    ]);

    // Methods
    const signInWithProvider = async(provider) => await store.dispatch('auth/signInWithProvider', provider); 

    const signUpWithProvider = async(provider) => await store.dispatch('auth/signUpWithProvider', provider); 

    const signInUser = async(user) => await store.dispatch('auth/signInUser', user);   
    const signUpUser = async(user) => await store.dispatch('auth/signUpUser', user);  
    
    return {
        // Reactive states
        publicLinks,
        authLinks,

        // Methods
        signInWithProvider,
        signUpWithProvider,
        signInUser,
        signUpUser,
        logout: () => {
            store.commit('auth/logout')
        },
        
        // Getters
        authStatus: computed(() => store.getters['auth/currentState']),
        username: computed(() => store.getters['auth/username']),
        email: computed(() => store.getters['auth/email']),
        photoURL: computed(() => store.getters['auth/photoURL']),
        rol: computed(() => store.getters['auth/rol']),
        userId: computed(() => store.getters['auth/userId']),
    }
}

export default useAuth;