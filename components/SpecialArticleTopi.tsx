import Link from "next/link"
import classes from 'styles/article.module.css'
import { Layout } from './Layout'

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
import { Spinner } from './Sppiner'
import AssignmentIcon from '@mui/icons-material/Assignment';

export const SpecialArticleTopi: FC = () => {
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
                <div className={classes.image_container}>
                    <Image src={mainUrl} alt="" layout="fill" className={classes.image} />
                 </div>
              
            <main className={classes.article_main}>
                <div className={classes.article_detail}>
                    <div className=''>
                        <h1 className={classes.article_title}>{topi?.title}</h1>
                        {/* <p className={classes.topi_time}>11/17（金）17:29</p> */}
                        {topi?.created_at && (<p className={classes.topi_time_special}>{format(new Date(topi?.created_at), 'MM/dd(E) HH:mm', { locale: ja })}</p>)}
                    </div>

                </div>

                <div className={classes.article_lead}>
                    <p className={classes.article_detail_text}>
                        {topi?.body}
                    </p>
                </div>

                <div>

                    <div className={classes.kokopoi}>
                        <AssignmentIcon sx={{ my: -1, }} />
                    </div>

                    <div>
                        <dl className={classes.kokopoi_detail}>
                            <dt className={classes.dt}>{topi?.question}</dt>
                            <dd className={classes.kokopoi_detail_qa}>
                                <div>A.</div>
                                <div>
                                    {topi?.answer}
                                </div>
                            </dd>
                        </dl>



                        <dl className={classes.kokopoi_detail}>
                            <dt className={classes.dt}>{topi?.emb_title}</dt>
                            <dd className={classes.img_center}>
                                <div className={classes.image_container}>
                                    <Image src={embUrl} alt="" layout="fill" className={classes.image} />
                                </div>
                            </dd>
                        </dl>


                    </div>

                </div>

            </main>
</div>
        </>
  )
}
