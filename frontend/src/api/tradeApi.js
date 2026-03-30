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

export default tradeApi