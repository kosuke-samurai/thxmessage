import { useQueryClient, useMutation } from "react-query"
import { supabase } from "../utils/supabase"
import { Topi } from '../types'

export const useMutateTopi = () => {
  const queryClient = useQueryClient()

  //トピ作成用の関数（動画7:30〜）
  const createTopiMutation = useMutation(
    async (topi: Omit<Topi, 'updated_at' | 'created_at'>) => {
      const { data, error } = await supabase.from('profiles').insert(topi)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        queryClient.setQueriesData(['topi'], res[0])
      },
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )

  //トピ更新用の関数
  const updateTopiMutation = useMutation(
    async (topi: Omit<Topi, 'updated_at' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(topi)
        .eq('id', topi.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        queryClient.setQueryData(['topi'],res[0])
      },
        onError: (err: any) => {
          alert(err.message)
        },
      }
    )
    return { createTopiMutation,updateTopiMutation}
}

