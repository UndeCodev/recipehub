export default {
    name: 'auth-layout',
    meta: {
        title: 'Autenticación'
    },
    component: () => import(/* webpackChunkName: "AuthLayout" */ '@/modules/auth/layout/AuthLayout'),
    children: [
        {
            path: 'iniciar-sesion',
            name: 'auth-sign-in',
            meta: {
                title: 'Iniciar sesión'
            },        
            component: () => import(/* webpackChunkName: "AuthSignIn" */ '@/modules/auth/views/SignInView'),
        },
        {
            path: 'registrar-usuario',
            name: 'auth-sign-up',
            meta: {
                title: 'Registrar usuario'
            },        
            component: () => import(/* webpackChunkName: "AuthSignIn" */ '@/modules/auth/views/SignUpView'),
        },
        {
            path: '',
            name: 'auth-redirect',
            redirect: { name: 'auth-sign-in' },
        }
    ]
}