import { useState } from "react";
import {useAuth} from '../context/AuthContext';
import { analyzeTrades } from "../api/aiApi";
import { useMutation } from "@tanstack/react-query";
function useAiInsights(){
    const {token} = useAuth();
    const [from, setFrom] = useState('');
    const [to , setTo] = useState('');
    const [error, setError] = useState('');

    const {mutate: analayze, data: analysis, isPending: loading} = useMutation({
        mutationFn: ()=> analyzeTrades(token, from, to).then(res => res.data.analysis || res.data.message),
        onError: (err) => setError(err.response?.data?.message || 'Failed to analyze trades')
    })

    const handleAnalyze = async() => {
        if(!from || !to){
            setError('Please select both dates');
            return;
        }
        setError('')
        analayze()
    }

    return { from, setFrom, to, setTo, analysis, loading, error, handleAnalyze };
}

export default useAiInsights;