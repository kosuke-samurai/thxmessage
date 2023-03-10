import Image from 'next/image'
import Link from 'next/link'
import classes from 'components/TopiTitle.module.css'
import { FC } from 'react'

//supabase用追加
import { useRouter } from "next/router"

// ★（SSG）
import { GetStaticProps } from "next"

import { supabase } from "../utils/supabase"

import { Layout } from "../components/Layout"




// export const getStaticProps: GetStaticProps=async () => {
//     console.log('getStaticProps/ssg invoked')
    
//     const { data: user_topi } = await supabase
//         .from('user_topis')
//         .select('*')
//         .order('created_at', { ascending: true })
    
    
//     return { props: { user_topi } }
// }





const TopiTitle: FC = () => {

    // トピ情報の配列
    const topis = [
        {
            id: 1,
            title: "W杯が開幕 力尽くした日本代表",
            titleImg: '/img/holiday.jpg',
            meinImg: '/img/ring_photo.jpg',
            lead: '13日に行われる坂井田家の結婚披露宴（東京・帝国ホテル）のプログラムは、「列席の皆さまに楽しんでほしい」という思いで新郎新婦が共に考えたものだ。新郎新婦入場の際は、盛大な拍手と温かな手拍子で迎えたい。新郎が「ビックリするほどキレイだ」と太鼓判を押す新婦のお色直し後のドレスにも注目だ。披露宴は13日正午開始予定。',
            question: 'どんな人物？',
            answer: '東京都出身。高校時代はラグビー部の主将を務めた。東京都出身。高校時代はラグビー部の主将を務めた。東京都出身。高校時代はラグビー部の主将を務めた。東京都出身。高校時代はラグビー部の主将を務めた。',
            phototitle: '思い出の写真',
            photo: '/img/holiday.jpg'
        },
        {
            id: 2,
            title: "W杯が終わる 力尽くした各国代表",
            titleImg: '/img/holiday.jpg',
            meinImg: '/img/ring_photo.jpg',
            lead: '13日に行われる坂井田家の結婚披露宴（東京・帝国ホテル）のプログラムは、「列席の皆さまに楽しんでほしい」という思いで新郎新婦が共に考えたものだ。新郎新婦入場の際は、盛大な拍手と温かな手拍子で迎えたい。新郎が「ビックリするほどキレイだ」と太鼓判を押す新婦のお色直し後のドレスにも注目だ。披露宴は13日正午開始予定。',
            question: 'どんな人物？',
            answer: '東京都出身。高校時代はラグビー部の主将を務めた。東京都出身。高校時代はラグビー部の主将を務めた。東京都出身。高校時代はラグビー部の主将を務めた。東京都出身。高校時代はラグビー部の主将を務めた。',
            phototitle: '思い出の写真',
            photo: '/img/holiday.jpg'
        },
        {
            id: 3,
            title: "いちご大福活況 田舎町の逆転劇",
            titleImg: '/img/holiday.jpg',
            meinImg: '/img/ring_photo.jpg',
            lead: '13日に行われる坂井田家の結婚披露宴（東京・帝国ホテル）のプログラムは、「列席の皆さまに楽しんでほしい」という思いで新郎新婦が共に考えたものだ。新郎新婦入場の際は、盛大な拍手と温かな手拍子で迎えたい。新郎が「ビックリするほどキレイだ」と太鼓判を押す新婦のお色直し後のドレスにも注目だ。披露宴は13日正午開始予定。',
            question: 'どんな人物？',
            answer: '東京都出身。高校時代はラグビー部の主将を務めた。東京都出身。高校時代はラグビー部の主将を務めた。東京都出身。高校時代はラグビー部の主将を務めた。東京都出身。高校時代はラグビー部の主将を務めた。',
            phototitle: 'るんば',
            photo: '/img/holiday.jpg'
        },
        // {
        //     id: 6,
        //     title:`${user_topi[0].title}`,
        //     titleImg: '/img/holiday.jpg',
        //     meinImg: '/img/ring_photo.jpg',
        //     lead: `${user_topi[0].body}`,
        //     question: `${user_topi[0].question}`,
        //     answer:  `${user_topi[0].answer}`,
        //     phototitle: `${user_topi[0].emb_title}`,
        //     photo: '/img/holiday.jpg'
        // },
    ];

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
                    photo: topi.photo
                };

                return (
                    <div key={topi.id}>
                        <Link as={`articles/${topi.id}`} href={{ pathname: `articles/[article]`, query: topiInfo }}>
                            <article className={classes.article}>
                                <div>
                                    <Image src={topiInfo.titleImg} alt="" width={52} height={52} />
                                </div>

                                <div className={classes.topi}>
                                    <h1 className={classes.topi_title}>{topiInfo.title}</h1>
                                    <p className={classes.topi_time}>11/17（金）17:29</p>
                                </div>
                            </article>
                        </Link>
                    </div>
                )
            })}
            {/* <Link className={classes.HlMidashi} href="/article">
                <article className={classes.article}>
                    <div>
                        <Image src="/img/article_photo.jpg" alt="" width={52} height={52} />
                    </div>

                    <div className={classes.topi}>
                        <h1 className={classes.topi_title}>W杯が開幕 がんばれ日本最後まで</h1>
                        <p className={classes.topi_time}>11/17（金）17:29</p>
                    </div>
                </article>
            </Link> */}


        </>

    )
}

export default TopiTitle