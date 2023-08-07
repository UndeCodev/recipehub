<template>
  <form 
      class="sign-up"
      @submit.prevent="onSubmit">
      <h1 class="heading-primary text-bold">Únete a nuestra comunidad.</h1>
      <div class="mt-sm">
          <p>Coloca tus datos para poder registrarte.</p>
          <p>
              ¿Ya tienes una cuenta?
              <RouterLink
                  :to="{ name: 'auth-sign-in' }"
                  class="router-link"
              >
                Inicia sesión
              </RouterLink>
          </p>
      </div>
      <div 
        class="form-group w-50 mt-lg m-inline-auto"
        style="height: 20rem;"
      >
        <SelectImage @on:change="(file) => user.fileImage = file"/>
      </div>
      <div class="form-group mt-lg">
          <label 
            for="name" 
            class="form-label"
            :class="{ 'text-error ': v$.name.$error }" 
          >
            Nombre completo
          </label>
          <div class="form-group__icon">
              <input 
                  type="text" 
                  class="form-input" 
                  :class="{ 'form-input--error': v$.name.$error }" 
                  placeholder="Nombre completo"
                  id="name"
                  v-model="user.name">
              <i class="fa-solid fa-id-card"></i>
          </div>
          <p 
            :class="{ 'text-error fade-in-down': v$.name.$error }" 
            v-if="v$.name.$error"
          >
            {{ v$.name.$errors[0].$message }}
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
      <button 
        type="submit"
        class="btn btn--primary btn--md mt-lg"
      >
          Registrarse
      </button>
      <p class="text-separator mt-lg">
          O también puedes
      </p>
      <div class="btn-group mt-md">
        <button 
          type="button"
          class="btn btn--secondary btn--md btn--icon-group"
          @click="onSignUpWithProvider('google')"
        >
          <i class="fa-brands fa-google"></i>
          <span>Registrarte con Google</span>
        </button>
        <button 
          type="button"
          class="btn btn--secondary btn--md btn--icon-group"
          @click="onSignUpWithProvider('facebook')"
        >
          <i class="fa-brands fa-facebook-f"></i>
          <span>Registrarte con Facebook</span>
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

import useNotification from '@/modules/shared/composables/useNotification'
import useValidators from '@/modules/shared/composables/useValidators'
import useAuth from '../composables/useAuth'

export default {
  components: {
      ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */ '@/modules/shared/components/ToastNotification')),
      SelectImage: defineAsyncComponent(() => import(/* SelectImage */ '@/modules/shared/components/SelectImage')),
  },
  setup() {
    // Composables
    const router = useRouter()

    const { 
      showNotification,
      notification, 
      toastNotification 
    } = useNotification()

    const { signUpRules } = useValidators()
    const { 
      signUpUser,
      signUpWithProvider
    } = useAuth()

    // Reactive states
    const user = ref({
      name: null,
      email: null,
      password: null,
      fileImage: null
    })

    const showPassword = ref(false);

    const v$ = useVuelidate(signUpRules, user)

    return {
      // Reactive states
      v$,
      user,
      showPassword,

      // Notification settings
      showNotification,
      notification,
      toastNotification,

      // Methods
      onSubmit: async() => {
        const isValidForm = await v$.value.$validate()
        if(!isValidForm) return
        
        const { ok, message } = await signUpUser(user.value)

        if(!ok) toastNotification('error', 'Error al registrarse.', message)
        else router.push({ name: 'profile-redirect' })
      },
      onSignUpWithProvider: async(provider) => {
        const { ok, message } = await signUpWithProvider(provider)

        if(!ok) toastNotification('error', 'Error al registrarse.', message)
        else router.push({ name: 'profile-redirect' })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/signUp';
@use '@/sass/components/form';
@use '@/sass/components/button';
@use '@/sass/components/icons';

</style>