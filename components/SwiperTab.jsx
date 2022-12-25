import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//タイムライン
import { OppositeContentTimeline } from "components/Timeline"

//トピ
import { TopiWideTitle } from "./TopiWideTitle";
import { TopiTitle } from 'components/TopiTitle';
import { SpecialTopiTitle } from "./SpecialTopiTitle";
import { AttachEmail } from "@mui/icons-material";

//追記



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

export const SwiperTab = () => {
    const [swiper, setSwiper] = useState(null);
    const [value, setValue] = useState(0);

    const slideChange = (index) => {
        setValue(index);
    };

    const tabChange = (event, newValue) => {
        setValue(newValue);
        swiper.slideTo(newValue);
    };





    return (
        <>
            <Box sx={{ width: "100%", bgcolor: "#F7F7F7" }}>
                <Tabs value={value}
                    onChange={tabChange}
                    sx={{
                        '& button': { color: 'A1A1A1', fontWeight: 'bold' },
                        '& button:hover': { backgroundColor: "#FB6673", color: '#FFFFFF' },
                        '& button:active': { backgroundColor: "#FB6673", color: '#FFFFFF' },
                        '& button.Mui-selected': { backgroundColor: "#FB6673", color: '#FFFFFF' }
                    }}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: '#FB6673',
                        }
                    }}
                    centered
                >
                    <Tab label="トピックス" value={0} />
                    <Tab label="思い出" value={1} />
                    <Tab label="未来" value={2} />
                    <Tab label="写真" value={3} />
                </Tabs>
            </Box>

            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={(index) => slideChange(index.activeIndex)}
                onSwiper={(swiper) => {
                    const swiperInstance = swiper;
                    setSwiper(swiperInstance);
                }}
            >
                <SwiperSlide>

                    <TopiWideTitle />
                    <TopiTitle />
                    <SpecialTopiTitle />

                </SwiperSlide>
                <SwiperSlide>思い出<OppositeContentTimeline /></SwiperSlide>
                <SwiperSlide>未来<TopiTitle /></SwiperSlide>
                <SwiperSlide>写真</SwiperSlide>
            </Swiper>
        </>
    );
};