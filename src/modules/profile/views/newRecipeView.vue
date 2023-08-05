<template>
    <form 
        class="new-recipe"
        @submit.prevent="onSubmitRecipe"
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
                        :class="{ 'text-error ': v$.recipe.videoURL.$error }" 
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
                        :class="{ 'form-input--error': v$.recipe.videoURL.$error }" 
                        placeholder="https://www.youtube.com/watch?v=XEY-7tKkPik"
                        id="videoURL"
                        v-model.trim="recipe.videoURL"
                        @input="formatURL">
                    <p 
                        :class="{ 'text-error fade-in-down': v$.recipe.videoURL.$error }" 
                        v-if="v$.recipe.videoURL.$error"
                    >
                        {{ v$.recipe.videoURL.$errors[0].$message }}
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
                            v-for="{ category, category_id } in categories"
                            :key="category"
                            :value="category_id"
                        >
                            {{ category }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label 
                        for="description"
                        class="heading-tertiary text-bold"
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
                        @click="$refs.selectorImage.click()"
                    >
                        Seleccionar imagen
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
                        @click="$refs.selectorImage.click()"
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
                    :class="{ 'form-input--error': v$.recipe.ingredients.$error }" 
                    :placeholder="ingredient.placeholder"
                    v-model.trim="ingredient.text"
                    :id="'ingredient-' + index">
                <i 
                    class="fa-solid fa-trash cursor-pointer"
                    @click="removeIngredient(index)"
                ></i>
            </div>
            <p 
                :class="{ 'text-error fade-in-down': v$.recipe.ingredients.$error }" 
                v-if="v$.recipe.ingredients.$error"
            >
                {{ v$.recipe.ingredients.$errors[0].$message }}
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
                        class="heading-tertiary text-bold"
                        :class="{ 'text-error ': v$.recipe.steps.$error }" 
                        :for="`step-${index + 1}`"
                    >
                        Paso {{ index + 1 }}
                    </label>
                    <textarea
                        class="form-input form-textarea"
                        :class="{ 'form-input--error': v$.recipe.steps.$error }" 
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
            <p 
                :class="{ 'text-error fade-in-down': v$.recipe.steps.$error }" 
                v-if="v$.recipe.steps.$error"
            >
                {{ v$.recipe.steps.$errors[0].$message }}
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
                    class="heading-tertiary text-bold"
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
                    v-model.trim="recipe.servings">
                <p 
                    :class="{ 'text-error fade-in-down': v$.recipe.servings.$error }" 
                    v-if="v$.recipe.servings.$error"
                >
                    {{ v$.recipe.servings.$errors[0].$message }}
                </p>
            </div>
            <div class="form-group">
                <label 
                    for="yieldRecipe"
                    class="heading-tertiary text-bold"
                    :class="{ 'text-error ': v$.recipe.yieldRecipe.$error }" 
                >
                    Rendimiento (opcional)
                </label>
                <input 
                    type="text" 
                    class="form-input"
                    :class="{ 'form-input--error': v$.recipe.yieldRecipe.$error }" 
                    id="yieldRecipe"
                    placeholder="e.g. 1 9-inch cake"
                    v-model.trim="recipe.yieldRecipe">
                <p 
                    :class="{ 'text-error fade-in-down': v$.recipe.yieldRecipe.$error }" 
                    v-if="v$.recipe.yieldRecipe.$error"
                >
                    {{ v$.recipe.yieldRecipe.$errors[0].$message }}
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
                    :class="{ 'text-error ': v$.recipe.totalTime.$error }" 
                >
                    {{ time.title }}
                </label>
                <input 
                    type="number" 
                    :id="time.type"
                    class="form-input form-input-time"
                    :class="{ 'form-input--error': v$.recipe.totalTime.$error }" 
                    placeholder="0"
                    min="0"
                    v-model="time.time"
                    @change="calculateTotalTime"
                >
                <select 
                    class="form-input"
                    :class="{ 'form-input--error': v$.recipe.totalTime.$error }" 
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
                :class="{ 'text-error fade-in-down': v$.recipe.totalTime.$error }" 
                v-if="v$.recipe.totalTime.$error"
            >
                {{ v$.recipe.totalTime.$errors[0].$message }}
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
import { helpers, required, minLength } from '@vuelidate/validators'

import { defineAsyncComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

export default {
    components: {
      ToastNotification: defineAsyncComponent(() => import(/* ToastNotification */'@/modules/shared/components/ToastNotification'))
    },
    data(){
        return{
            v$: null,
            recipe: {
                videoURL: null,
                coverRecipe: null,
                title: null,
                category: null,
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
                yieldRecipe: null,
                times: [
                    {
                        title: 'Tiempo de preparación',
                        type: 'Tiempo de preparación',
                        time: 0,
                        timeUnits: 'minutos'
                    },
                    {
                        title: 'Tiempo de cocción (opcional)',
                        type: 'Tiempo de cocción',
                        time: 0,
                        timeUnits: 'minutos'
                    },
                ],
                totalTime: 0
            },
            categories: null,
            isValidURL: false,
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
        ...mapActions('recipes', ['postRecipe']),
        async onSubmitRecipe(){
            const isValidateForm = await this.v$.$validate()

            if(!isValidateForm){
                this.showNotification  = true
                this.notification.show = true
                this.notification.type = 'error'
                this.notification.title = 'Error al enviar el formulario.'
                this.notification.description = 'Faltan campos por llenar, verifica que todos estén correctos.'

                return
            }

            const { ok, message  } = await this.postRecipe(this.recipe)
            
            if(!ok){
              this.showNotification  = true
              this.notification.show = true
              this.notification.type = 'error'
              this.notification.title = 'Error al registrar la receta'
              this.notification.description = message

              return
            }

            this.showNotification  = true
            this.notification.show = true
            this.notification.type = 'success'
            this.notification.title = 'Receta registrada correctamente'
            this.notification.description = 'La receta se registró correctamente, ahora la puedes ver en tu perfil.'

            setTimeout(() => {
                this.$router.push({ name: 'profile-my-recipes' })
            }, 5500);
        },
        async getCategories(){
            try {
                const response = await fetch('http://localhost:3000/category')

                if(!response.ok){
                    const { message } = await response.json()
                    throw new Error(message)
                }

                this.categories = await response.json()
                this.recipe.category = this.categories[0].category_id
            } catch (error) {
                this.showNotification  = true
                this.notification.show = true
                this.notification.type = 'error'
                this.notification.title = error.message
                this.notification.description = 'No se pudieron cargar las categorías de las recetas, intenta de nuevo más tarde.'

                setTimeout(() => {
                    this.$router.push({ name: 'recipes' })
                }, 5500);
            }
        },
        onSelectedImage(event){
          const file = event.target.files[0]

          if(!file){
              this.tempPathCover = null
              this.recipe.coverRecipe = null
              return
          }

          this.recipe.coverRecipe = file
          const fr = new FileReader()

          fr.onload = () => this.tempPathCover = fr.result
          fr.readAsDataURL(file)
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
                placeholder: 'Añade otro paso.',
                text: null,
            })
        },
        removeStep(index){
            if(this.recipe.steps.length === 1) return
            else this.recipe.steps.splice(index, 1)
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
                días: 1440
            };

            let totalTime = 0;

            for (const time of this.recipe.times) {
                totalTime += time.time * conversion[time.timeUnits]
            }

            const days = Math.floor(totalTime / conversion.días)
            const hours = Math.floor((totalTime % conversion.días) / conversion.horas)
            const minutes = (totalTime % conversion.días) % conversion.horas

            this.recipe.totalTime = this.formatTime(days, hours, minutes) || 0
        },
        formatTime(days, hours, minutes){
           const timeUnits = [
              { value: days, unit: "días" },
              { value: hours, unit: "horas" },
              { value: minutes, unit: "minutos" }
            ];
         
            const nonZeroUnits = timeUnits.filter(({ value }) => value > 0);
            const formattedUnits = nonZeroUnits.map(({ value, unit }) => `${value} ${unit}`);

            let result = formattedUnits.join(", ");

            const lastCommaIndex = result.lastIndexOf(",");

            if (lastCommaIndex !== -1) {
              result = result.slice(0, lastCommaIndex) + " y" + result.slice(lastCommaIndex + 1);
            }

            return result
        },
        formatURL(){
            if(this.recipe.videoURL === null || this.recipe.videoURL === '') return
            const videoId = this.recipe.videoURL.split('v=')[1] || this.recipe.videoURL.split('/embed/')[1];

            if(!videoId){
                this.isValidURL = false
                this.v$.recipe.videoURL.$touch()
                
                return
            }
            
            this.isValidURL = true
            this.recipe.videoURL = `https://www.youtube.com/embed/${videoId}`;
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
        const alphaNum = helpers.regex(/^[A-Za-z0-9\s]+$/g)
        const alpha = helpers.regex(/^[a-zA-ZñáéíóúÁÉÍÓÚ\s]*$/)

        const hasOneIngredient = (ingredients) => ingredients.some(ingredient => ingredient.text !== null && ingredient.text != '')
        
        const hasOneStep = (steps) => steps.some(step => step.text != null && step.text != '')
        const nonZeroTime = (totalTime) => totalTime !== 0 && totalTime !== null

        const isYoutubeUrl = (value) => {
            if (!value) return true; // optional field

            const urlPattern = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
            return urlPattern.test(value);
        }

        return{
            recipe: {
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
            }
        }
    },
    computed: {
        ...mapState('auth', ['user'])
    },
    created(){
        this.v$ = useVuelidate() 
        this.getCategories()
        this.recipe.user_id = this.user.user_id
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/pages/newRecipe';
@use '@/sass/components/form';
@use '@/sass/components/icons';
@use '@/sass/components/button';
</style>