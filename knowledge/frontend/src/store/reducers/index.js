import { combineReducers } from 'redux'
import { utilReducer } from './utilReducer'
import { userReducer } from './userReducer'

export const Reducers = combineReducers({
    utilState: utilReducer,
    userState: userReducer
})