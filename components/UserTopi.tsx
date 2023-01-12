import { FC } from "react"
import Image from "next/image"
import { CameraIcon } from "@heroicons/react/solid"
import { format } from "date-fns"
import ja from "date-fns/locale/ja";
import useStore from "../store"
import { useQueryTopi } from "../hooks/useQueryTopi"
import { useMutateTopi } from "../hooks/useMutateTopi"
import { useDownloadUrl } from "../hooks/useDownloadUrl"
import { useUploadEmbImg } from "../hooks/useUploadEmbImg"
import { useUploadHiImg } from "../hooks/useUploadHiImg"
import { useUploadMainImg } from "../hooks/useUploadMainImg"
import { Spinner } from "./Sppiner"

//トリミング
import ReactCrop from "react-image-crop/dist/ReactCrop";

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
    
      <label className="mb-8"><h1 className="text-lg bg-indigo-600 text-white rounded px-7 py-5 font-medium "><span className='font-bold'>{topi?.name}</span>さま用のトピ、編集画面</h1>
      {topi?.created_at && (
        <p className="my-1 text-sm">
          作成日：{format(new Date(topi.created_at), 'MM月dd日(E) HH:mm', { locale: ja })}
        </p>
      )}
      {topi?.updated_at && (
        <p className="my-1 text-sm">
          {format(new Date(topi.updated_at), 'yyyy-MM-dd HH:mm:ss')}
        </p>
        )}
        </label>

      {/* 入力フォーム */}
    <div className="w-10/12 mx-auto md:max-w-md">
      <div className="mb-8">
        <label className="text-sm block font-bold">名前（画面に表示する名前）</label>
        <input
          className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
          type="text"
          value={editedTopi.name || ''}
          onChange={(e) => update({ ...editedTopi, name: e.target.value })}
          />
      </div>

      <div className="mb-8">
        <label className="text-sm block font-bold">トピ見出し（15.5文字）</label>
        <input
          className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
          type="text"
          value={editedTopi.title || ''}
          onChange={(e) => update({ ...editedTopi, title: e.target.value })}
          />
      </div>

      <div className="mb-8">
      <label className="text-sm block font-bold">HL写真（正方形）</label>
      {hiUrl && (
        <Image
          src={hiUrl}
          alt='hi'
          className=""
          width={52}
        height={52} />
      )}
      {isLoading && <Spinner />}
      
        <label htmlFor="hi" className="flex">
          </label>
        <input
          className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-50 file:text-gray-700
      hover:file:bg-gray-100"
          type="file"
          id="hi"
          accept="image/*"
          onChange={(e) => useMutateUploadHiImg.mutate(e)}
          />
        {/* {hiUrl && (
          <ReactCrop
            src={hiUrl}
          onChange={(e) => update({ ...editedTopi, hi_img: e.target.files })}
          />
        )} */}
     </div>

      <div className="mb-8">
      <label className="text-sm block font-bold">メイン写真（長方形）</label>
      {mainUrl && (
        <Image
          src={mainUrl}
          alt='main'
          className=""
          width={150}
        height={50} />
      )}
      {isLoading && <Spinner />}
      
        <label htmlFor="main" className="flex">
        </label>
        <input
          className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-50 file:text-gray-700
      hover:file:bg-gray-100"
          type="file"
          id="main"
          accept="image/*"
          onChange={(e) =>  useMutateUploadMainImg.mutate(e)}
            />
        </div>
        
      <div className="mb-8">
        <label className="text-sm block font-bold">HL本文（リード）</label>
        <textarea
          className="w-full h-32 py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
          
          value={editedTopi.body || ''}
          onChange={(e) => update({ ...editedTopi, body: e.target.value })}
        />
      </div>

    <div className="mb-8">
      <label className="text-sm block font-bold">関連リンク（question）</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedTopi.question || ''}
        onChange={(e) => update({ ...editedTopi, question: e.target.value })}
          />
    </div>

    <div className="mb-8">
      <label className="text-sm block font-bold">関連リンク（answer）</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedTopi.answer || ''}
        onChange={(e) => update({ ...editedTopi, answer: e.target.value })}
          />
    </div>
        

    <div className="mb-8">
      <label className="text-sm block font-bold">関連リンク（画像エンべのタイトル）</label>
      <input
        className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
        type="text"
        value={editedTopi.emb_title || ''}
        onChange={(e) => update({ ...editedTopi, emb_title: e.target.value })}
          />
    </div>

    <div className="mb-8">
      <label className="text-sm block font-bold">関連リンク（エンべの写真）</label>

      {embUrl && (
        <Image
          src={embUrl}
          alt='emb'
          className=""
          width={150}
        height={150} />
      )}
      {isLoading && <Spinner />}
      
        <label htmlFor="emb" className="flex">
        </label>
        <input
          className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-50 file:text-gray-700
      hover:file:bg-gray-100"
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
        
    </div>
    </>
  )
}
