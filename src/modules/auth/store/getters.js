export const currentState = (state) => state.status;
export const userId       = (state) => state.user?._id || ''
export const photoURL     = (state) => state.user?.images?.photoURL || ''
export const username     = (state) => state.user?.name || ''
export const email        = (state) => state.user?.email || ''
export const rol          = (state) => state.user?.rol?.name || ''

