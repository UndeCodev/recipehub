<template>
    <form 
        class="new-recipe"
        @submit.prevent="onSubmitRecipe"
    >
        <div class="mb-lg">
            <h1 class="heading-primary text-primary">Añade una nueva receta.</h1>
            <p>¡Subir recetas personales es fácil! Añade la tuya a tus favoritos, compártela con amigos, familiares o con la comunidad RecipeHub.</p>
        </div>
        <section class="new-recipe-group new-recipe--2-columns new-recipe__principal">
            <div class="new-recipe__inputs">
                <div class="form-group">
                    <label 
                        for="title"
                        class="text-bold"
                        :class="{ 'text-error ': v$.recipe.title.$error }" 
                    >
                        Título de la receta
                    </label>
                    <input 
                        type="text" 
                        class="form-input" 
                        :class="{ 'form-input--error': v$.recipe.title.$error }" 
                        placeholder="Título de la receta"
                        id="title"
                        v-model.trim="recipe.title">
                    <p 
                        :class="{ 'text-error fade-in-down': v$.recipe.title.$error }" 
                        v-if="v$.recipe.title.$error"
                    >
                        {{ v$.recipe.title.$errors[0].$message }}
                    </p>
                </div>
                <div class="form-group">
                    <label 
                        for="description"
                        class="text-bold"
                        :class="{ 'text-error ': v$.recipe.description.$error }" 
                    >
                        Descripción de la receta
                    </label>
                    <textarea 
                        id="description"
                        class="form-input form-textarea"
                        :class="{ 'form-input--error': v$.recipe.description.$error }" 
                        placeholder="Descripción de la receta"
                        v-model.trim="recipe.description"
                    ></textarea>
                    <p 
                        :class="{ 'text-error fade-in-down': v$.recipe.description.$error }" 
                        v-if="v$.recipe.description.$error"
                    >
                        {{ v$.recipe.description.$errors[0].$message }}
                    </p>
                </div>
            </div>
            <div 
                class="new-recipe__upload"
                :style="`${!tempPathCover ? 'border: 2px dashed #adb5bd' : ''}`"
            >
                <div 
                    v-show="!tempPathCover" 
                    class="new-recipe__upload-buttons"
                >
                    <i class="fa-solid fa-image"></i>
                    <button 
                        type="button"
                        class="btn btn--primary"
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
                <div 
                    v-if="tempPathCover"
                    class="new-recipe__upload-photo"
                >
                    <img 
                        :src="tempPathCover"
                        alt="Entry picture">
                    <button 
                        type="button"
                        class="btn btn--primary"
                        @click="onSelectImage"
                    >
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                </div>
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
                    :placeholder="ingredient.placeholder"
                    v-model.trim="ingredient.text"
                    :id="'ingredient-' + index">
                <i 
                    class="fa-solid fa-trash cursor-pointer"
                    @click="removeIngredient(index)"
                ></i>
            </div>
            <div class="d-flex gap-md mt-sm">
                <button 
                    type="button"
                    class="btn btn--secondary btn--md"
                    @click="addHeaderIngredients"
                    disabled
                >
                    Añadir encabezado
                </button>
                <button 
                    type="button" 
                    class="btn btn--primary btn--md"
                    @click="addIngredient"
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
                        class="text-bold"
                        :for="`step-${index + 1}`"
                    >
                        Paso {{ index + 1 }}
                    </label>
                    <textarea
                        class="form-input form-textarea"
                        :placeholder="step.placeholder"
                        v-model.trim="step.text"
                        :id="`step-${index + 1}`"
                    ></textarea>
                </div>
                <i 
                    class="fa-solid fa-trash cursor-pointer"
                    @click="removeStep(index)"
                ></i>
            </div>
            <div class="d-flex gap-md mt-sm">
                <button 
                    type="button"
                    class="btn btn--secondary btn--md"
                    @click="addHeaderIngredients"
                    disabled
                >
                    Añadir encabezado
                </button>
                <button 
                    type="button" 
                    class="btn btn--primary btn--md"
                    @click="addStep"
                >
                    Añadir paso
                </button>
            </div>
        </section>
        <section class="new-recipe-group new-recipe--2-columns align-items-start">
            <div class="form-group">
                <label 
                    for="servings"
                    class="text-bold"
                    :class="{ 'text-error ': v$.recipe.servings.$error }" 
                >
                    Raciones
                </label>
                <input 
                    type="number" 
                    class="form-input"
                    :class="{ 'form-input--error': v$.recipe.servings.$error }" 
                    id="servings"
                    min="1"
                    placeholder="e.g. 8"
                    v-model="recipe.servings">
                <p 
                    :class="{ 'text-error fade-in-down': v$.recipe.servings.$error }" 
                    v-if="v$.recipe.servings.$error"
                >
                    {{ v$.recipe.servings.$errors[0].$message }}
                </p>
            </div>
            <div class="form-group">
                <label 
                    for="yield"
                    class="text-bold"
                    :class="{ 'text-error ': v$.recipe.yield.$error }" 
                >
                    Rendimiento (opcional)
                </label>
                <input 
                    type="text" 
                    class="form-input"
                    :class="{ 'form-input--error': v$.recipe.yield.$error }" 
                    id="yield"
                    placeholder="e.g. 1 9-inch cake"
                    v-model="recipe.yield">
                <p 
                    :class="{ 'text-error fade-in-down': v$.recipe.yield.$error }" 
                    v-if="v$.recipe.yield.$error"
                >
                    {{ v$.recipe.yield.$errors[0].$message }}
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
                    class="text-bold"
                >
                    {{ time.title }}
                </label>
                <input 
                    type="number" 
                    :id="time.type"
                    class="form-input form-input-time"
                    placeholder="0"
                    min="0"
                    v-model="time.time"
                    @change="calculateTotalTime"
                >
                <select 
                    class="form-input"
                    @change="changeUnits($event, index)"
                >
                    <option value="minutos">minutos</option>
                    <option value="horas">horas</option>
                    <option value="dias">días</option>
                </select>
            </div>
            <div class="new-recipe__time new-recipe__time--2-columns">
                <p class="heading-tertiary text-bold">Tiempo total</p>
                <p>{{ recipe.totalTime }}</p>
            </div>
        </section>
        <section class="new-recipe-group">
            <h3 class="heading-tertiary">¿Quieres hacer esta receta pública?</h3>
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
                    @click="addStep"
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
import { helpers, required, minLength, alphaNum } from '@vuelidate/validators'

import { defineAsyncComponent } from 'vue'

export default {
    components: {
      ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */'@/modules/shared/components/ToastNotification'))
    },
    data(){
        return{
            v$: null,
            recipe: {
                coverRecipe: null,
                title: null,
                description: null,
                ingredients: [
                    { 
                        placeholder: '1 taza de harina',
                        text: null
                    },
                    { 
                        placeholder: '2 cucharadas de azúcar',
                        text: null
                    },
                    { 
                        placeholder: '1/2 cucharaditas de sal',
                        text: null
                    },
                ],
                steps: [
                    { 
                        placeholder: 'Precalentar el horno a 180°C...',
                        text: null
                    },
                    { 
                        placeholder: 'Mezclar los ingredientes secos en un tazón grande...',
                        text: null
                    },
                    { 
                        placeholder: 'Hornear durante 25 minutos o hasta que el pastel esté dorado...',
                        text: null
                    },
                ],
                servings: null,
                yield: null,
                times: [
                    {
                        title: 'Tiempo de preparación',
                        type: 'prepTime',
                        time: null,
                        timeUnits: 'minutos'
                    },
                    {
                        title: 'Tiempo de cocción',
                        type: 'cookTime',
                        time: null,
                        timeUnits: 'minutos'
                    },
                ],
                totalTime: 0
            },
            tempPathCover: null,
            notification: {
              type: null,
              title: null,
              description: null,
              show: false
            },
            showNotification: false
        }
    },
    methods:{
        async onSubmitRecipe(){
            const result = await this.v$.$validate()

            if(!result){
                this.showNotification  = true
                this.notification.show = true
                this.notification.type = 'error'
                this.notification.title = 'Error al enviar el formulario.'
                this.notification.description = 'Faltan campos por llenar, verifica que todos estén correctos.'

                return
            }
        },
        onSelectedImage(event){
          const file = event.target.files[0]

          if(!file){
              this.tempPathCover = null
              this.coverRecipe = null
              return
          }

          this.coverRecipe = file
          const fr = new FileReader()

          fr.onload = () => this.tempPathCover = fr.result
          fr.readAsDataURL(file)
        },
        onSelectImage(){
            this.$refs.selectorImage.click()
        },
        addIngredient(){
            this.recipe.ingredients.push({
                placeholder: 'Añáde un ingrediente',
                text: null,
            })
        },
        removeIngredient(index){
            if(this.recipe.ingredients.length === 1) return
            else this.recipe.ingredients.splice(index, 1)
        },
        addStep(){
            this.recipe.steps.push({
                placeholder: 'Añáde otro paso.',
                text: null,
            })
        },
        removeStep(index){
            console.log(index);
            
            if(this.recipe.steps.length === 1) return
            else this.recipe.steps.splice(index, 1)
        },
        addHeaderIngredients(){
            const hasHeader = this.recipe.ingredients.some(ingredient => ingredient.header)
            console.log(hasHeader);
        },
        changeUnits(event, index){
            const unit = event.target.value.trim()
            
            this.recipe.times[index].timeUnits = unit
            this.calculateTotalTime()
        },
        calculateTotalTime(){
            const conversion = {
                minutos: 1,
                horas: 60,
                dias: 1440
            };

            let tiempoTotal = 0;

            for (const time of this.recipe.times) {
                tiempoTotal += time.time * conversion[time.timeUnits]
            }
            
            const dias = Math.floor(tiempoTotal / conversion.dias)
            const horas = Math.floor((tiempoTotal % conversion.dias) / conversion.horas)
            const minutos = (tiempoTotal % conversion.dias) % conversion.horas

            let resultado = ''

            if (dias > 0) {
              resultado += `${dias} días`;
            }
            
            if (horas > 0) {
              if (resultado.length > 0) {
                resultado += ", ";
              }
              resultado += `${horas} horas`;
            }
            
            if (minutos > 0 || resultado.length === 0) {
              if (resultado.length > 0) {
                resultado += " y ";
              }
              resultado += `${minutos} minutos`;
            }

            this.recipe.totalTime = resultado
        }
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
        const alpha = helpers.regex(/^[a-zA-Z\s]*$/)

        return{
            recipe: {
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
                yield: {
                    alphaNum: helpers.withMessage('No se permiten carácteres especiales.', alphaNum),
                }
            }
        }
    },
    created(){
        this.v$ = useVuelidate() 
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/newRecipe';
@use '@/sass/components/form';
@use '@/sass/components/icons';
@use '@/sass/components/button';
</style>