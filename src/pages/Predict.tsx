import Table from "../components/Table"
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Prediction = {
    imageId: string
    title: string
    description: string
    timestamp: string
}

const PredictPage = () => {
    const [loading, setLoading] = useState(false)
    const [predictions, setPredictions] = useState<Prediction[]>([])

    const fetchPredictions = async () => {
        try {
            setLoading(true)
            const res = await fetch('http://localhost:3004/predictions')
            const data = await res.json()
            setPredictions(data)
        } catch (e) {
            toast.error('Unable to fetch predictions')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPredictions()
    }, [])

    return <div className="mt-10">
        <h2 className="mt-10 mb-3 ml-4 font-bold">Predictions</h2>
        {loading ? <p>Loading</p> : (
            <Table columns={[
                { name: 'Title', id: 'title' },
                { name: 'Description',id: 'description' },
                { name: 'Time', id: 'timestamp' },
                { render: (row: Prediction) => <button onClick={() => { }}>View</button> },
            ]} data={predictions} />
        )}
    </div>
}

export default PredictPage