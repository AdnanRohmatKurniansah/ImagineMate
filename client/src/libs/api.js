import axios from 'axios'

export const register = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/register', data)
        return response
    } catch (error) {
        return error
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/login', data)
        return response
    } catch (error) {
        return error
    }
}

export const share = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/record/share', data)
        return response
    } catch (error) {
        return error
    }
}

export const lists = async (page) => {
    try {
        const response = await axios.get(`http://localhost:3000/record/lists?page=${page}`)
        return response
    } catch (error) {
        return error
    }
}

export const history = async (page) => {
    try {
        const response = await axios.get(`http://localhost:3000/record/history?page=${page}`)
        return response
    } catch (error) {
        return error
    }
}

export const deleteHistory = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/record/${id}`)
        return response
    } catch (error) {
        return error
    }
}