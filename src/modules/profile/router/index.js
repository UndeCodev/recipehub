import isAuthenticatedGuard from '@/modules/auth/router/auth-guard'

export default {
    name: 'profile-layout',
    meta: {
        title: 'Perfil'
    },
    component: () => import(/* webpackChunkName: "ProfileLayout" */ '@/modules/profile/layout/ProfileLayout'),
    beforeEnter: [isAuthenticatedGuard],
    children: [
        {
            path: '',
            name: 'profile-redirect',
            redirect: { name: 'profile-my-recipes' }
        },          
        {
            path: 'mis-recetas',
            name: 'profile-my-recipes',
            meta: {
                title: 'Mis recetas'
            },
            component: () => import(/* webpackChunkName: "MyRecipesView" */ '@/modules/profile/views/myRecipesView'),        
        },
        {
            path: 'informacion-personal',
            name: 'profile-information',
            meta: {
                title: 'Información personal'
            },
            component: () => import(/* webpackChunkName: "ProfileInformation" */ '@/modules/profile/views/profileInformationView'),        
        },
        {
            path: 'recetas-favoritas',
            name: 'profile-favorite-recipes',
            meta: {
                title: 'Recetas favoritas'
            },
            component: () => import(/* webpackChunkName: "MyFavoriteRecipesView" */ '@/modules/profile/views/myFavoriteRecipesView'),        
        },
        {
            path: 'nueva-receta',
            name: 'profile-new-recipe',
            meta: {
                title: 'Nueva receta'
            },
            component: () => import(/* webpackChunkName: "NewRecipeView" */ '@/modules/profile/views/newRecipeView'),        
        },
    ]
}