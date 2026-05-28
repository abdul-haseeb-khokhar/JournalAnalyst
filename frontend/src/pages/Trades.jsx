import Navbar from '../components/common/Navbar'
import TradeTable from '../components/trades/TradeTable'
import TradeModal from '../components/trades/TradeModal'
import useTrades from '../hooks/useTrades'

function Trades(){
    const {trades, loading, showModal, setShowModal, formData, editId, error, handleChange, openAddModal, openEditModal, handleSubmit, handleDelete, submitLoading} = useTrades()
    return (
        <div className='min-h-screen bg-gray-950'>
            <Navbar />

            <div className='max-w-6xl mx-auto px-6 py-8'>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-2xl font-bold text-white'>Trades</h2>
                    <button onClick={openAddModal} 
                    className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition cursor-pointer'>
                        + Add Trade
                    </button>
                </div>

                <div className='bg-gray-900 rounded-2xl p-6'>
                    {loading ? (
                        <p className='text-gray-500'>Loading...</p>
                    ): trades.length === 0 ? (
                        <p className='text-gray-500'>No trades yet.</p>
                    ) : (
                        <TradeTable trades={trades} openEditModal={openEditModal} handleDelete={handleDelete} />
                    )}
                </div>
            </div>

            <TradeModal
                showModal={showModal}
                setShowModal={setShowModal}
                formData={formData}
                editId={editId}
                error={error}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                submitLoading={submitLoading}
            />
        </div>
    )
}

export default Trades