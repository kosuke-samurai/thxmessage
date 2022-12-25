import { FC } from "react"
import Image from "next/image"
import { CameraIcon } from "@heroicons/react/solid"
import { format } from "date-fns"
import useStore from "../store"
import { useQueryTopi } from "../hooks/useQueryTopi"
import { useMutateTopi } from "../hooks/useMutateTopi"
import { useDownloadUrl } from "../hooks/useDownloadUrl"
import { useUploadEmbImg } from "../hooks/useUploadEmbImg"
import { useUploadHiImg } from "../hooks/useUploadHiImg"
import { useUploadMainImg } from "../hooks/useUploadMainImg"
import { Spinner } from "./Sppiner"

export const UserTopi: FC = () => {
  const session = useStore((state) => state.session)
  const editedTopi = useStore((state) => state.editedTopi)
  const update = useStore((state)=> state.updateEditedTopi)
  
  const { data: topi } = useQueryTopi()
  const { updateTopiMutation } = useMutateTopi()
  const { useMutateUploadHiImg } = useUploadHiImg()
  const { useMutateUploadMainImg } = useUploadMainImg()
  const { useMutateUploadEmbImg } = useUploadEmbImg()

  // const { fullUrl: hiUrl, isLoading } = useDownloadUrl(
  const { fullUrl: hiUrl, isLoading } = useDownloadUrl(
    editedTopi.hi_img,
    'hi'
  )
  // const { fullUrl: mainUrl, isLoading } = useDownloadUrl(
  const { fullUrl: mainUrl } = useDownloadUrl(
    editedTopi.main_img,
    'main'
  )
  // const { fullUrl: embUrl, isLoading } = useDownloadUrl(
  const { fullUrl: embUrl } = useDownloadUrl(
    editedTopi.emb_img,
    'emb'
  )


  //updateボタンが押下された際に発動する関数
  const updateTopi = () => {
    updateTopiMutation.mutate({
        id: session?.user?.id,
        name: editedTopi.name,
        user_id: session?.user?.id,
        title: editedTopi.title,
        hi_img: editedTopi.hi_img,
        main_img: editedTopi.main_img,
        body: editedTopi.body,
        question: editedTopi.question,
        answer: editedTopi.answer,
        emb_title: editedTopi.emb_title,
        emb_img: editedTopi.emb_img,
    })
  }

  return (
    // 以下new
    <>
      <p className="mb-4">名前：{topi?.name}</p>
      {topi?.created_at && (
        <p className="my-1 text-sm">
          {format(new Date(topi.created_at), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      )}
      {topi?.updated_at && (
        <p className="my-1 text-sm">
          {format(new Date(topi.updated_at), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      )}

      {/* 入力フォーム */}
      <p className="mt-4">名前</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        value={editedTopi.name || ''}
        onChange={(e) => update({ ...editedTopi, name: e.target.value })}
      />

      <p>トピ見出し（15.5文字）</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        value={editedTopi.title || ''}
        onChange={(e) => update({ ...editedTopi, title: e.target.value })}
      />

      <p>HL写真（正方形）</p>
      {hiUrl && (
        <Image
          src={hiUrl}
          alt='hi'
          className="rounded-full"
          width={150}
        height={150} />
      )}
      {isLoading && <Spinner />}
      <div className="flex justify-center">
        <label htmlFor="hi">
        <CameraIcon className="my-3 h-7 w-7 cursor-pointer text-gray-500" />
        </label>
        <input
          className="hidden"
          type="file"
          id="hi"
          accept="image/*"
          onChange={(e) => useMutateUploadHiImg.mutate(e)}
            />
      </div>

      <p>メイン写真（長方形）</p>
      {mainUrl && (
        <Image
          src={mainUrl}
          alt='main'
          className="rounded-full"
          width={150}
        height={150} />
      )}
      {isLoading && <Spinner />}
      <div className="flex justify-center">
        <label htmlFor="main">
        <CameraIcon className="my-3 h-7 w-7 cursor-pointer text-gray-500" />
        </label>
        <input
          className="hidden"
          type="file"
          id="main"
          accept="image/*"
          onChange={(e) =>  useMutateUploadMainImg.mutate(e)}
            />
      </div>

      <p>HL本文（リード）</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        value={editedTopi.body || ''}
        onChange={(e) => update({ ...editedTopi, body: e.target.value })}
      />

      <p>関連リンク（question）</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        value={editedTopi.question || ''}
        onChange={(e) => update({ ...editedTopi, question: e.target.value })}
      />

      <p>関連リンク（answer）</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        value={editedTopi.answer || ''}
        onChange={(e) => update({ ...editedTopi, answer: e.target.value })}
      />

      <p>関連リンク（画像エンべのタイトル）</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        value={editedTopi.emb_title || ''}
        onChange={(e) => update({ ...editedTopi, emb_title: e.target.value })}
      />

      <p>関連リンク（エンべの写真）</p>

      {embUrl && (
        <Image
          src={embUrl}
          alt='emb'
          className="rounded-full"
          width={150}
        height={150} />
      )}
      {isLoading && <Spinner />}
      <div className="flex justify-center">
        <label htmlFor="emb">
        <CameraIcon className="my-3 h-7 w-7 cursor-pointer text-gray-500" />
        </label>
        <input
          className="hidden"
          type="file"
          id="emb"
          accept="image/*"
          onChange={(e) =>  useMutateUploadEmbImg.mutate(e)}
            />
      </div>

 
      
      <button
        className={`my-5 rounded ${
          updateTopiMutation.isLoading || !editedTopi.name
          ? 'bg-gray-400'
          : 'bg-indigo-600'
          } px-3 py-2 text-sm font-medium text-white`}
        onClick={updateTopi}
        disabled={updateTopiMutation.isLoading || !editedTopi.name}
      >
        {updateTopiMutation.isLoading ? 'ロード中' : '更新する'}
      </button>
    </>
  )
}
