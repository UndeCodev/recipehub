import store from "@/store";

const isAuthenticatedGuard = async(to, from) => {
     const { ok } =  await store.dispatch('auth/checkAuthentication')

     if(!ok) return { name: 'auth-sign-in' }

    // if(!ok && to.name != 'auth-home'){
    //     return { 
    //         name: 'auth-home', 
    //         params: { formToShow: 'iniciar-sesion' } 
    //     }  
    // } 
    
    // if(ok && to.name === 'auth-home') return { name: 'home' }
}

export default isAuthenticatedGuard
