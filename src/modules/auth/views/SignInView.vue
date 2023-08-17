<template>
    <form 
        class="form-sign-in"
        @submit.prevent="onSubmit">
        <h1 class="heading-primary text-bold">Bienvenido a RecipeHub.</h1>
        <div class="mt-sm">
            <p>Coloca tus datos para poder iniciar sesión.</p>
            <p>
                ¿Aún no tienes una cuenta?
                <RouterLink
                    :to="{ name: 'auth-sign-up' }"
                    class="router-link"
                >
                    Crea una cuenta
                </RouterLink>
            </p>
        </div>
        <div class="form-group mt-md">
            <label 
                for="email" 
                class="form-label"
                :class="{ 'text-error ': v$.email.$error }" 
            >
                Correo electrónico
            </label>
            <div class="form-group__icon">
                <input 
                    type="text" 
                    class="form-input"
                    :class="{ 'form-input--error': v$.email.$error }" 
                    placeholder="Correo electrónico"
                    id="email"
                    v-model="user.email">
                <i class="fa-solid fa-envelope"></i>
            </div>
            <p 
                :class="{ 'text-error fade-in-down': v$.email.$error }" 
                v-if="v$.email.$error"
            >
                {{ v$.email.$errors[0].$message }}
            </p>
        </div>
        <div class="form-group mt-md">
            <label 
                for="password" 
                class="form-label"
                :class="{ 'text-error ': v$.password.$error }" 
            >
                Contraseña
            </label>
            <div class="form-group__icon">
                <input 
                    :type="!showPassword ? 'password' : 'text'" 
                    class="form-input" 
                    :class="{ 'form-input--error': v$.password.$error }" 
                    placeholder="Contraseña"
                    id="password"
                    v-model="user.password">
                <i 
                    class="fa-solid cursor-pointer"
                    :class="!showPassword ? 'fa-eye' : 'fa-eye-slash'"
                    @click="showPassword = !showPassword"
                ></i>
            </div>
            <p 
                :class="{ 'text-error fade-in-down': v$.password.$error }" 
                v-if="v$.password.$error"
            >
                {{ v$.password.$errors[0].$message }}
            </p>
        </div>
        <div class="form-group mt-md">
            <RouterLink 
                :to="{ name: 'password-reset' }"
                class="router-link text-end"
            >
                ¿Olvidaste tu contraseña?
            </RouterLink>
            <button 
                type="submit"
                class="btn btn--primary btn--md mt-md"
            >
                Iniciar sesión
            </button>
        </div>
        <p class="text-separator mt-md">
            O
        </p>
        <div class="btn-group mt-md">
            <button 
                type="button"
                class="btn btn--secondary btn--md btn--icon-group"
                @click="onSignInWithProvider('google')"
            >
                <i class="fa-brands fa-google"></i>
                <span>Inicia sesión con Google</span>
            </button>
            <button 
                type="button"
                class="btn btn--secondary btn--md btn--icon-group"
                @click="onSignInWithProvider('facebook')"
            >
                <i class="fa-brands fa-facebook-f"></i>
                <span>Inicia sesión con Facebook</span>
            </button>
        </div>
    </form>
    <Transition v-if="showNotification">
        <ToastNotification 
          :notification="notification"
        />
    </Transition>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router';

import useAuth from '@/modules/auth/composables/useAuth';
import useNotification from '@/modules/shared/composables/useNotification';
import useValidators from '@/modules/shared/composables/useValidators';

export default {
    components: {
        ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */ '@/modules/shared/components/ToastNotification'))
    },
    setup() {
        // Composables
        const router = useRouter()

        const { 
            showNotification,
            notification, 
            toastNotification 
        } = useNotification()

        const { signInRules } = useValidators()
        const { 
            signInUser,
            signInWithProvider,
        } = useAuth()
 
        // Reactive states
        const showPassword = ref(false)

        const user = ref({
            email: null,
            password: null
        })

        const v$ = useVuelidate(signInRules, user)
        
        return {
            v$,
            user,
            showPassword,
            notification,
            showNotification,

            // Methods
            onSubmit: async() => {
                const isValidForm = await v$.value.$validate()
                if(!isValidForm) return

                const { ok, message } = await signInUser(user.value)

                if(!ok) toastNotification('error', 'Error al iniciar sesión.', message)
                else router.push({ name: 'profile-my-recipes' })
            },
            onSignInWithProvider: async(provider) => {
                const { ok, message } = await signInWithProvider(provider)

                if(!ok) toastNotification('error', 'Error al iniciar sesión.', message)
                else router.push({ name: 'profile-redirect' })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/components/form';
@use '@/sass/components/button';
@use '@/sass/components/icons';

.form-sign-in{
    width: min(50rem, 100%); 
    margin-inline: auto;

    @media (width > 768px){
        padding-inline: 2rem;
    }
}
</style>