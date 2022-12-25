import { Layout } from '../components/Layout'
import '../styles/globals.css'

//追記
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { supabase } from '../utils/supabase'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  
  //リダイレクト関連↓
  const { push, pathname } = useRouter()

  const validateSession = async () => {
  const user = supabase.auth.user()
  if (user && pathname === '/login') {
  push('/')
  } if (user && pathname === '/admin/adminlogin') {
   push('/admin/dashboad') 
  }
  else if (!user && pathname !== '/login' && pathname !== '/admin/adminlogin' && pathname !== '/admin/dashboad') {
  await push('/login')
    }
  }

  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && pathname === '/login') {
      push('/')
    }
    if (event === 'SIGNED_IN' && pathname === '/admin/adminlogin') {
      push('/admin/dashboad')
    }
    if (event === 'SIGNED_OUT') {
      push('/login')
    }
  })
  useEffect(() => {
    validateSession()
  }, [])
   //リダイレクト関連↑

  return (
    <QueryClientProvider client={queryClient}>
     
      <Component {...pageProps} />
      
      </QueryClientProvider>
  )
}
