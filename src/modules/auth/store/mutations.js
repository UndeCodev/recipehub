export const signInUser = (state, { user, token  }) => {    
    if(token){        
        localStorage.setItem('token', token)
        state.token = token    
    }
    
    state.user   = user
    state.status = 'authenticated'
}

export const logout = (state) => {
    state.user   = null
    state.status = 'not-authenticated'
    state.token  = null

    localStorage.removeItem('token')
}