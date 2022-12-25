import * as React from 'react';
import Image from 'next/image';
import { Layout } from '../../components/Layout'


import classes from 'styles/article.module.css'

import AssignmentIcon from '@mui/icons-material/Assignment';

import { useRouter } from 'next/router';

export default function Article() {

    const router = useRouter();
    console.log(router.query.meinImg);

    return (

        <Layout>

            <main id="article_main" className={classes.article_main}>

                <div className={classes.article_detail}>
                    <div className={classes.image_container}>
                        <Image src={router.query.meinImg} alt="" layout="fill" className={classes.image} />
                    </div>

                    <div className=''>
                        <h1 className={classes.article_title}>{router.query.title}</h1>
                        <p className={classes.topi_time}>11/17（金）17:29</p>
                    </div>

                </div>

                <div className={classes.article_lead}>
                    <p className={classes.article_detail_text}>
                        {router.query.lead}
                    </p>
                </div>

                <div>

                    <div className={classes.kokopoi}>
                        <AssignmentIcon sx={{ my: -1, }} />
                    </div>

                    <div>
                        <dl className={classes.kokopoi_detail}>
                            <dt className={classes.dt}>{router.query.question}</dt>
                            <dd className={classes.kokopoi_detail_qa}>
                                <div>A.</div>
                                <div>
                                    {router.query.answer}
                                </div>
                            </dd>
                        </dl>



                        <dl className={classes.kokopoi_detail}>
                            <dt className={classes.dt}>{router.query.phototitle}</dt>
                            <dd className={classes.img_center}>
                                <div className={classes.image_container}>
                                    <Image src={router.query.photo} alt="" layout="fill" className={classes.image} />
                                </div>
                            </dd>
                        </dl>


                    </div>

                </div>

            </main>

        </Layout>
    )
}