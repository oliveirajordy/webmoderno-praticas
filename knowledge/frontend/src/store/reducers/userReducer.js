import axios from 'axios'
import { userKey } from '../../global'

const json = localStorage.getItem(userKey)

const INITIAL_STATE = !!json ? JSON.parse(json) : null
if (!!INITIAL_STATE) axios.defaults.headers.common['Authorization'] = `bearer ${INITIAL_STATE.token}`

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            axios.defaults.headers.common['Authorization'] = `bearer ${action.newValue.token}`
            return { ...action.newValue }
        case 'LOGOUT':
            delete axios.defaults.headers.common['Authorization']
            localStorage.removeItem(userKey)
            return null
        default:
            return state
    }
}