const API_URL = 'http://localhost:3000'
// const API_URL = 'https://recipehub-api.onrender.com'

export const postRecipe = async({ commit }, recipe) => {
    const { 
        user_id, videoURL, coverRecipe, description, category,
        ingredients: listIngredients, servings, steps: listSteps, times: listTimes,
        title, totalTime, yieldRecipe  
    } = structuredClone(recipe)

    const formData = new FormData()

    const ingredients = listIngredients.filter(ingredient => ingredient.text != null).map(({ text }) => ({ ingredient: text }))

    const steps = listSteps.filter(step => step.text != null).map((step, index) => ({ step: index + 1, text: step.text }))

    const times = listTimes.filter(({ time }) => time > 0).map( ({ time, type, timeUnits }) => ({ type, time: `${time} ${timeUnits}` }) )

    formData.append('user_id', user_id)
    formData.append('videoURL', videoURL)
    formData.append('coverRecipe', coverRecipe)
    formData.append('title', title)
    formData.append('category_id', category)
    formData.append('description', description)
    formData.append('servings', servings)
    formData.append('totalTime', totalTime)
    formData.append('yieldRecipe', yieldRecipe)
    formData.append('ingredients', JSON.stringify(ingredients))
    formData.append('steps', JSON.stringify(steps))
    formData.append('times', JSON.stringify(times))

    try{
        const response = await fetch(`${API_URL}/recipes`, {
            method: 'POST',
            body: formData
        })

        if(!response.ok){
            const { message } = await response.json()
            throw new Error(message)
        }

        return { ok: true }
    }catch(error){
        return { ok: false, message: error.message }
    }
}
