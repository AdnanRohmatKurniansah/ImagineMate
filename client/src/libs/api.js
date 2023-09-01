import axios from 'axios'

const api_url = import.meta.env.VITE_API_URL

export const register = async (data) => {
    try {
        const response = await axios.post(`${api_url}/auth/register`, data)
        return response
    } catch (error) {
        return error
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post(`${api_url}/auth/login`, data)
        return response
    } catch (error) {
        return error
    }
}

export const share = async (data) => {
    try {
        const response = await axios.post(`${api_url}/record/share`, data)
        return response
    } catch (error) {
        return error
    }
}

export const lists = async (page) => {
    try {
        const response = await axios.get(`${api_url}/record/lists?page=${page}`)
        return response
    } catch (error) {
        return error
    }
}

export const history = async (page) => {
    try {
        const response = await axios.get(`${api_url}/record/history?page=${page}`)
        return response
    } catch (error) {
        return error
    }
}

export const deleteHistory = async (id) => {
    try {
        const response = await axios.delete(`${api_url}/record/${id}`)
        return response
    } catch (error) {
        return error
    }
}