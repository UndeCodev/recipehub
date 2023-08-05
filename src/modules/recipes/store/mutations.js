export const signInUser = (state, { user, token, providerId }) => {    
    providerId ??= 'recipehub'
    
    if(token){        
        localStorage.setItem('token', token)
        state.token = token    
    }
    
    if(providerId){

        localStorage.setItem('providerId', providerId)
        state.providerId = providerId
    }

    state.user   = user
    state.status = 'authenticated'
}

export const updateUser = (state, user ) => {
    state.user   = user
}

export const logout = (state) => {
    state.user   = null
    state.status = 'not-authenticated'
    state.token  = null
    state.providerId  = null

    localStorage.removeItem('token')
    localStorage.removeItem('providerId')
}