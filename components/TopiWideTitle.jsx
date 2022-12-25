import Image from 'next/image'
import Link from 'next/link'
import classes from 'components/TopiWideTitle.module.css'


export function TopiWideTitle() {

    return (
        <div>

            <Link className={classes.HlMidashi} href="/article/atama">
                <div className={classes.image_container}>
                    <Image src="/img/ring_photo.jpg" alt="" layout="fill" className={classes.image} />

                    <div className={classes.wide_topi}>
                        <h1 className={classes.topi_title}>浜辺美波が第一子女児を妊娠した</h1>
                        <p className={classes.topi_time}>11/17（金）17:29</p>
                    </div>
                </div>
            </Link>

        </div>

    )
}