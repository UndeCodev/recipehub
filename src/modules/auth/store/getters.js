export const currentState = (state) => {
    return state.status
}

export const username = ( state ) => {
    return state.user.name
}

export const profilePicture = ( state ) => {
    return state.user.photoURL
}

export const email = ( state ) => {
    return state.user.email
}