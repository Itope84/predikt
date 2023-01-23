import Table from '../components/Table';
import Button from '../components/Button';
import FileInput from '../components/FileInput';
import { useRef, useState } from 'react';
import { readableSize } from '../utils/size';
import { v4 as uuid } from 'uuid'
import { useLocalStorageFetch } from '../utils/localstorage';

type SavedImage = {
    id: string,
    filename: string,
    size: number,
    timestamp: string
}

const ImagesPage = () => {
    const [images, setImages] = useState<File[]>([])

    const { data: uploads, fetchData: silentRefetch } = useLocalStorageFetch<SavedImage[]>('uploads')

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

    const inputRef = useRef<HTMLInputElement>(null)

    return <div>
        <div className="my-3">
          <h2 className='mb-2 font-bold'>Upload Image</h2>
          <div className="border rounded-lg p-5 flex items-center justify-center">
            {
                images.length > 0
                    ? <div className="">
                        <h3 className='text-center font-semibold'>Uploading:</h3>
                        <ul role='list' className='my-1'>
                            {images.map((image) => (
                                <li>
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
                        <Button>Select File</Button>
                    </FileInput>
            }
          </div>
        </div>
        <Table columns={[
          { name: 'Filename', id: 'filename' },
          { name: 'Size', render: (row: SavedImage) => readableSize(row.size) },
          { name: 'Time', id: 'timestamp' },
          { render: (row: SavedImage) => <button>Predict</button> },
        ]} data={uploads || []} />
    </div>
}

export default ImagesPage
