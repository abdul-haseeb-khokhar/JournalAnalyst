import { useState } from "react";
import {useAuth} from '../context/AuthContext';
import { analyzeTrades } from "../api/aiApi";

function useAiInsights(){
    const {token} = useAuth();
    const [from, setFrom] = useState('');
    const [to , setTo] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = async() => {
        if(!from || !to){
            setError('Please select both dates');
            return;
        }
        setError('')
        setLoading(true)
        setAnalysis('')
        try{
            const res = await analyzeTrades(token, from , to)
            setAnalysis(res.data.analysis || res.data.message);
        }catch(err){
            setError(err.response?.data?.message || 'Failed to analyze trades')
        }finally{
            setLoading(false)
        }
    }

    return { from, setFrom, to, setTo, analysis, loading, error, handleAnalyze };
}

export default useAiInsights;