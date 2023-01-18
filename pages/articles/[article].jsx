import * as React from 'react';
import Image from 'next/image';
import { Layout } from '../../components/Layout'
import classes from 'styles/article.module.css'
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useRouter } from 'next/router';
import { format } from "date-fns"
import ja from "date-fns/locale/ja"

//追記
import Head from 'next/head'
import useStore from "../../store"
import { useEffect, useReducer } from "react"
import { supabase } from '../../utils/supabase' 

// import { FC, Suspense } from 'react'
// import { ErrorBoundary } from 'react-error-boundary'
// import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Spinner } from '../../components/Sppiner'
// import { Glonavi } from '../components/Glonavi'
// import { SwiperTab } from '../components/SwiperTab'

import Auth from '../login'

// import { SpecialArticleTopi } from '../components/SpecialArticleTopi'


const Article = () =>{
    //セッション判定
    const session = useStore((state) => state.session)
    const setSession = useStore((state) => state.setSession)
 
   useEffect(() => {
        setSession(supabase.auth.session())
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
       
    }, [setSession])
    

    const router = useRouter();
    console.log(router.query);
    const info = router.query;

    const articlenumber = router.query.article;
    console.log(articlenumber);


    //作業中
    if (typeof window !== "undefined") {

if(info.title){
    const Jsonquery = JSON.stringify(router.query);
    localStorage.setItem(`info${router.query.id}`, Jsonquery);
    console.log('あり');
} else {
    const info = JSON.parse(localStorage.getItem(`info${articlenumber}`));
    console.log(info.meinImg);
    console.log('なし');
}
    
    }



   //作業中↑

    return (
    <>
            {!session ? <Auth /> :
                    
                <Layout>

                        <main id="article_main" className={classes.article_main}>

                            <div className={classes.article_detail}>
                                <div className={classes.image_container}>
                                    <Image src={info.meinImg} alt="" layout="fill" className={classes.image} />
                                </div>

                                <div className=''>
                                    <h1 className={classes.article_title}>{info.title}</h1>
                                    {info.created_at && (<p className={classes.topi_time}>{format(new Date(info.created_at), 'MM/dd(E) HH:mm', { locale: ja })}</p>)}
                                </div>

                            </div>

                            <div className={classes.article_lead}>
                                <p className={classes.article_detail_text}>
                                    {info.lead}
                                </p>
                            </div>

                            <div>

                                <div className={classes.kokopoi}>
                                    <AssignmentIcon sx={{ my: -1, }} />
                                </div>

                                <div>
                                    <dl className={classes.kokopoi_detail}>
                                        <dt className={classes.dt}>{info.question}</dt>
                                        <dd className={classes.kokopoi_detail_qa}>
                                            <div>A.</div>
                                            <div>
                                                {info.answer}
                                            </div>
                                        </dd>
                                    </dl>



                                    <dl className={classes.kokopoi_detail}>
                                        <dt className={classes.dt}>{info.phototitle}</dt>
                                        <dd className={classes.img_center}>
                                            <div className={classes.image_container}>
                                                <Image src={info.photo} alt="" layout="fill" className={classes.image} />
                                            </div>
                                        </dd>
                                    </dl>


                                </div>

                            </div>

                        </main>

                    </Layout>

            }
            </>
    )
}

export default Article