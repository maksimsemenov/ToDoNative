import firebase from 'react-native-firebase'
import { createReducer } from './utils'

export const AUTH_LOG_IN = 'AUTH_LOG_IN'
export const AUTH_LOG_OUT = 'AUTH_LOG_OUT'

export const logIn = user => ({ type: AUTH_LOG_IN, user })
export const logOut = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => dispatch({ type: AUTH_LOG_OUT }))
}

const auth = {
  [AUTH_LOG_IN]: (state, action) => ({ ...state, user: action.user }),
  [AUTH_LOG_OUT]: state => ({ ...state, user: undefined })
}

export default createReducer({}, auth)
