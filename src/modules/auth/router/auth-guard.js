import store from "@/store";

const isAuthenticatedGuard = async(to, from) => {
    const { ok } = await store.dispatch('auth/checkAuthentication')
    
    if(!ok) return { name: 'auth-sign-in' }
}

export default isAuthenticatedGuard
