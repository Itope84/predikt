import Table from '../components/Table';
import Button from '../components/Button';
import FileInput from '../components/FileInput';
import { useRef, useState } from 'react';
import { readableSize } from '../utils/size';
import { v4 as uuid } from 'uuid'
import { useLocalStorageFetch } from '../utils/localstorage';
import Modal from '../components/Modal';
import { toast } from 'react-toastify';
import { SavedImage } from '../utils/types';

const ImagesPage = () => {
    const [images, setImages] = useState<File[]>([])
    const [activeImageId, setActiveImageId] = useState<string | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const { data: uploads, fetchData: silentRefetch } = useLocalStorageFetch<SavedImage[]>('uploads')

    const inputRef = useRef<HTMLInputElement>(null)

    const handlePredictClick = (imageId: string) => {
        // reset state if a different image is being edited. Otherwise we keep the entered values in state in case you accidentally close the modal
        if (imageId !== activeImageId) {
            setTitle('')
            setDescription('')
        }
        setActiveImageId(imageId)
        setModalOpen(true)
    }

    const uploadImages = () => {
        const data = images.map(image => ({
            id: uuid(),
            filename: image.name,
            size: image.size,
            timestamp: new Date().toISOString()
        }))

        localStorage.setItem('uploads', JSON.stringify([...(uploads || []), ...data]))
        // reset local state
        setImages([])
        // refresh api (localstorage) request
        silentRefetch()
    }

    const predict = async (imageId: string) => {
        try {
            await fetch('http://localhost:3004/predictions', {
                method: 'POST',
                // Ideally, timestamp should be handled by the server
                body: JSON.stringify({ imageId: activeImageId, title, description, timestamp: new Date().toISOString() }),
                headers: {
                    "Content-Type": "application/json"
                },
            })

            toast.success("Success! Go to the predictions page to see your predictions")
            setModalOpen(false)
            setActiveImageId(null)
        } catch (e) {
            console.error(e)
            toast.error("Unable to create prediction")
        }
    }

    return <div>
        <div className="mt-10">
            <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
                <h3 className='mb-5 font-semibold text-purple-700'>Generate new prediction</h3>

                <form method='POST' onSubmit={(e) => {
                    e.preventDefault()
                    predict(activeImageId as string)
                }}>
                    <div className="mb-5">
                        <label htmlFor="title" className='block mb-2'>Prediction title (required)</label>
                        <input required type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} className="rounded-md py-2 px-4 w-full border border-slate-400" />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="title" className='block mb-2'>Description (required)</label>
                        <textarea required name="title" className="rounded-md py-2 px-4 w-full border border-slate-400 h-40" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="flex justify-end items-center gap-4">
                        <Button type='button' variant='danger' onClick={() => setModalOpen(false)}>Cancel</Button>
                        <Button type='submit'>Save</Button>
                    </div>
                </form>
            </Modal>
            <h2 className='mb-3 ml-4 font-bold'>Upload Image</h2>
            <div className="border rounded-lg p-5 flex items-center justify-center">
            {
                images.length > 0
                    ? <div className="">
                        <h3 className='text-center font-semibold'>Uploading:</h3>
                        <ul role='listbox' className='my-1'>
                            {images.map((image, index) => (
                                <li key={index}>
                                    {image.name} ({readableSize(image.size)})
                                    <button className='text-xs text-red-500 hover:text-red-700' onClick={() => { setImages(images.filter(img => img !== image)) } }>(remove)</button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center">
                            <Button onClick={uploadImages}>Upload</Button>
                        </div>
                    </div>
                    : <FileInput ref={inputRef} accept="image/png, image/gif, image/jpeg" id="file-upload" onChange={(files) => !!files && setImages(Array.from(files))}>
                        <Button>Select Files</Button>
                    </FileInput>
            }
            </div>
        </div>
        <h2 className="mt-10 mb-3 ml-4 font-bold">Uploaded Images</h2>
        <Table columns={[
          { name: 'Filename', id: 'filename' },
          { name: 'Size', render: (row: SavedImage) => readableSize(row.size) },
          { name: 'Time', id: 'timestamp' },
            { render: (row: SavedImage) => <button onClick={() => handlePredictClick(row.id)}>Predict</button> },
        ]} data={uploads || []} />
    </div>
}

export default ImagesPage
