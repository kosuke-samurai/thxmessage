import { FC } from 'react'
import { useQueryUserTopis } from '../../hooks/botsu/useQueryUserTopis'
import { SpecialTopiTitle } from '../SpecialTopiTitle'

export const SpecialTopiList: FC = () => {
  const { data: user_topis, status } = useQueryUserTopis()
 
  return (
    <ul className="my-2">
      {user_topis?.map((user_topi) => (
          <SpecialTopiTitle
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