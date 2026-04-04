import axios from 'axios';

const aiApi = axios.create({
    baseURL: import.meta.env.VITE_AI_API,
})

export const analyzeTrades = (token, from , to )=> aiApi.get(`/api/ai/analyze?from=${from}&to=${to}`, {
    headers: {Authorization: `Bearer ${token}`}
})

export default aiApi;