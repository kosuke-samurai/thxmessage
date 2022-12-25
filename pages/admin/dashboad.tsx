import { FC, Suspense } from "react"
import { supabase } from "../../utils/supabase"
import{LogoutIcon, ExclamationCircleIcon}from '@heroicons/react/solid'
import { ErrorBoundary } from 'react-error-boundary'
import { Spinner } from "../../components/Sppiner"
import { UserTopi } from "../../components/UserTopi"

import { useEffect } from "react"
import useStore from "../../store"
import { AdminAuth } from "../../components/AdminAuth"

//セッション判定


const Dashboad: FC = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  },[setSession])


    const signOut =()=> {
      supabase.auth.signOut()
  }
   
    return (
      <>
        {!session ? <AdminAuth /> :
          <div>
        <LogoutIcon className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}/>
      
        <div className="flex flex-col items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className='my-5 h-10 w-10 text-pink-500' />
          }>
            <Suspense fallback={<Spinner />}>
              <UserTopi />
            </Suspense>
          </ErrorBoundary>

            </div>
            </div>}
    </>
  )
}

export default Dashboad