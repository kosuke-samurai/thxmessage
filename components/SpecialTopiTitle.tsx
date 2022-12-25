import Link from "next/link"
import classes from './TopiTitle.module.css'

import { FC } from "react"
import Image from "next/image"
import { CameraIcon } from "@heroicons/react/solid"
import { format } from "date-fns"
import ja from "date-fns/locale/ja"
import useStore from "../store"
import { useQueryTopi } from "../hooks/useQueryTopi"
import { useMutateTopi } from "../hooks/useMutateTopi"
import { useDownloadUrl } from "../hooks/useDownloadUrl"
import { useUploadEmbImg } from "../hooks/useUploadEmbImg"
import { useUploadHiImg } from "../hooks/useUploadHiImg"
import { useUploadMainImg } from "../hooks/useUploadMainImg"
import { Spinner } from "./Sppiner"

export const SpecialTopiTitle: FC = () => {
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

    
    const topis = [
        {
            id: `${topi?.id}`,
            title: `${topi?.title}`,
            titleImg: `${hiUrl}`,
            meinImg: `${mainUrl}`,
            lead: `${topi?.body}`,
            question: `${topi?.question}`,
            answer:  `${topi?.answer}`,
            phototitle: `${topi?.emb_title}`,
            photo: `${embUrl}`,
            created_at: `${topi?.created_at}`
        },]
    
    return (
        <>
            {topis.map((topi) => {
                const topiInfo = {
                    id: topi.id,
                    title: topi.title,
                    titleImg: topi.titleImg,
                    meinImg: topi.meinImg,
                    lead: topi.lead,
                    question: topi.question,
                    answer: topi.answer,
                    phototitle: topi.phototitle,
                    photo: topi.photo,
                    created_at: topi.created_at
                };

                console.log(topiInfo.created_at)
                return (
                    <div key={topi.id}>
                        <Link as={`articles/${topi.id}`} href={{ pathname: `articles/[article]`, query: topiInfo }}>
                            <article className={classes.article}>
                                <div>
                                    <Image src={topiInfo.titleImg} alt="" width={52} height={52} />
                                </div>

                                <div className={classes.topi}>
                                    <h1 className={classes.topi_title}>{topiInfo.title}</h1>
                                    {topiInfo.created_at && (<p className={classes.topi_time_special}>{format(new Date(topiInfo.created_at), 'MM/dd(E) HH:mm', { locale: ja })}</p>)}
                                </div>
                            </article>
                        </Link>
                    </div>
                )
            })}

            </>
            
                )
}