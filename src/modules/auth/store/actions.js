import VuewJwtDecode from 'vue-jwt-decode'
import recipehubApi from '@/api/recipehubApi'

import '@/modules/auth/helpers/firebase.js'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'

const auth = getAuth()

export const signUpUser = async({ commit }, userToRegister) => {

    const { name, lastNames, email, password, file } = userToRegister

    const formData = new FormData()
    formData.append('name', name)
    formData.append('last_names', lastNames)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('profile_picture', file)

    try{
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            body: formData
        })

        if(!response.ok){
            const { message } = await response.json()
            throw new Error(message)
        }

        const { token } = await response.json()
        const { user } = VuewJwtDecode.decode(token)

        commit('signInUser', { user, token })
        
        return { ok: true }
    }catch(error){
        return { ok: false, message: error.message }
    }
}

export const signInUser = async({ commit }, { email, password }) => {
    try{
        const { data } = await recipehubApi.post('/auth/signin', { email, password });
        
        const { token } = data;
        const { user } = VuewJwtDecode.decode(token);


        commit('signInUser', { user, token });

        return { ok: true }
    }catch(error){
        return { ok: false, message: error.response.data.message }
    }
}

export const signInWithProvider = async({ commit }, providerId ) => {
    const providers = {
        facebook: new FacebookAuthProvider(),
        google: new GoogleAuthProvider(),
    }

    const provider = providers[providerId]

    try{
        if(!provider) throw('Proveedor no válido o no proporcionado.')

        const { user: userProvider } = await signInWithPopup(auth, provider)

        const {
            uid, 
            displayName: name, 
            email, 
            photoURL, 
        } = userProvider
        
        const user = {
            name,
            email,
            images: {
                photoURL
            }
        }

        const { data } = await recipehubApi.post('/auth/signin-provider', { uid });
        const { token } = data

        commit('signInUser', { user, token })

        return { ok: true }
    }catch(error){
        if(error.code === 'auth/popup-closed-by-user'){
            error = `Ventana de ${providerId} cerrada.`
        }
        
        return { ok: false, message: error }
    }
}

export const signUpWithProvider = async({ commit }, providerId ) => {
    const providers = {
        facebook: new FacebookAuthProvider(),
        google: new GoogleAuthProvider(),
    }

    const provider = providers[providerId]

    try{
        if(!provider) throw('Proveedor no válido o no proporcionado.')

        const { user: userProvider } = await signInWithPopup(auth, provider)

        const { 
            uid,
            displayName: name, 
            email, 
            photoURL, 
            providerId 
        } = userProvider
        
        const { data } = await recipehubApi.post('/auth/signup-provider', {
            uid,
            name,
            email,
            photoURL,
            providerId
        }) 

        const { token } = data;
        const { user } = VuewJwtDecode.decode(token);

        commit('signInUser', { user, token, providerId })

        return { ok: true }
    }catch(error){
        if(error.code === 'auth/popup-closed-by-user'){
            error = `Ventana de ${providerId} cerrada.`
        }
        
        return { ok: false, message: error.response.data.message }
    }
}

export const checkAuthentication = async({ commit }) => {
    const token = localStorage.getItem('token')
    
    if(!token){
        commit('logout')
        return { ok: false, message: 'No existe un token' }
    }
    
    try{        
        await recipehubApi.get('/auth/verify-token', {
            headers: {
                'x-access-token': token
            }
        });
        
        const { user } = VuewJwtDecode.decode(token)        

        commit('signInUser', { user, token });
        
        return { ok: true }
    }catch(error){
       commit('logout')
       return { ok: false, message: error.response.data.message } 
    }
}
