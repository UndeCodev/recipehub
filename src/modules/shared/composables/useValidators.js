import { computed } from 'vue';
import { required, email, helpers, minLength } from '@vuelidate/validators'

const useValidators = () => {
    // Regular expressions    
    const alphaNum = helpers.regex(/^[A-Za-z0-9\s]+$/g)
    const alpha = helpers.regex(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$/)
    const passwordValidator = helpers.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/)
    
    // Customized validators
    const hasOneIngredient = (ingredients) => ingredients.some(ingredient => ingredient.text !== null && ingredient.text != '')
        
    const hasOneStep = (steps) => steps.some(step => step.text != null && step.text != '')
    const nonZeroTime = (totalTime) => totalTime !== 0 && totalTime !== null

    const isYoutubeUrl = (value) => {
        if (!value) return true; // optional field

        const urlPattern = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return urlPattern.test(value);
    }

    // Rules
    const signInRules = computed(() => ({
        email: {
            required: helpers.withMessage('Este campo es obligatorio', required),
            email: helpers.withMessage('Correo electrónico no válido.', email)
        },
        password: {
            required: helpers.withMessage('Este campo es obligatorio', required)
        }
    }));

    const signUpRules = computed(() => ({
        name: {
            required: helpers.withMessage('Este campo es obligatorio', required),
            alpha: helpers.withMessage('Solo se permite texto.', alpha)
        },
        email: {
            required: helpers.withMessage('Este campo es obligatorio', required),
            email: helpers.withMessage('Correo electrónico no válido.', email)
        },
        password: {
            required: helpers.withMessage('Este campo es obligatorio', required),
            passwordValidator: helpers.withMessage('Mínimo 8 carácteres, una minúscula, unamayúscula y un carácter especial.', passwordValidator),
        }
    }));

    const recipeFormRules = computed(() => ({
        videoURL: {
            isYoutubeUrl: helpers.withMessage('Ingresa una URL de YouTube válida.', isYoutubeUrl),
        },
        title: {
            required: helpers.withMessage('Este campo es obligatorio', required),
            alpha: helpers.withMessage('Solo se permite texto.', alpha),
        },
        description: {
            required: helpers.withMessage('Este campo es obligatorio', required),
            minLength: helpers.withMessage('El texto proporcionado es muy corto.', minLength(30))
        },
        servings: {
            required: helpers.withMessage('Este campo es obligatorio', required),
        },
        yieldRecipe: {
            alphaNum: helpers.withMessage('No se permiten carácteres especiales.', alphaNum),
        },
        ingredients: {
            hasOneIngredient: helpers.withMessage('Añade mínimo 1 ingrediente en la lista de ingredientes.', hasOneIngredient)
        },
        steps: {
            hasOneStep: helpers.withMessage('Añade mínimo 1 paso en la lista de pasos.', hasOneStep)
        },
        totalTime: {
            nonZeroTime: helpers.withMessage('Añade mínimo 1 tiempo en la lista de tiempos.', nonZeroTime)
        },
    }))

    return { 
        signInRules,
        signUpRules,
        recipeFormRules
    }
}

export default useValidators;