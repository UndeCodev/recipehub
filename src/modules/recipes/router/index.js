export default {
    name: 'recipes',
    meta: {
        title: 'Recetas'       
    },
    component: () => import(/* webpackChunkName: "RecipesLayout" */ '@/modules/recipes/layout/RecipesLayout'),
    children: [
        {
            path: '',
            name: 'recipes-redirect',
            redirect: { name: 'recipes-home' }
        },
        {
            path: '',
            name: 'recipes-home',
            meta: {
                title: 'Recetas'       
            },        
            component: () => import(/* webpackChunkName: "RecipesView" */ '@/modules/recipes/views/RecipesView'),
        },
        {
            path: 'categoria/:id',
            name: 'recipes-category',
            meta: {
                title: 'Recetas por categoria'       
            },
            props: (route) => {
                return {
                    id: route.params.id
                }
            },        
            component: () => import(/* webpackChunkName: "templateRecipe" */ '@/modules/recipes/views/RecipesByCategory'),
          },
    ]
}