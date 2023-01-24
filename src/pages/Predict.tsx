import Table from "../components/Table"
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from "../components/Modal";

/**
 * TODO: TWO KEY INCOMPLETE PARTS OF THIS PAGE:
 * - The uploaded images are not stored in localstorage. I need to store that as a data-url to be able to display it here
 * - The dimensions of the image are currently hardcoded due to the reason above.
 */

type Prediction = {
    imageId: string
    title: string
    description: string
    timestamp: string
}

const getDimension = (axisSize: number, imageAxisSize: number) => (axisSize / imageAxisSize) * 100

const Overlay = ({ bbox, imageWidth, imageHeight }: any) => {
    const left = getDimension(bbox.x1, imageWidth)
    const width = getDimension(bbox.x2, imageWidth) - left
    const top = getDimension(bbox.y1, imageHeight)
    const height = getDimension(bbox.y2, 1200) - top

    return <div className="absolute bg-purple-400 bg-opacity-20 border border-purple-800" style={
        { left: `${left}%`, width: `${width}%`, top: `${top}%`, height: `${height}%` }}></div>
}

const ImageWithOverlay = ({ imageWidth, imageHeight, boxPredictions }: any) => {
    {/* Using a hardcoded image because it is non-trivial to store the image data-url in localstorage and retrieve it here  */ }
    return (
        <div className="relative">
            <img src='/img_1.jpg' alt="Uploaded file" />
            {boxPredictions?.map((prediction: any) => <Overlay bbox={prediction.bbox} imageHeight={imageHeight} imageWidth={imageWidth} />)}
        </div>
    )
}

const PredictPage = () => {
    const [loading, setLoading] = useState(false)
    const [predictions, setPredictions] = useState<Prediction[]>([])
    const [activePrediction, setActivePrediction] = useState<Prediction | null>(null)
    // The coordinates for the selected object. Ideally should be a part of activePrediction above, but they're separate resources.
    const [objectPrediction, setObjectPrediction] = useState<any>(null)

    const viewPrediction = async (row: Prediction) => {
        setActivePrediction(row)

        const res = await fetchPrediction()
        setObjectPrediction(res)
    }

    const fetchPrediction = async () => {
        try {
            const res = await fetch('http://localhost:3004/predict')
            const data = await res.json()
            return data
        } catch (e) {
            throw new Error("Unable to fetch prediction")
        }
    }

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

    return (
        <div className="mt-10">
            <h2 className="mt-10 mb-3 ml-4 font-bold">Predictions</h2>
            <Modal size="lg" isOpen={activePrediction !== null} closeModal={() => setActivePrediction(null)}>
                <h3 className='mb-5 font-semibold text-purple-700'>{activePrediction?.title}</h3>
                <ImageWithOverlay imageWidth={1600} imageHeight={1200} boxPredictions={objectPrediction?.predictions} />
            </Modal>
            {loading ? <p>Loading</p> : (
                <Table columns={[
                    { name: 'Title', id: 'title' },
                    { name: 'Description',id: 'description' },
                    { name: 'Time', id: 'timestamp' },
                    { render: (row: Prediction) => <button onClick={() => {viewPrediction(row)}}>View</button> },
                ]} data={predictions} />
            )}
        </div>
    )
}

export default PredictPage