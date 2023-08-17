<template>
	<form class="form-reset" @submit.prevent="onSubmit">
		<h1 class="heading-primary">Crea tu nueva contraseña</h1>
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
            <label 
                for="confirmPassword" 
                class="form-label"
                :class="{ 'text-error ': v$.confirmPassword.$error }" 
            >
                Confirmar contraseña
            </label>
            <div class="form-group__icon">
                <input 
                    :type="!showConfirmPassword ? 'password' : 'text'" 
                    class="form-input" 
                    :class="{ 'form-input--error': v$.confirmPassword.$error }" 
                    placeholder="Confirmar contraseña"
                    id="confirmPassword"
                    v-model="confirmPassword">
                <i 
                    class="fa-solid cursor-pointer"
                    :class="!showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'"
                    @click="showConfirmPassword = !showConfirmPassword"
                ></i>
            </div>
            <p 
                :class="{ 'text-error fade-in-down': v$.confirmPassword.$error }" 
                v-if="v$.confirmPassword.$error"
            >
                {{ v$.confirmPassword.$errors[0].$message }}
            </p>
        </div>
		<button type="submit" class="btn btn--primary btn--md mt-lg w-100">
			Restablecer contraseña
		</button>
	</form>
	<Transition v-if="showNotification">
        <ToastNotification 
          :notification="notification"
        />
    </Transition>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import recipehubApi from '@/api/recipehubApi';
import useNotification from '@/modules/shared/composables/useNotification';

import { computed, defineAsyncComponent, onMounted, ref, watch } from "vue";
import { required, sameAs, helpers } from "@vuelidate/validators";
import { useRouter } from 'vue-router';

export default {
	props: {
		token: {
			type: String,
			required: true
		}
	},
	components: {
        ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */ '@/modules/shared/components/ToastNotification'))
	},
	setup(props) {
		// Composables
		const { 
			notification,
			showNotification,
			toastNotification
		} = useNotification()

		const router = useRouter()

		// Reactive states
		const password = ref(null),
			  confirmPassword = ref(null),
			  showPassword = ref(false),
			  showConfirmPassword = ref(false)

	    const passwordValidator = helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/)

		const rules = computed(() => ({
			password: {
            	required: helpers.withMessage('Este campo es obligatorio', required),
	            passwordValidator: helpers.withMessage('Mínimo 8 carácteres, una minúscula, unamayúscula y un carácter especial.', passwordValidator),
			},
			confirmPassword: {
            	required: helpers.withMessage('Este campo es obligatorio', required),
				sameAs: helpers.withMessage('Las contraseñas no coinciden', sameAs(password))
			}
		}));

		const v$ = useVuelidate(rules, { password, confirmPassword });

		// Methods
		const resetPassword = async(password) => {
			try {
				await recipehubApi.post(`/auth/reset-password/${props.token}`, { password });

				return { ok: true }
			}catch(error) {
		        return { ok: false, message: error.response.data.message }
			}
		}

		const verifyToken = async(token) => {
			try {
				await recipehubApi.get('/auth/verify-reset-token', {
        		    headers: {
        		        'x-access-token': token
        		    }
        		});

				return { ok: true }
			}catch(error) {
		        return { ok: false, message: error.response.data.message }
			}
		}

		const verifiedToken = async(token) => {
			const { ok } = await verifyToken(token)

			if(!ok) return router.push({ name: 'auth-sign-in' })
		}

		watch(
            () => props.token,
            async() => {
                await verifiedToken(props.token)
            }
        )

		// Lifecycle hooks
		onMounted(async() => {
			await verifiedToken(props.token)
		})

		return {
			// Reactive states
			v$,
			password,
			confirmPassword,
			showPassword,
			showConfirmPassword,
			notification,
			showNotification,

			// Methods
			onSubmit: async () => {
				const isValidForm = await v$.value.$validate()
                if(!isValidForm) return

				const { ok, message } = await resetPassword(password.value)
				
				if(!ok) toastNotification('error', 'Error al restablecer contraseña.', message)
				else {
					toastNotification('success', 'Restablecimiento completado.', 'Tú contraseña ha sido restablecida correctamente.')
					setTimeout(() => {
						router.push({ name: 'auth-sign-in' })
					}, 5500);
				}
			},
		};
	},
};
</script>

<style lang="scss" scoped>
@use "@/sass/components/button";
@use "@/sass/components/form";

.form-reset{
    width: min(50rem, 100%); 
    margin-inline: auto;

    @media (width > 768px){
        padding-inline: 2rem;
    }
}
</style>