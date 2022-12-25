import Head from 'next/head'
import Image from 'next/image'
import { Layout } from '../components/Layout'
import styles from '../styles/Home.module.css'
import useStore from "../store"
import { useEffect } from "react"
import { supabase } from '../utils/supabase'


//グロナビ
import { Glonavi } from '../components/Glonavi'
// タブ
import { SwiperTab } from '../components/SwiperTab'



export default function Home() {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
    useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    }
    )
    },[setSession])
  
  return (
    <Layout>
      {/* グロナビ */}
      <Glonavi />
      {/* タブ */}
      <SwiperTab />
   </Layout>
  )
}
