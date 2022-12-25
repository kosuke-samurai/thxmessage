import Image from 'next/image'
import Link from 'next/link'
import classes from 'components/TopiTitle.module.css'

import { format } from "date-fns"
import ja from "date-fns/locale/ja"



export const TopiTitle = () => {

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
            photo: '/img/holiday.jpg',
            created_at: '2022-12-26T09:17:06.220499+00:00'
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
            photo: '/img/holiday.jpg',
            created_at: '2022-12-26T09:17:06.220499+00:00'
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
            photo: '/img/holiday.jpg',
            created_at: '2022-12-26T09:17:06.220499+00:00'
        },

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
                    photo: topi.photo,
                    created_at: topi.created_at
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
                                     {topiInfo.created_at && (<p className={classes.topi_time}>{format(new Date(topiInfo.created_at), 'MM/dd(E) HH:mm', { locale: ja })}</p>)}
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


