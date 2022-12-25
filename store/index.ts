import create from "zustand";
import { Session } from '@supabase/supabase-js'
import{ EditedTopi } from '../types/types'

type State = {
    session: Session | null
    setSession: (payload: Session | null) => void
    
    //トピ用の型定義
    editedTopi: EditedTopi
    updateEditedTopi: (payload: EditedTopi) => void
    resetEditedTopi: () => void

}
const useStore = create<State>((set) => ({
    session: null,
    setSession: (payload) => set({ session: payload }),

    //トピ用の型定義
    editedTopi: {
    id: '',
    name: '',
    user_id: '',
    title: '',
    hi_img: '',
    main_img: '',
    body: '',
    question: '',
    answer: '',
    emb_title: '',
    emb_img: ''
    },
    updateEditedTopi: (payload) =>
        set({
            editedTopi: {
                id: payload.name,
                name: payload.name,
                title: payload.title,
                user_id: payload.title,
                hi_img: payload.hi_img,
                main_img: payload.main_img,
                body: payload.body,
                question: payload.question,
                answer: payload.answer,
                emb_title: payload.emb_title,
                emb_img: payload.emb_img,
                    }, 
        }),
    resetEditedTopi: () =>
        set({
            editedTopi: {
                id: '',
                name: '',
                user_id: '',
                title: '',
                hi_img: '',
                main_img: '',
                body: '',
                question: '',
                answer: '',
                emb_title: '',
                emb_img: ''  
        }}),

}))

export default useStore