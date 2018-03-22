import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import auth from './reducers/auth'

const reducers = combineReducers({ auth })

export default createStore(reducers, applyMiddleware(thunkMiddleware))
