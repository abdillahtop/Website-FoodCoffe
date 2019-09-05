import axios from 'axios'
import api from '../../../config/api'

export const postLogin = (data) => {
    return {
        type: 'POST_LOGIN',
        payload: axios.post(`${api}user/login`, data)
    }
}

export const postRegister = (data) => {
    return {
        type: 'POST_REGIST',
        payload: axios.post(`${api}user/register`, data)
    }
}

export const logout = (idUser) => {
    return {
        type: 'LOGOUT_USER',
        payload: axios.post(`${api}user/logout/${idUser}`)
    }
}