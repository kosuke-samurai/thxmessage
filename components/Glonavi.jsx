import Link from 'next/link'

import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { useState } from 'react'

//グロナビのロゴ
import EventSeatIcon from '@mui/icons-material/EventSeat'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import WcIcon from '@mui/icons-material/Wc'
import ChildCareIcon from '@mui/icons-material/ChildCare';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import TrainIcon from '@mui/icons-material/Train';
import { pink } from '@mui/material/colors';


//追記
import { FC, ReactNode } from "react"
import Head from "next/head"

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

export function Glonavi() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }


    return (

        <div>
            {/* グロナビ */}
            < Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },

                }
                }
            >

                <ButtonGroup variant="text" color='inherit' aria-label="text button group" fullWidth={true}>
                    <Button><Box sx={{ flexDirection: 'column' }}><Item><EventSeatIcon sx={{ color: pink[500] }} /></Item><Item>席次表</Item></Box></Button>
                    <Button><Box sx={{ flexDirection: 'column' }}><Item><RestaurantIcon sx={{ color: pink[500] }} /></Item><Item>メニュー</Item></Box></Button>
                    <Button><Box sx={{ flexDirection: 'column' }}><Item><WcIcon sx={{ color: pink[500] }} /></Item><Item>トイレ</Item></Box></Button>
                    <Button><Box sx={{ flexDirection: 'column' }}><Item><ChildCareIcon sx={{ color: pink[500] }} /></Item><Item>授乳</Item></Box></Button>
                </ButtonGroup>

                <ButtonGroup variant="text" color='inherit' aria-label="text button group" fullWidth={true}>
                    <Button><Box sx={{ flexDirection: 'column' }}><Item><SmokingRoomsIcon sx={{ color: pink[500] }} /></Item><Item>喫煙所</Item></Box></Button>
                    <Button><Box sx={{ flexDirection: 'column' }}><Item><WbSunnyIcon sx={{ color: pink[500] }} /></Item><Item>天気</Item></Box></Button>
                    <Button><Link href={{ pathname: `nijikai`}}><Box sx={{ flexDirection: 'column' }}><Item><LocalBarIcon sx={{ color: pink[500] }} /></Item><Item>二次会</Item></Box></Link></Button>
                    <Button><Link href='https://transit.yahoo.co.jp/?from=%E8%A5%BF%E9%89%84%E7%A6%8F%E5%B2%A1&to=&fromgid=&togid=&flatlon=%2C%2C28273&tlatlon=&via=&viacode=&y=2022&m=12&d=12&hh=17&m1=2&m2=3&type=1&ticket=ic&expkind=1&userpass=1&ws=3&s=0&al=1&shin=1&ex=1&hb=1&lb=1&sr=1'><Box sx={{ flexDirection: 'column' }}><Item><TrainIcon sx={{ color: pink[500] }} /></Item><Item>帰路</Item></Box></Link></Button>
                </ButtonGroup>

            </Box >

        </div>
    )

}