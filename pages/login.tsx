import { useState, FormEvent } from 'react'
import { BadgeCheckIcon, ShieldCheckIcon } from '@heroicons/react/solid'
import type { NextPage } from 'next'
import { useMutateAuth } from '../hooks/useMutateAuth'


const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    }
  }
  
  return (
      <div>
          <div className='flex justify-center'>
              <ShieldCheckIcon className="mb-6 h-12 w-12 text-blue-500" />
              </div>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center'>
          <input
            type="text"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div className='flex justify-center'>
          <input
            type="password"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
        >
          ログイン </button>
      </form>
    </div>
  )
}

//   <div>
//           <div className='flex justify-center'>
//               <ShieldCheckIcon className="mb-6 h-12 w-12 text-blue-500" />
//           </div>
          
//       <form onSubmit={handleSubmit}>
//         <div className='flex justify-center'>
//           <input
//             type="text"
//             required
//             className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value)
//             }}
//           />
//         </div>
//         <div className='flex justify-center'>
//           <input
//             type="password"
//             required
//             className="my-2 rounded border border-gray-300 px-3 py-2 text-sm  placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value)
//             }}
//           />
//         </div>

//         <button
//           type="submit"
//           className="group relative w-full flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
//         >ログイン</button>
//       </form>
//   </div> 
//   )
// }

export default Auth