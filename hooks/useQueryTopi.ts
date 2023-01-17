import { useQuery } from "react-query"
import { supabase } from "../utils/supabase"
import useStore from "../store"
import { Topi } from "../types"
import { useMutateTopi } from '../hooks/useMutateTopi'
import { equal } from "assert"

export const useQueryTopi = () => {
    const session = useStore((state) => state.session)
    const editedTopi = useStore((state) => state.editedTopi)
    const update = useStore((state) => state.updateEditedTopi)

    const { createTopiMutation } = useMutateTopi()

    //トピを取得する関数
    const getTopi = async () => {
        const { data, error, status } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session?.user?.id)
            .single()
        
        //まだ未作成のときは自動的に新規作成する処理↓
        if (error && status === 406) {
            createTopiMutation.mutate({
                id: session?.user?.id,
                name: '',
                user_id: session?.user?.id,
                title: '',
                hi_img: '',
                main_img: '',
                body: '',
                question: '',
                answer: '',
                emb_title: '',
                emb_img: '',
            })
            update({
                ...editedTopi,
                id: session?.user?.id,
            })
        }

        if (error && status !== 406) {
            throw new Error(error.message)
        }
        return data
    }

    return useQuery<Topi, Error>({
        queryKey: ['topi'],
        queryFn: getTopi,
        staleTime: Infinity,
        onSuccess: (data) => {
            if (data) {
                update({
                    id: data.id,
                    name: data.name,
                    user_id: data.user_id,
                    title: data.title,
                    hi_img: data.hi_img,
                    main_img: data.main_img,
                    body: data.body,
                    question: data.question,
                    answer: data.answer,
                    emb_title: data.emb_title,
                    emb_img: data.emb_img,
                })
            }
        }
  })
}
