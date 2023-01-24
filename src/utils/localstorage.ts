import { useEffect, useState } from "react"

// Mimics what a library like react-query or similar would do
export const useLocalStorageFetch = <TData = any,>(id: string, placeholderData?: TData) => {
    const [data, setData] = useState<TData | null>(placeholderData || null)

    const fetchData = () => {
        const savedItem = localStorage.getItem(id)
        if (!savedItem) return
        const localData = JSON.parse(savedItem)
        setData(localData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return {data, fetchData}
}