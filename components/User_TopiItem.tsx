import { FC } from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import useStore from '../store'
import { useMutateUser_Topi } from '../hooks/botsu/useMutateUser_Topi'
import { User_Topi } from '../types/types'

export const User_TopiItem: FC<Omit<User_Topi, 'created_at' | 'user_id'>> = ({
    id,
    name,
    title,
    hi_img,
    main_img,
    body,
    question,
    answer,
    emb_title,
  emb_img,
}) => {
  const update = useStore((state) => state.updateEditedUser_Topi)
  const { deleteUser_TopiMutation } = useMutateUser_Topi()

  return (
      <li className="my-3 text-lg font-extrabold">
          <span>{name}</span>
          <span>{title}</span>
          <span>{hi_img}</span>
          <span>{main_img}</span>
          <span>{body}</span>
          <span>{question}</span>
          <span>{answer}</span>
          <span>{ emb_title}</span>
          <span>{emb_img}</span>
      <div className="float-right ml-20 flex">
        <PencilAltIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
              update({
                  id: id,
                  name: name,
                  title: title,
                  hi_img: hi_img,
                  main_img: main_img,
                  body: body,
                  question: question,
                  answer: answer,
                  emb_title: emb_title,
                  emb_img: emb_img,
                  administrators_id: id,
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            deleteUser_TopiMutation.mutate(id)
          }}
        />
      </div>
    </li>
  )
}