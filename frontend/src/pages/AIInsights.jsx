import Navbar from "../components/common/Navbar"
import AiDatePicker from "../components/ai/AiDatePicker"
import AiResult from "../components/ai/AiResult"
import useAiInsights from "../hooks/useAiInsights"

function AiInsights(){
    const {
        from, setFrom, to, setTo, analysis, loading, error, handleAnalyze
    } = useAiInsights();

    return(
        <div className="min-h-screen bg-gray-950">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-8">
                <h2 className="text-2xl font-bold text-white mb-6">AI Insights</h2>

                <AiDatePicker 
                from={from} to={to} setFrom={setFrom} setTo={setTo} handleAnalyze={handleAnalyze} loading={loading}/>

                <AiResult
                analysis={analysis} loading={loading} error ={error}/>
            </div>
        </div>
    )
}

export default AiInsights;