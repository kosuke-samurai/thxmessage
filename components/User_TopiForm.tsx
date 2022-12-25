import { FormEvent, FC } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateUser_Topi } from '../hooks/botsu/useMutateUser_Topi'


export const User_TopiForm: FC = () => {

  const { editedUser_Topi } = useStore()
  const update = useStore((state) => state.updateEditedUser_Topi)
  const { createUser_TopiMutation, updateUser_TopiMutation } = useMutateUser_Topi()
  
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedUser_Topi.id === '')
        createUser_TopiMutation.mutate({
        name: editedUser_Topi.name,
        user_id: supabase.auth.user()?.id,
        title: editedUser_Topi.title,
        hi_img: editedUser_Topi.hi_img,
        main_img: editedUser_Topi.main_img,
        body: editedUser_Topi.body,
        question: editedUser_Topi.question,
        answer: editedUser_Topi.answer,
        emb_title: editedUser_Topi.emb_title,
        emb_img: editedUser_Topi.emb_img,
    // ※↓
    administrators_id: supabase.auth.user()?.id,
      })
    else {
      updateUser_TopiMutation.mutate({
        id: editedUser_Topi.id,
        name: editedUser_Topi.name,
        title: editedUser_Topi.title,
        hi_img: editedUser_Topi.hi_img,
        main_img: editedUser_Topi.main_img,
        body: editedUser_Topi.body,
        question: editedUser_Topi.question,
        answer: editedUser_Topi.answer,
        emb_title: editedUser_Topi.emb_title,
        emb_img: editedUser_Topi.emb_img,
        // ※↓
        administrators_id: supabase.auth.user()?.id,  
      })
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="出席者名"
        value={editedUser_Topi.name}
        onChange={(e) => update({ ...editedUser_Topi, name: e.target.value })}
          />

      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="15.5文字見出し"
        value={editedUser_Topi.title}
        onChange={(e) => update({ ...editedUser_Topi, title: e.target.value })}
          />

      <input
        type="file"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="写真（正方形）"
        multiple
        value={editedUser_Topi.hi_img}
        onChange={(e) => update({ ...editedUser_Topi, hi_img: e.target.value })}
          />

      <input
        type="file"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="メイン写真（長方形）"
        multiple
        value={editedUser_Topi.main_img}
        onChange={(e) => update({ ...editedUser_Topi, main_img: e.target.value })}
          />

      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="リード文"
        value={editedUser_Topi.body}
        onChange={(e) => update({ ...editedUser_Topi, body: e.target.value })}
          />

      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="関連リンク：Question"
        value={editedUser_Topi.question}
        onChange={(e) => update({ ...editedUser_Topi, question: e.target.value })}
          />

      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="関連リンク：Answer"
        value={editedUser_Topi.answer}
        onChange={(e) => update({ ...editedUser_Topi, answer: e.target.value })}
          />

      <input
        type="text"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="エンべ画像のタイトル"
        value={editedUser_Topi.emb_title}
        onChange={(e) => update({ ...editedUser_Topi, emb_title: e.target.value })}
          />
         
      <input
        type="file"
        className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
        placeholder="エンべ画像"
        multiple
        value={editedUser_Topi.emb_img}
        onChange={(e) => update({ ...editedUser_Topi, emb_img: e.target.value })}
          />
          


      <button
        type="submit"
        className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium  text-white hover:bg-indigo-700 "
      >
        {editedUser_Topi.id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}