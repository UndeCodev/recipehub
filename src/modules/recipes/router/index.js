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
            path: 'inicio',
            name: 'recipes-home',
            meta: {
                title: 'Recetas'       
            },        
            component: () => import(/* webpackChunkName: "RecipesView" */ '@/modules/recipes/views/RecipesView'),
        },
    ]
}