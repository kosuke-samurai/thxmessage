import Link from "next/link"
import classes from './TopiTitle.module.css'

import { FC } from "react"
import Image from "next/image"
import { format } from "date-fns"
import ja from "date-fns/locale/ja"
import useStore from "../store"
import { useQueryTopi } from "../hooks/useQueryTopi"
import { useMutateTopi } from "../hooks/useMutateTopi"
import { useDownloadUrl } from "../hooks/useDownloadUrl"
import { useUploadEmbImg } from "../hooks/useUploadEmbImg"
import { useUploadHiImg } from "../hooks/useUploadHiImg"
import { useUploadMainImg } from "../hooks/useUploadMainImg"
import { GetStaticProps } from "next"

import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Spinner } from '../components/Sppiner'

export const SpecialTopiTitle:FC = () => {
  const session = useStore((state) => state.session)
  const editedTopi = useStore((state) => state.editedTopi)
  const update = useStore((state)=> state.updateEditedTopi)
  
  const { data: topi } = useQueryTopi()
 

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


    
    return (
        <>

            
                    <div key={topi?.id}>

{topi?.created_at === 'undefined' ?  <Spinner /> :
                        <Link href='/specialArticle'>
                            <article className={classes.article}>
                                <div>
                                    <Image src={hiUrl} alt='' width={52} height={52} />
                                </div>

                                <div className={classes.topi}>

                                    <h1 className={classes.topi_title}>{topi?.title}</h1>
                                     {topi?.created_at && (<p className={classes.topi_time_special}>{format(new Date(topi?.created_at), 'MM/dd(E) HH:mm', { locale: ja })}</p>)} 

                                </div>
                            </article>
                        </Link>
            }
                    </div>
            </>
            
                )
}