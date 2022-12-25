import { ChangeEvent } from "react"
import { useMutation } from "react-query"
import { supabase } from "../utils/supabase"
import useStore from "../store"

export const useUploadEmbImg = () => {
    const editedTopi = useStore((state) => state.editedTopi)
    const updateTopi = useStore((state) => state.updateEditedTopi)

    //supabaseのストレージにファイルをアップロードする関数
    const useMutateUploadEmbImg = useMutation(
        async (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('画像を選択してください')
            }
            
            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`
            const { error } = await supabase.storage
                .from('emb')
                .upload(filePath, file)
            
            if (error) throw new Error(error.message)
            updateTopi({...editedTopi, emb_img: filePath })
        },
        {
            onError: (err: any) => {
                alert(err.message)
            },
        }
    )

  return { useMutateUploadEmbImg }
}
