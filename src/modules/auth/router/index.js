export default {
    name: 'auth-layout',
    meta: {
        title: 'Autenticación'
    },
    component: () => import(/* webpackChunkName: "AuthLayout" */ '@/modules/auth/layout/AuthLayout'),
    children: [
        {
            path: '',
            name: 'auth-redirect',
            redirect: { name: 'auth-sign-in' },
        },
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
            path: 'password-reset',
            name: 'password-reset',
            meta: {
                title: 'Restablecer contraseña'
            },        
            component: () => import(/* webpackChunkName: "PasswordRecovery" */ '@/modules/auth/views/passwordReset'),
        },
        {
            path: 'reset-password/:token',
            name: 'reset-password',
            meta: {
                title: 'Restablecer contraseña - confirmar'
            },
            props: (route) => {
                return {
                    token: route.params.token
                }
            },     
            component: () => import(/* webpackChunkName: "PasswordRecovery" */ '@/modules/auth/views/resetPassword'),
        },
    ]
}