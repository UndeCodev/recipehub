import { createRouter, createWebHashHistory } from 'vue-router'

import recipesRouter from '@/modules/recipes/router'
import authRouter from '@/modules/auth/router'
import profileRouter from '@/modules/profile/router'

const routes = [
  {
    path: '',
    redirect: { name: 'home' }
  },
  {
    path: '/inicio',
    name: 'home',
    meta: {
      title: 'Inicio'
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView'),
  },
  {
    path: '/recetas',
    ...recipesRouter
  },
  {
    path: '/receta/:id',
    name: 'recipe-by-id',
    meta: {
        title: 'Receta'       
    },
    props: (route) => {
        const id = Number(route.params.id)
        return isNaN(id) ? { id: 61 } : { id }
    },        
    component: () => import(/* webpackChunkName: "templateRecipe" */ '@/modules/recipes/components/templateRecipe'),
  },
  {
    path: '/acerca-de',
    name: 'about',
    meta: {
      title: 'Acerca de'
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView')
  },
  {
    path: '/autenticacion',
    ...authRouter
  },
  {
    path: '/perfil',
    ...profileRouter
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  document.title = `RecipeHub | ${to.meta?.title}`
})

export default router
