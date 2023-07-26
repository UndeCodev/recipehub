<template>
  <form 
      class="sign-up"
      @submit.prevent="onSignUp">
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
        class="form-group sign-up__photo-container mt-lg"
        :style="`${!localImage ? 'border: 2px dashed #adb5bd' : ''}`"
      >
        <div
          v-show="!localImage"
          class="sign-up__photo-buttons"
        >
          <i class="fa-solid fa-image"></i>
          <button 
            type="button" 
            class="btn btn--primary mt-md"
            @click="onSelectImage"
          >
            Seleccionar foto
          </button>
          <input 
            type="file" 
            @change="onSelectedImage"
            ref="selectorImage"
            v-show="false"
            accept="image/png, image/jpeg, image/jpg"
          >
        </div>
        <div v-if="localImage">
          <img 
            :src="localImage"
            alt="Entry picture"
            class="sign-up__photo">
          <button 
            type="button" 
            class="btn btn--primary mt-md sign-up__photo-change"
            @click="onSelectImage"
          >
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
      </div>
      <div class="form-group mt-lg">
          <label 
            for="name" 
            class="form-label"
            :class="{ 'text-error ': v$.name.$error }" 
          >
            Nombre
          </label>
          <div class="form-group__icon">
              <input 
                  type="text" 
                  class="form-input" 
                  :class="{ 'form-input--error': v$.name.$error }" 
                  placeholder="Nombre completo"
                  id="name"
                  v-model="name">
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
          for="name" 
          class="form-label"
          :class="{ 'text-error ': v$.lastNames.$error }" 
        >
          Apellidos
        </label>
        <div class="form-group__icon">
          <input 
            type="text" 
            class="form-input" 
            :class="{ 'form-input--error': v$.lastNames.$error }" 
            placeholder="Apellidos"
            id="lastNames"
            v-model="lastNames">
          <i class="fa-solid fa-id-card"></i>
        </div>
        <p 
          :class="{ 'text-error fade-in-down': v$.lastNames.$error }" 
          v-if="v$.lastNames.$error"
        >
          {{ v$.lastNames.$errors[0].$message }}
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
          name: null,
          lastNames: null,
          email: null,
          password: null,
          v$: null,
          showPassword: false,
          localImage: null,
          file: null,
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
    ...mapActions('auth', ['signUpUser', 'signWithProvider']),
    async onSignUpWithProvider(provider){
      const { ok, message} = await this.signWithProvider(provider)
      
      if(!ok){
        this.showNotification  = true
        this.notification.show = true
        this.notification.type = 'error'
        this.notification.title = 'Error al registrarse.'
        this.notification.description = message

        return
      }

      this.$router.push({ name: 'profile-redirect' })
    },
    async onSignUp(){
        const result = await this.v$.$validate()
        
        if(!result) return
        
        const user = {
          file: this.file,
          name: this.name,
          lastNames: this.lastNames,
          email: this.email,
          password: this.password
        }

        const { ok, message } = await this.signUpUser(user)

        if(!ok){
          this.showNotification  = true
          this.notification.show = true
          this.notification.type = 'error'
          this.notification.title = 'Error al registrarse'
          this.notification.description = message

          return
        }

        this.$router.push({ name: 'profile-redirect' })
    },
    onSelectedImage(event){
      const file = event.target.files[0]

      if(!file){
          this.localImage = null
          this.file = null
          return
      }
      
      this.file = file
      const fr = new FileReader()
      
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL(file)
    },
    onSelectImage(){
        this.$refs.selectorImage.click()
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
    const passwordValidator = helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/)

    const alpha = helpers.regex(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/)
    
    return{
      name: {
        required: helpers.withMessage('Este campo es obligatorio', required),
        alpha: helpers.withMessage('Solo se permite texto.', alpha)
      },
      lastNames: {
        required: helpers.withMessage('Este campo es obligatorio', required),
        alpha: helpers.withMessage('Solo se permite texto.', alpha)
      },
      email: {
        required: helpers.withMessage('Este campo es obligatorio', required),
        email: helpers.withMessage('Correo electrónico no válido.', email)
      },
      password: {
        required: helpers.withMessage('Este campo es obligatorio', required),
        passwordValidator: helpers.withMessage('Mínimo 8 carácteres, una minúscula, una mayúscula y un carácter especial.', passwordValidator),
      }
    }
  },
  created(){
      this.v$ = useVuelidate() 
  }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/signUp';
@use '@/sass/components/form';
@use '@/sass/components/button';
@use '@/sass/components/icons';

</style>