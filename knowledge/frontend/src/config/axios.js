import axios from 'axios'

const success = res => res
const error = res => {
    if (401 === res.response.status) {
        window.location = '/'
    } else {
        return Promise.reject(res)
    }
}

axios.interceptors.response.use(success, error)