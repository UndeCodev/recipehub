<template>
    <form 
        class="new-recipe"
        @submit.prevent="onSubmit"
    >
        <div class="mb-lg">
            <h1 class="heading-primary text-primary">Añade una nueva receta.</h1>
            <p>¡Subir recetas personales es fácil! Añade la tuya a tus favoritos, compártela con amigos, familiares o con la comunidad RecipeHub.</p>
        </div>
        <section class="new-recipe-group">
            <h3 class="heading-tertiary text-center">¿Tienes un vídeo en YouTube sobre como elaborar tu receta?</h3>
            <div class="d-grid new-recipe--2-columns align-items-center gap-lg">
                <div class="form-group">
                    <label 
                        for="videoURL"
                        class="heading-tertiary text-bold d-grid"
                        :class="{ 'text-error ': v$.videoURL.$error }" 
                    >
                        Añade aquí la URL de tu vídeo
                        <small class="text-normal">
                            <span class="text-bold">Nota:</span>
                            Solo se permiten vídeos de YouTube
                        </small>
                    </label>
                    <input 
                        type="text" 
                        class="form-input" 
                        :class="{ 'form-input--error': v$.videoURL.$error }" 
                        placeholder="https://www.youtube.com/watch?v=XEY-7tKkPik"
                        id="videoURL"
                        v-model.trim="recipe.videoURL"
                        @input="formatURL">
                    <p 
                        :class="{ 'text-error fade-in-down': v$.videoURL.$error }" 
                        v-if="v$.videoURL.$error"
                    >
                        {{ v$.videoURL.$errors[0].$message }}
                    </p>
                </div>
                <iframe 
                    v-if="isValidURL"
                    style="width: 100%; height: 25rem;" 
                    :src="recipe.videoURL" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen
                ></iframe>
            </div>
        </section>
        <section class="new-recipe-group new-recipe--2-columns new-recipe__principal">
            <div class="new-recipe__inputs">
                <div class="form-group">
                    <label 
                        for="title"
                        class="heading-tertiary text-bold"
                        :class="{ 'text-error ': v$.title.$error }" 
                    >
                        Título de la receta
                    </label>
                    <input 
                        type="text" 
                        class="form-input" 
                        :class="{ 'form-input--error': v$.title.$error }" 
                        placeholder="Título de la receta"
                        id="title"
                        v-model.trim="recipe.title">
                    <p 
                        :class="{ 'text-error fade-in-down': v$.title.$error }" 
                        v-if="v$.title.$error"
                    >
                        {{ v$.title.$errors[0].$message }}
                    </p>
                </div>
                <div class="form-group">
                    <label 
                        for="category"
                        class="heading-tertiary text-bold"
                    >
                        Categoría de la receta
                    </label>
                    <select 
                        class="form-input"
                        id="category"
                        v-model="recipe.category"
                    >
                        <option 
                            v-for="{ category, _id } in categories"
                            :key="_id"
                            :value="_id"
                        >
                            {{ category }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label 
                        for="description"
                        class="heading-tertiary text-bold"
                        :class="{ 'text-error ': v$.description.$error }" 
                    >
                        Descripción de la receta
                    </label>
                    <textarea 
                        id="description"
                        class="form-input form-textarea"
                        :class="{ 'form-input--error': v$.description.$error }" 
                        placeholder="Descripción de la receta"
                        v-model.trim="recipe.description"
                    ></textarea>
                    <p 
                        :class="{ 'text-error fade-in-down': v$.description.$error }" 
                        v-if="v$.description.$error"
                    >
                        {{ v$.description.$errors[0].$message }}
                    </p>
                </div>
            </div>
            <div class="new-recipe__upload">
                <SelectImage @on:change="(file) => recipe.fileImage = file"/>
            </div>
        </section>
        <section class="new-recipe-group">
            <div class="form-group">
                <h3 class="heading-tertiary text-bold">Ingredientes</h3>
                <p>Introduzca un ingrediente por línea. Incluya la cantidad (por ejemplo, tazas, cucharadas) y cualquier preparación especial (por ejemplo, tamizada, ablandada, picada). Utilice encabezados opcionales para organizar las distintas partes de la receta (por ejemplo, Tarta, Glaseado, Aderezo).</p>
            </div>
            <div 
                class="form-group new-recipe__ingredients"
                v-for="(ingredient, index) in recipe.ingredients"
                :key="index"
            >
                <input 
                    type="text"
                    class="form-input"
                    :class="{ 'form-input--error': v$.ingredients.$error }" 
                    :placeholder="ingredient.placeholder"
                    v-model.trim="ingredient.ingredient"
                    :id="'ingredient-' + index">
                <i 
                    class="fa-solid fa-trash cursor-pointer"
                    @click="removeElement(recipe.ingredients, index)"
                ></i>
            </div>
            <p 
                :class="{ 'text-error fade-in-down': v$.ingredients.$error }" 
                v-if="v$.ingredients.$error"
            >
                {{ v$.ingredients.$errors[0].$message }}
            </p>
            <div class="d-flex gap-md mt-sm">
                <button 
                    type="button"
                    class="btn btn--secondary btn--md"
                    disabled
                >
                    Añadir encabezado
                </button>
                <button 
                    type="button" 
                    class="btn btn--primary btn--md"
                    @click="addElement(recipe.ingredients, 'Añáde un nuevo ingrediente.')"
                >
                    Añadir ingrediente
                </button>
            </div>
        </section>
        <section class="new-recipe-group">
            <div class="form-group">
                <h3 class="heading-tertiary text-bold">Pasos</h3>
                <p>Explique cómo hacer su receta, incluyendo las temperaturas del horno, los tiempos de horneado o cocción y los tamaños de los moldes, etc. Utiliza encabezados opcionales para organizar las distintas partes de la receta (por ejemplo, Preparación, Horneado, Decoración).</p>
            </div>
            <div 
                class="form-group new-recipe__ingredients"
                v-for="(step, index) in recipe.steps"
                :key="index + 1"
            >   
                <div class="form-group">
                    <label 
                        class="heading-tertiary text-bold"
                        :class="{ 'text-error ': v$.steps.$error }" 
                        :for="`step-${index + 1}`"
                    >
                        Paso {{ index + 1 }}
                    </label>
                    <textarea
                        class="form-input form-textarea"
                        :class="{ 'form-input--error': v$.steps.$error }" 
                        :placeholder="step.placeholder"
                        v-model.trim="step.text"
                        :id="`step-${index + 1}`"
                    ></textarea>
                </div>
                <i 
                    class="fa-solid fa-trash cursor-pointer"
                    @click="removeElement(recipe.steps, index)"
                ></i>
            </div>
            <p 
                :class="{ 'text-error fade-in-down': v$.steps.$error }" 
                v-if="v$.steps.$error"
            >
                {{ v$.steps.$errors[0].$message }}
            </p>
            <div class="d-flex gap-md mt-sm">
                <button 
                    type="button"
                    class="btn btn--secondary btn--md"
                    disabled
                >
                    Añadir encabezado
                </button>
                <button 
                    type="button" 
                    class="btn btn--primary btn--md"
                    @click="addElement(recipe.steps, 'Añáde un nuevo paso')"
                >
                    Añadir paso
                </button>
            </div>
        </section>
        <section class="new-recipe-group new-recipe--2-columns align-items-start">
            <div class="form-group">
                <label 
                    for="servings"
                    class="heading-tertiary text-bold"
                    :class="{ 'text-error ': v$.servings.$error }" 
                >
                    Raciones
                </label>
                <input 
                    type="number" 
                    class="form-input"
                    :class="{ 'form-input--error': v$.servings.$error }" 
                    id="servings"
                    min="1"
                    placeholder="e.g. 8"
                    v-model.trim="recipe.servings">
                <p 
                    :class="{ 'text-error fade-in-down': v$.servings.$error }" 
                    v-if="v$.servings.$error"
                >
                    {{ v$.servings.$errors[0].$message }}
                </p>
            </div>
            <div class="form-group">
                <label 
                    for="yieldRecipe"
                    class="heading-tertiary text-bold"
                    :class="{ 'text-error ': v$.yieldRecipe.$error }" 
                >
                    Rendimiento (opcional)
                </label>
                <input 
                    type="text" 
                    class="form-input"
                    :class="{ 'form-input--error': v$.yieldRecipe.$error }" 
                    id="yieldRecipe"
                    placeholder="e.g. 1 9-inch cake"
                    v-model.trim="recipe.yieldRecipe">
                <p 
                    :class="{ 'text-error fade-in-down': v$.yieldRecipe.$error }" 
                    v-if="v$.yieldRecipe.$error"
                >
                    {{ v$.yieldRecipe.$errors[0].$message }}
                </p>
            </div>
        </section>
        <section class="new-recipe-group">
            <div 
                class="new-recipe__time"
                v-for="(time, index) in recipe.times"
                :key="index"
            >
                <label 
                    :for="time.type"
                    class="heading-tertiary text-bold"
                    :class="{ 'text-error ': v$.totalTime.$error }" 
                >
                    {{ time.title }}
                </label>
                <input 
                    type="number" 
                    :id="time.type"
                    class="form-input form-input-time"
                    :class="{ 'form-input--error': v$.totalTime.$error }" 
                    placeholder="0"
                    min="0"
                    v-model="time.time"
                    @change="calculateTime()"
                >
                <select 
                    class="form-input"
                    :class="{ 'form-input--error': v$.totalTime.$error }" 
                    @change="changeUnits($event, index)"
                >
                    <option value="minutos">minutos</option>
                    <option value="horas">horas</option>
                    <option value="días">días</option>
                </select>
            </div>
            <div class="new-recipe__time new-recipe__time--2-columns">
                <p class="heading-tertiary text-bold">Tiempo total</p>
                <p>{{ recipe.totalTime }}</p>
            </div>
            <p 
                :class="{ 'text-error fade-in-down': v$.totalTime.$error }" 
                v-if="v$.totalTime.$error"
            >
                {{ v$.totalTime.$errors[0].$message }}
            </p>
        </section>
        <section class="new-recipe-group">
            <h3 class="heading-tertiary">¿Quieres hacer pública esta receta?</h3>
            <div class="form-group__checkbox">
                <input 
                    type="checkbox" 
                    checked
                    disabled
                    id="publicRecipe"
                    class="form-checkbox">
                <div class="d-grid">
                    <label for="publicRecipe">Recetas públicas</label>
                    <small>Cualquiera que vea mi perfil puede ver esta receta.</small>
                </div>
            </div>
            <div class="form-group__checkbox">
                <input 
                    type="checkbox" 
                    id="sendRecipe"
                    class="form-checkbox">
                <div class="d-grid">
                    <label for="sendRecipe">Enviar esta receta para revisión.</label>
                    <small>
                        <span class="text-bold">Más información:</span> 
                        Comparta su receta con la comunidad. Si tu receta es seleccionada por nuestros editores, se publicará en el sitio. Otros cocineros caseros podrán guardar, revisar, comentar y compartir su receta.
                    </small>
                </div>
            </div>
            <div class="d-flex gap-md mt-sm justify-content-end">
                <button 
                    type="button"
                    class="btn btn--secondary btn--md d-flex gap-sm align-items-center"
                    @click="addHeaderIngredients"
                    disabled
                >
                    Borrar formulario
                    <i class="fa-solid fa-trash"></i>
                </button>
                <button 
                    type="submit" 
                    class="btn btn--primary btn--md d-flex gap-sm align-items-center"
                >
                    Enviar receta
                    <i class="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </section>
    </form>
    <Transition v-if="showNotification">
        <ToastNotification 
          :notification="notification"
        />
    </Transition>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { defineAsyncComponent, ref } from 'vue'

import useValidators from '@/modules/shared/composables/useValidators'
import useNotification from '@/modules/shared/composables/useNotification'
import useRecipes from '@/modules/recipes/composables/useRecipes'

export default {
    components: {
      ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */'@/modules/shared/components/ToastNotification')),
      SelectImage: defineAsyncComponent(() => import(/* SelectImage */ '@/modules/shared/components/SelectImage')),
    },
    setup() {
        // Composables
        const { recipeFormRules } = useValidators()

        const { 
            // Reactive states
            recipe,
            categories,
            
            // Methods
            getRecipeCategories,
            createNewRecipe,
            addElement,
            removeElement,
            changeUnits,
            calculateTime
        } = useRecipes()

        const { 
            notification,
            showNotification,
            toastNotification
        } = useNotification()

        // Reactive states
        const isValidURL = ref(false)

        const v$ = useVuelidate(recipeFormRules, recipe)

        // Methods
        const onLoadCategories = async() => {
            const { ok, message } = await getRecipeCategories()

            if(!ok) toastNotification('error', 'Error al cargar las categorías.', message)
            else recipe.value.category = categories.value[0]._id
        }

        onLoadCategories()

        const onSubmit = async() => {
            const isValidForm = await v$.value.$validate()

            if(!isValidForm) return toastNotification('error', 'Error al enviar el formulario', 'Faltan campos por llenar, verifica que todos estén correctos.')
            
            const { ok, message  } = await createNewRecipe()

            if(!ok) 
                toastNotification('error', 'Error al enviar el formulario', message)
            else 
                toastNotification('success', 'Receta registrada correctamente', 'Ahorapuedes ver la receta publicada en tu perfil.')
        }

        return { 
            // Reactive states
            v$,
            recipe,
            notification,
            showNotification,
            isValidURL,
            categories,

            // Methods
            onSubmit,
            addElement,
            removeElement,
            changeUnits,
            calculateTime
        }
    },
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/newRecipe';
@use '@/sass/components/form';
@use '@/sass/components/icons';
@use '@/sass/components/button';
</style>