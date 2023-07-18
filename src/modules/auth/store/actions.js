import VuewJwtDecode from 'vue-jwt-decode'

import '@/modules/auth/helpers/firebase.js'
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'

const auth = getAuth()

const API_URL = 'http://localhost:3000'

export const signUpUser = async({ commit }, user) => {

    const { name, lastNames, email, password, file } = user

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

        delete user.password
        delete user.file
        commit('signInUser', { user, token })
        
        return { ok: true }
    }catch(error){
        return { ok: false, message: error.message }
    }
}

export const signInUser = async({ commit }, { email, password }) => {
    try{
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        if(!response.ok){
            const { message } = await response.json()
            throw new Error(message)
        }
        
        const { token } = await response.json()
        const { user } = VuewJwtDecode.decode(token)

        delete user.password
        commit('signInUser', { user, token })

        return { ok: true }
    }catch(error){
        return { ok: false, message: error.message }
    }
}

export const signWithProvider = async({ commit }, providerId ) => {
    const providers = {
        facebook: new FacebookAuthProvider(),
        google: new GoogleAuthProvider(),
    }

    const provider = providers[providerId]

    try{
        if(!provider) throw('Proveedor no válido o no proporcionado.')

        const { user: userProvider } = await signInWithPopup(auth, provider)
        const { 
            displayName: name, 
            email, 
            photoURL, 
            accessToken: token, 
            providerId 
        } = userProvider
        
        const user = {
            name,
            email,
            photoURL
        }

        commit('signInUser', { user, token, providerId })

        return { ok: true }
    }catch(error){
        if(error.code === 'auth/popup-closed-by-user'){
            error = `Ventana de ${providerId} cerrada.`
        }
        
        return { ok: false, message: error }
    }
}

export const checkAuthentication = async({ commit }) => {
    const token    = localStorage.getItem('token')
    const providerId = localStorage.getItem('providerId')
    
    if(!token){
        commit('logout')
        return { ok: false, message: 'No existe un token' }
    }
    
    try{        
        const response = await fetch(`${API_URL}/user/verify-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({ providerId })
        })
        
        if(!response.ok){
            const { message } = await response.json()
            throw new Error(message)
        }

        const data = VuewJwtDecode.decode(token)        
        let user;

        if(providerId === 'firebase'){
            const { email, name, picture: photoURL } = data
            user = { email, name, photoURL }
        }else{
            user = data.user
        }

        commit('signInUser', { user, token, providerId })
        
        return { ok: true }
    }catch(error){
       commit('logout')
       return { ok: false, message: error.message } 
    }
}

export const saveChangesAccount = async({ commit }, user) => {
    const { user_id, name, last_names, email, about_me } = user
    
    try{
        const response = await fetch(`${API_URL}/user/update-profile`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id, name, last_names, email, about_me })
        })

        if(!response.ok){
            const { message } = await response.json()
            throw new Error(message)
        }

        return { ok: true }
    }catch(error){
        return { ok: false, message: error.message }
    }
}