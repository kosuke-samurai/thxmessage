import classes from 'components/Layout.module.css'
import Link from 'next/link';


//ボタン
import { useState } from 'react'
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

//ヘッダー
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { supabase } from '../utils/supabase';


//追記
import useStore from '../store';
import { useEffect } from 'react';
import {AttendName} from './AttendName'



function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 0,
                m: 0,
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {

    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};


export function Layout({ children }) {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }


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
        <div>
            <header className={classes.header}>

                <AttendName />

                <Typography component="div">
                    <ButtonGroup variant='' color='inherit' >
                        <Link href='/'><Button sx={{ p: 0.5, m: 0, }}><Box sx={{ flexDirection: 'column' }}><Item><HomeIcon /></Item><Item sx={{ fontSize: 10 }}>ホーム</Item></Box></Button></Link>
                        <Button sx={{ p: 0.5, m: 0, }} onClick={signOut}><Box sx={{ flexDirection: 'column' }}><Item><LogoutIcon /></Item><Item sx={{ fontSize: 10 }}>ログアウト</Item></Box></Button>
                    </ButtonGroup>
                </Typography>

                {/* <form action="{{ route('logout') }}" method="POST">
          @csrf 
          <button type="submit" className={classes.logout_button}>
            <Image src="/img/header/logout16.jpg" alt="" width={72} height={16} />
            <p classNames={classes.logout}> ログアウト </p>
          </button>
        </form> */}
            </header>

            <main>{children}</main>
        </div>
    )
}