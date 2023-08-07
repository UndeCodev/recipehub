export const setRecipes = (state, recipes) => {        
    localStorage.setItem('recipes', JSON.stringify(recipes))
    state.recipes = recipes    
}

export const setCategories = (state, categories) => {        
    localStorage.setItem('categories', JSON.stringify(categories))
    state.categories = categories    
}
