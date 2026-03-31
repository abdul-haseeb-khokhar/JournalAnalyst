import {useState, useEffect} from 'react'
import { useAuth } from '../context/AuthContext'

import { getAllTrades, createTrade, updateTrade, deleteTrade } from '../api/tradeApi'

const emptyForm ={
    pair: '',
    position: 'buy',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    prfitLoss: '',
    strategy: '',
    notes: ''
}

function useTrades(){
    const {token} =useAuth()
    const [trades, setTrades] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState(emptyForm)
    const [editId, setEditId] = useState(null)
    const [error, setError] = useState('')

    useEffect(()=>{
        fetchTrades()
    }, [])

    const fetchTrades = async () => {
        setLoading(true)
        try {
            const res = await getAllTrades(token)
            setTrades(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const openAddModal = () => {
        setFormData(emptyForm)
        setEditId(null)
        setError('')
        setShowModal(true)
    }

    const openEditModal = (trade) => {
        setFormData({
            pair: trade.pair,
            position: trade.position,
            entryPrice: trade.entryPrice,
            exitPrice: trade.exitPrice ?? '',
            quantity: trade.quantity,
            profitLoss: trade.profitLoss ?? '',
            strategy: trade.strategy ?? '',
            notes: trade.notes ?? ''
        })
        setEditId(trade._id)
        setError('')
        setShowModal(true)
    }

    const handleSubmit = async () => {
        try{
            if(editId){
                await updateTrade(token, editId, formData)
            } else {
                await createTrade(token, formData)
            }
            setShowModal(false)
            fetchTrades()
        } catch (error) {
            console.log('full error', error)
            console.log('full error response', error.response)
            console.log('full error data', error.response?.data)
            setError(error.response?.data?.message || 'Error submitting trade')
        }
    }

    const handleDelete = async (id) => {
        if(!window.confirm('Are you sure you want to delete this trade?')) return
        try {
            await deleteTrade(token, id)
            fetchTrades()
        } catch (error) {
            console.error(error)
        }
    }

    return{
        trades, loading, showModal, formData, error, setShowModal, editId,
        handleChange, openAddModal, openEditModal, handleSubmit, handleDelete
    }
}

export default useTrades