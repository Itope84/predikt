import { useEffect, useState } from "react"

// Mimics what a library like react-query or similar would do
export const useLocalStorageFetch = <TData = any,>(id: string, placeholderData?: TData) => {
    const [data, setData] = useState<TData | null>(placeholderData || null)

    const fetchData = () => {
        const localData = JSON.parse(localStorage.getItem(id) || '')
        setData(localData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {data, fetchData}
}