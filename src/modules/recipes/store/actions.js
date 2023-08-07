import recipehubApi from "@/api/recipehubApi"

export const createNewRecipe = async({ commit }, recipe) => {
    const { 
        userId, videoURL, fileImage, description, category,
        ingredients: listIngredients, servings, steps: listSteps, times: listTimes,
        title, totalTime, yieldRecipe  
    } = structuredClone(recipe)

    const formData = new FormData()

    const ingredients = listIngredients.filter(({ ingredient }) => ingredient != null).map(({ ingredient }) => ({ ingredient }))

    const steps = listSteps.filter(step => step.text != null).map((step, index) => ({ step: index + 1, text: step.text }))

    const times = listTimes.filter(({ time }) => time > 0).map( ({ time, type, timeUnits }) => ({ type, time: `${time} ${timeUnits}` }) )

    formData.append('userId', userId)
    formData.append('videoURL', videoURL)
    formData.append('fileImage', fileImage)
    formData.append('title', title)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('servings', servings)
    formData.append('totalTime', totalTime)
    formData.append('yieldRecipe', yieldRecipe)
    formData.append('ingredients', JSON.stringify(ingredients))
    formData.append('steps', JSON.stringify(steps))
    formData.append('times', JSON.stringify(times))

    try{
        await recipehubApi.post('/recipe', formData , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return { ok: true }
    }catch(error){
        return { ok: false, message: error.response.data.message }
    }
}

export const getRecipeCategories = async({ commit }) => {
    const categories = localStorage.getItem('categories');

    if(categories){
        commit('setCategories', JSON.parse(categories));

        return { ok: true }
    }else{
        try {
            const { data: categories } = await recipehubApi.get('/category')
    
            commit('setCategories', categories)
    
            return { ok: true}
        } catch (error) {
            return { ok: false, message: error.response.data.message }
        }
    }
}