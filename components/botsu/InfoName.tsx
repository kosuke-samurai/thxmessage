import classes from 'components/Layout.module.css'
//追記
import { FC } from 'react'
import useStore from '../../store'
import { useMutateUser_Topi } from '../../hooks/botsu/useMutateUser_Topi'
import { User_Topi } from '../../types/types'

export const InfoName: FC<Omit<User_Topi, 'created_at' | 'user_id'>> = ({id,name}
) => { 
    console.log(name);
    return (
        <div>
                <div className={classes.search_container}>
                    <input type="text"  value={name} readOnly />
                    <input type="submit" value="さまへ" disabled />
                </div>
        </div>
    )
}