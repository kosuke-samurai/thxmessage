import Head from 'next/head'
import Image from 'next/image'
import { Layout } from '../components/Layout'
import styles from '../styles/Home.module.css'
import useStore from "../store"
import { useEffect } from "react"
import { supabase } from '../utils/supabase' 

import { FC, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Spinner } from '../components/Sppiner'

//グロナビ
import { Glonavi } from '../components/Glonavi'
// タブ
import { SwiperTab } from '../components/SwiperTab'

//追記
import { AdminAuth } from "../components/AdminAuth"
import Auth  from './login'


const Home: FC = () => {
  //セッション判定
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])


  const signOut = () => {
    supabase.auth.signOut()
  }
  
  return (
  <>
    {!session ? <Auth /> :
      <Layout>
      
        <ErrorBoundary
          fallback={
            <ExclamationCircleIcon className='my-5 h-10 w-10 text-pink-500' />} >
          <Suspense fallback={<Spinner />}>
            {/* グロナビ */}
            <Glonavi />
          </Suspense >
        </ErrorBoundary>
      
        <ErrorBoundary
          fallback={
            <ExclamationCircleIcon className='my-5 h-10 w-10 text-pink-500' />} >
          <Suspense fallback={<Spinner />}>
            {/* タブ */}
            <SwiperTab />
          </Suspense >
        </ErrorBoundary>

      </Layout>
      }
      </>

  )
}

export default Home