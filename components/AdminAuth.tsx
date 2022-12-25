import { useState, FormEvent, FC } from "react"
import { ShieldCheckIcon } from "@heroicons/react/solid"
import { useMutateAuth } from "../hooks/useMutateAuth"

export const AdminAuth: FC = () => {
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
    } else {
      registerMutation.mutate()
    }
    }

  return (
    <>
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
        <div className="my-6 flex items-center justify-center text-sm">
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer font-medium hover:text-indigo-500"
          >
            change mode ?
          </span>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </>
  )
}
