import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllTrades, createTrade, updateTrade, deleteTrade } from '../api/tradeApi'
import { data } from 'react-router-dom'

const emptyForm = {
    pair: '',
    position: 'buy',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    profitLoss: '',
    strategy: '',
    notes: ''
}

function useTrades() {
    const { token } = useAuth()
    const queryClient = useQueryClient()

    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState(emptyForm)
    const [editId, setEditId] = useState(null)
    const [error, setError] = useState('')


    const { data: trades = [], isLoading: loading } = useQuery({
        queryKey: ['trades'],
        queryFn: () => getAllTrades(token).then(res => res.data)
    })

    const invalidateTrades = () => {
        queryClient.invalidateQueries({ queryKey: ['trades'] })
    }

    const createMutation = useMutation({
        mutationFn: (data) => createTrade(token, data),
        onSuccess: () => { setShowModal(false); invalidateTrades() },
        onError: (error) => setError(error.response?.data?.message || 'Error submitting trade')
    })

    const updateMutation = useMutation({
        mutationFn: (data) => updateTrade(token, editId, data),
        onSuccess: () => { setShowModal(false); invalidateTrades() },
        onError: (err) => setError(err.response?.data?.message || 'Error submitting trade')
    })


    const deleteMutation = useMutation({
        mutationFn: (id) => deleteTrade(token, id),
        onSuccess: () => invalidateTrades(),
        onError: (err) => console.error(err)
    })

    const submitLoading = createMutation.isPending || updateMutation.isPending
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
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
        console.log('createMutation.isPending:', createMutation.isPending)
        console.log('updateMutation.isPending:', updateMutation.isPending)
        console.log('submitLoading:', submitLoading)
        if (editId) {
            updateMutation.mutate(formData)
        } else {
            createMutation.mutate(formData)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this trade?')) return
        deleteMutation.mutate(id)
    }

    return {
        trades, loading, showModal, formData, error, setShowModal, editId, submitLoading,
        handleChange, openAddModal, openEditModal, handleSubmit, handleDelete
    }
}

export default useTrades