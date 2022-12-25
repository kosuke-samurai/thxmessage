import { useQueryClient, useMutation } from 'react-query'
import useStore from '../../store'
import { supabase } from '../../utils/supabase'
import { User_Topi, EditedUser_Topi } from '../../types/types'

export const useMutateUser_Topi = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedUser_Topi)

    
    //新規作成
  const createUser_TopiMutation = useMutation(
    async (user_topi: Omit<User_Topi, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('user_topis').insert(user_topi)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<User_Topi[]>(['user_topis'])
        if (previousTodos) {
          queryClient.setQueryData(['user_topis'], [...previousTodos, res[0]])
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
    
    //更新処理
  const updateUser_TopiMutation = useMutation(
    async (user_topi: EditedUser_Topi) => {
      const { data, error } = await supabase
        .from('user_topis')
        .update({
                    name: user_topi.name,
                    title: user_topi.title,
                    hi_img: user_topi.hi_img,
                    main_img: user_topi.main_img,
                    body: user_topi.body,
                    question: user_topi.question,
                    answer: user_topi.answer,
                    emb_title: user_topi.emb_title,
                    emb_img: user_topi.emb_img,
                    administrators_id: user_topi.administrators_id,
          })
        .eq('id', user_topi.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<User_Topi[]>(['user_topis'])
        if (previousTodos) {
          queryClient.setQueryData(
            ['user_topis'],
            previousTodos.map((user_topi) =>
              user_topi.id === variables.id ? res[0] : user_topi
            )
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
    
  
//削除
  const deleteUser_TopiMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from('user_topis').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (_, variables) => {
        const previousTodos = queryClient.getQueryData<User_Topi[]>(['user_topis'])
        if (previousTodos) {
          queryClient.setQueryData(
            ['user_topis'],
            previousTodos.filter((user_topi) => user_topi.id !== variables)
          )
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return { createUser_TopiMutation, updateUser_TopiMutation, deleteUser_TopiMutation}
}