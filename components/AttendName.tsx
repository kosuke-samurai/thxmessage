import classes from 'components/Layout.module.css'

import { FC } from "react"
import Image from "next/image"
import { CameraIcon } from "@heroicons/react/solid"
import { format } from "date-fns"
import useStore from "../store"
import { useQueryTopi } from "../hooks/useQueryTopi"
import { useMutateTopi } from "../hooks/useMutateTopi"
import { useDownloadUrl } from "../hooks/useDownloadUrl"
import { useUploadEmbImg } from "../hooks/useUploadEmbImg"
import { useUploadHiImg } from "../hooks/useUploadHiImg"
import { useUploadMainImg } from "../hooks/useUploadMainImg"
import { Spinner } from "./Sppiner"



export const AttendName: FC = () => {
  const session = useStore((state) => state.session)
  const editedTopi = useStore((state) => state.editedTopi)
  const update = useStore((state)=> state.updateEditedTopi)
  
  const { data: topi } = useQueryTopi()
  const { updateTopiMutation } = useMutateTopi()
  const { useMutateUploadHiImg } = useUploadHiImg()
  const { useMutateUploadMainImg } = useUploadMainImg()
  const { useMutateUploadEmbImg } = useUploadEmbImg()

  // const { fullUrl: hiUrl, isLoading } = useDownloadUrl(
  const { fullUrl: hiUrl, isLoading } = useDownloadUrl(
    editedTopi.hi_img,
    'hi'
  )
  // const { fullUrl: mainUrl, isLoading } = useDownloadUrl(
  const { fullUrl: mainUrl } = useDownloadUrl(
    editedTopi.main_img,
    'main'
  )
  // const { fullUrl: embUrl, isLoading } = useDownloadUrl(
  const { fullUrl: embUrl } = useDownloadUrl(
    editedTopi.emb_img,
    'emb'
  )
  
 
  return (
        <div>
                <div className={classes.search_container}>
                    <input type="text"  value={topi?.name} readOnly />
                    <input type="submit" value="さまへ" disabled />
                </div>
        </div>
  )
}