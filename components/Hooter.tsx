import classes from 'components/Layout.module.css'

import { FC } from "react"
import Image from "next/image"
import { CameraIcon } from "@heroicons/react/solid"
import { format } from "date-fns"
import useStore from "../store"
import { useQueryTopi } from "../hooks/useQueryTopi"
import { useMutateTopi } from "../hooks/useMutateTopi"
import { useDownloadUrl } from "../hooks/useDownloadUrl"



export const Hooter: FC = () => {
  const session = useStore((state) => state.session)
  const editedTopi = useStore((state) => state.editedTopi)
  const update = useStore((state)=> state.updateEditedTopi)
  
  const { data: topi } = useQueryTopi()
  return (
      <div>
          <div className='text-center'>
              <p className='text-xs'>©たかはし</p>
              <p className='text-xs'>識別番号（admin確認用):</p>
              <p className='text-xs'>{topi?.id}</p>
          </div>
          </div>
  )
}
