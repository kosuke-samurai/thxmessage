import { FC } from 'react'
import { useQueryUserTopis } from '../hooks/botsu/useQueryUserTopis'
import { Spinner } from './Sppiner'
import { User_TopiItem } from './User_TopiItem'

export const User_TopiList: FC = () => {
  const { data: user_topis, status } = useQueryUserTopis()
  if (status === 'loading') return <Spinner />
  if (status === 'error') return <p>{'Error'}</p>
  return (
    <ul className="my-2">
      {user_topis?.map((user_topi) => (
          <User_TopiItem
              key={user_topi.id}
              id={user_topi.id}
              name={user_topi.name}
              title={user_topi.title}
              hi_img={user_topi.hi_img}
              main_img={user_topi.main_img}
              body={user_topi.body}
              question={user_topi.question}
              answer={user_topi.answer}
              emb_title={user_topi.emb_title}
              emb_img={user_topi.emb_img}
              administrators_id={user_topi.id} />
      ))}
    </ul>
  )
}