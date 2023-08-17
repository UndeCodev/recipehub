<template>
	<form class="form-reset" @submit.prevent="onSubmit">
		<h1 class="heading-primary">Restablecer contraseña</h1>
		<div class="form-group mt-md">
			<label
				for="email"
				class="form-label"
				:class="{ 'text-error ': v$.userEmail.$error }"
			>
				Correo electrónico
			</label>
			<div class="form-group__icon">
				<input
					type="text"
					class="form-input"
					:class="{ 'form-input--error': v$.userEmail.$error }"
					placeholder="Correo electrónico"
					id="userEmail"
					v-model="userEmail"
				/>
				<i class="fa-solid fa-envelope"></i>
			</div>
			<p
				:class="{ 'text-error fade-in-down': v$.userEmail.$error }"
				v-if="v$.userEmail.$error"
			>
				{{ v$.userEmail.$errors[0].$message }}
			</p>
		</div>
		<button type="submit" class="btn btn--primary btn--md mt-md w-100">
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
import recipehubApi from '@/api/recipehubApi';
import useVuelidate from "@vuelidate/core";
import useNotification from '@/modules/shared/composables/useNotification';

import { computed, defineAsyncComponent, ref } from "vue";
import { required, email, helpers } from "@vuelidate/validators";

export default {
	components: {
        ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */ '@/modules/shared/components/ToastNotification'))
	},
	setup() {
		// Composables
		const { 
			notification,
			showNotification,
			toastNotification
		} = useNotification()

		// Reactive states
		const userEmail = ref(null);

		const rules = computed(() => ({
			userEmail: {
            	required: helpers.withMessage('Este campo es obligatorio', required),
            	email: helpers.withMessage('Correo electrónico no válido.', email)
			},
		}));

		const v$ = useVuelidate(rules, { userEmail });

		// Methods
		const passwordReset = async(email) => {
			try {
				await recipehubApi.post('/auth/password-reset', { email })

				return { ok: true }
			}catch(error) {
		        return { ok: false, message: error.response.data.message }
			}
		}

		return {
			// Reactive states
			v$,
			userEmail,
			notification,
			showNotification,

			// Methods
			onSubmit: async () => {
				const isValidForm = await v$.value.$validate()
                if(!isValidForm) return

				const { ok, message } = await passwordReset(userEmail.value)

				if(!ok) toastNotification('error', 'Error al restablecer contraseña.', message)
				else toastNotification('success', 'Correo de restablecimiento enviado.', 'Se ha enviado un correo electrónico para restablecer su contraseña')
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