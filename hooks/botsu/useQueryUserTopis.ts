import { useQuery } from 'react-query'
import { supabase } from '../../utils/supabase'
import { User_Topi } from '../../types/types'

export const useQueryUserTopis = () => {
  const getUser_Topis = async () => {
    const { data, error } = await supabase
      .from('user_topis')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }
    return data
  }
    
  return useQuery<User_Topi[], Error>({
    queryKey: ['user_topis'],
    queryFn: getUser_Topis,
    staleTime: Infinity,
  })
}