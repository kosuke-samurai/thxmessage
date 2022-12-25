import Link from "next/link"
import { useRouter } from "next/router"
import { NextPage } from "next"
// ★（SSG）
import { GetStaticProps } from "next"

import { supabase } from "../utils/supabase"
import { Layout } from "../components/Layout"


//★データ取得
// export const getStaticProps: GetStaticProps=async () => {
//     console.log('getStaticProps/ssg invoked')
    
//     const { data: topis } = await supabase
//         .from('user_topis')
//         .select('*')
//         .order('created_at', { ascending: true })
    
    
//     return{props:{topis}}
// }

// type StaticProps = {
//     topis: User_Topi[]
// }

// const Ssg: NextPage<StaticProps> = ({ topis }) => {
//     console.log(topis);
//     return (
//         <div>
//             {topis[0].title}
//         </div>
//     )     
//   }

// export default Ssg