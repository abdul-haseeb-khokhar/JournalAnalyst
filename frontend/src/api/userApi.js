import axios from 'axios'
import { data } from 'react-router-dom'

const userApi = axios.create({
    baseURL: import.meta.env.VITE_USER_API
})

export const registerUser = (data) => userApi.post('/api/users/register',data)
export const loginUser = (data) => userApi.post('/api/users/login',data)
export const userProfile = () => userApi.get('/api/users/profile')

export default userApi