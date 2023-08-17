import recipehubApi from '@/api/recipehubApi';

import { computed, ref } from 'vue';
import { useStore } from "vuex";

import { addElement, removeElement, calculateTotalTime } from '@/modules/recipes/helpers/newRecipeHelper';

const useRecipes = () => {
    // Composables
    const store = useStore();

    // Reactive states
    const userId = computed(() => store.getters['auth/userId']);
    
    const recipe = ref({
        userId,
        videoURL: null,
        fileImage: null,
        title: 'asdasdasdasd',
        category: null,
        description: 'asd asd asd asd asd as das das das das das dasd asdssda ssss',
        ingredients: [
            { 
                placeholder: '1 taza de harina',
                ingredient: null
            },
            { 
                placeholder: '2 cucharadas de azúcar',
                ingredient: null
            },
            { 
                placeholder: '1/2 cucharaditas de sal',
                ingredient: null
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
        servings: 2,
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
        totalTime: 0,
    })

    const recipesByAuthor = ref(),
          recipeById = ref();

    let page = ref(1),
        recipes = ref(null),
        lastRecipe = ref(null) 

    const categories = ref()

    let observer = new IntersectionObserver((entrys, observador) => {
        console.log(entrys);
    
        // entradas.forEach(entrada => {
        //     if(entrada.isIntersecting){
        //         pagina++;
        //         cargarPeliculas();
        //     }
        // });
    }, {
        rootMargin: '0px 0px 200px 0px',
        threshold: 1.0
    });
        
    // Methods
    const changeUnits = (event, index) =>{
        const unit = event.target.value.trim()
        
        recipe.value.times[index].timeUnits = unit
        calculateTime()
    }
    
    const calculateTime = () => {
        recipe.value.totalTime = calculateTotalTime(recipe.value.times)
    }

    const getRecipes = async() => {
        try {
            const { data } = await recipehubApi.get('/recipe')

            recipes.value = data
        }catch(error) {
            throw new Error(error.response.data.message)
        }
    }

    const getRecipesByCategory = async(category) => {
        try {
            const { data } = await recipehubApi.get(`/recipe/category/${category}`)

            recipes.value = data.length ? data : null  
        }catch(error) {
            throw new Error(error.response.data.message)
        }
    }

    const getRecipeById = async(id) => {
        try {
            const { data } = await recipehubApi.get(`/recipe/${id}`)

            recipeById.value = data  
        }catch(error) {
            throw new Error(error.response.data.message)
        }
    }

    const getRecipesByAuthor = async() => {
        try {
            const { data } = await recipehubApi.get(`/recipe/author/${userId.value}`)

            recipesByAuthor.value = data
        }catch(error) {
            throw new Error(error.response.data.message)
        }
    }

    const getCategories = async() => {
        try {
            const { data } = await recipehubApi.get('/category')

            categories.value = data
        }catch(error) {
            throw new Error(error.response.data.message)
        }
    }

    const createNewRecipe = async() => await store.dispatch('recipes/createNewRecipe', recipe.value)

    return {
        // Reactive states
        categories,
        recipe,
        recipeById,
        recipes,
        recipesByAuthor,

        // Methods
        getRecipes,
        getRecipesByCategory,
        getRecipesByAuthor,
        getRecipeById,
        getCategories,
        createNewRecipe,
        addElement,
        removeElement,
        changeUnits,
        calculateTime,

        // Getters
    }
}

export default useRecipes;  