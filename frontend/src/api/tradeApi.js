import axios from 'axios'

const tradeApi = axios.create({
    baseURL: import.meta.env.VITE_TRADE_API
})

export const getAllTrades = (token) => tradeApi.get('/api/trades/records',{
    headers: {Authorization: `Bearer ${token}`}
})

export const getTradesByDate = (token, from, to) => tradeApi.get(`/api/trades/cutomized-records?from=${from}&to=${to}`,{
    headers:{Authorization: `Bearer ${token}`}
})

export const createTrade = (token, data) => tradeApi.post('/api/trades/create', data, {
    headers:{Authorization: `Bearer ${token}`}
})

export const updateTrade = (token, id, data) => tradeApi.put(`/api/trades/edit/${id}`, data, {
    headers:{Authorization: `Bearer ${token}`}
})

export const deleteTrade = (token, id) => tradeApi.delete(`/api/trades/delete/${id}`, {
    headers:{Authorization: `Bearer ${token}`}
})


export default tradeApi