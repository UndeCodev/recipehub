export default {
    name: 'recipes',
    meta: {
        title: 'Recetas'       
    },
    component: () => import(/* webpackChunkName: "RecipesLayout" */ '@/modules/recipes/layout/RecipesLayout'),
    children: [
        {
            path: '',
            name: 'recipes-home',
            meta: {
                title: 'Recetas'       
            },        
            component: () => import(/* webpackChunkName: "RecipesLayout" */ '@/modules/recipes/views/RecipesView'),
        }
    ]
}