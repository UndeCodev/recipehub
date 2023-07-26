<template>
    <form 
        class="form-sign-in"
        @submit.prevent="onSignIn">
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
                    v-model="email">
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
                    v-model="password">
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
                :to="{ name: 'home' }"
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
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

import { defineAsyncComponent } from 'vue'
import { mapActions } from 'vuex'

export default {
    components: {
        ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */'@/modules/shared/components/ToastNotification'))
    },
    data(){
        return{
            v$: null,
            showPassword: false,
            email: null,
            password: null,
            notification: {
                type: null,
                title: null,
                description: null,
                show: false
            },
            showNotification: false
        }
    },
    methods: {
        ...mapActions('auth', ['signInUser', 'signWithProvider']),
        async onSignIn(){
            const result = await this.v$.$validate()
            if(!result) return

            const user = {
                email: this.email,
                password: this.password
            }

            const { ok, message } = await this.signInUser(user) 
            
            if(!ok){
              this.showNotification  = true
              this.notification.show = true
              this.notification.type = 'error'
              this.notification.title = 'Error al iniciar sesión'
              this.notification.description = message
            
              return
            }
            
            this.$router.push({ name: 'profile-redirect' })
        },
        async onSignInWithProvider(provider){
            const { ok, message} = await this.signWithProvider(provider)

            if(!ok){
              this.showNotification  = true
              this.notification.show = true
              this.notification.type = 'error'
              this.notification.title = 'Error al iniciar sesión.'
              this.notification.description = message
            
              return
            }
        
            this.$router.push({ name: 'profile-redirect' })
        },  
    },
    watch:{
        showNotification(newValue){
            if(newValue){
              setTimeout(() => {
                this.showNotification = false
              }, 5500);
            }
        }
    },
    validations(){
        return{
            email: {
                required: helpers.withMessage('Este campo es obligatorio', required),
                email: helpers.withMessage('Correo electrónico no válido.', email)
            },
            password: {
                required: helpers.withMessage('Este campo es obligatorio', required)
            }
        }
    },
    created(){
        this.v$ = useVuelidate() 
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