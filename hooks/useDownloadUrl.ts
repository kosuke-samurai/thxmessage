import { useState, useEffect } from "react"
import { supabase } from "../utils/supabase"

export const useDownloadUrl = (
    filePath: string | undefined,
    key: 'hi' | 'main' | 'emb'
) => {
    const [isLoading, setIsLoading] = useState(false)
    const [fullUrl, setFullUrl] = useState('')
    const bucketName = key
    if (key === 'hi') { bucketName == 'hi' }
    else if (key === 'main') { bucketName == 'main' }
    else{bucketName == 'emb'}


    useEffect(() => {
        if (filePath) {
            const download = async () => {
                setIsLoading(true)
                const { data, error } = await supabase.storage
                    .from(bucketName)
                    .download(filePath)
                if (error) {
                    setIsLoading(false)
                    throw error
                }
                setFullUrl(URL.createObjectURL(data!))
                setIsLoading(false)
            }
            download()
        }
    }, [filePath, bucketName])
    
  return { isLoading, fullUrl, setFullUrl}
}
