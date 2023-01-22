import React, { useEffect,useRef } from 'react'
import { useState } from 'react';
import Link from 'next/link';


import { GoogleMap, LoadScript, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { useCallback } from 'react';
import { Spinner } from './Sppiner';



  const STORES = [
    {
      id: 0,
      name: '屋根裏 貘',
      adress: "福岡県福岡市中央区天神3-4-14",
      category: "純喫茶",
      hitokoto: '隠れ家的なカフェです。※喫煙OK',
      detail: 'https://tabelog.com/fukuoka/A4001/A400103/40021201/'
    },
    {
      id: 1,
      name: '炉端NUMBER SHOT',
      adress: '福岡県福岡市中央区大名1-12-36',
      category: '居酒屋',
      hitokoto: '予約しないと入れないかも',
      detail: 'https://tabelog.com/fukuoka/A4001/A400104/40045160/'
    },
    {
      id: 2,
      name: '土竜が俺を呼んでいる',
      adress: '福岡県福岡市中央区大名1-9-18',
      category: '居酒屋',
      hitokoto: '焼酎めっちゃある。締めのラーメンオススメ。※喫煙OK',
      detail: 'https://tabelog.com/fukuoka/A4001/A400104/40020106/'
    },
  ]

const libraries = ["places"];

export const GetStore = () => {

  
  const [isFirstRender, SetIsFirstRender] = useState(false)

  const [STOREINFOS, SetSTOREINFOS] = useState();

  const storearray = [];
  const newstorearray = [];

  function geocode() {
    
    STORES.map((store) => {
      const place = store.adress;
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: place }, (results, status) => {
        
        if (status === 'OK') {
          
          newstorearray.push({
            id: store.id,
            name: store.name,
            adress: store.adress,
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
            category: store.category,
            hitokoto: store.hitokoto,
            detail: store.detail
          });
          SetSTOREINFOS([...storearray, newstorearray]);
        }
      });
      console.log(place);
  
    })
    SetIsFirstRender(true);
    
    // storeRender.current = true

  };


  console.log(STOREINFOS);
  
  console.log(isFirstRender);


//map系表示作業中
    
    const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });
  
    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
      mapRef.current = map;
    }, []);
  
   const [selected, setSelected] = useState(null);
  
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

 
  //作業中↑

  const containerStyle = {
  width: "100%",
  height: "200px",
  };
  


  return (
     <React.Fragment>
        <div>
           <input type="text"
        />
        <button onClick={geocode}>緯度経度コンソール</button>
          
      
        
        {/* {!isFirstRender ? <Spinner /> :   */}
        {!STOREINFOS ? <Spinner /> :
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        zoom={14.5}
        center={{
          lat: 33.5902,
          lng: 130.3976,
        }}
        onLoad={onMapLoad}
        >
        
      {STOREINFOS[0].map((marker) => (
        <Marker
          key={`${marker.lat * marker.lng}`}
          position={{
            lat: marker.lat,
            lng: marker.lng,
          }}
          onMouseOver={() => {
            setSelected(marker);
            // マウスオーバーで<InfoWindow>が描画されます。
          }}

        />
      ))}
          
        {selected ? (
        // MarkerにマウスオーバーされたときにInfoWindowが表示されます。
        <InfoWindow
          position={{
            lat: selected.lat,
            lng: selected.lng,
          }}
          onCloseClick={() => {
            setSelected(null);
          }}
              >
                <ul>
                  <li>{selected.name}</li>
                  <li>ジャンル：{selected.category}</li>
                  <li><Link href={selected.detail}>詳細</Link></li>
                  </ul>
        </InfoWindow>
          ) : null}
          
      </GoogleMap>
         }    
    
    {/* } */}
        
        {!STOREINFOS ? <Spinner /> :
        
          STOREINFOS[0].map((storeinfo) => {
            const InfoStore = {
              id: storeinfo.id,
              name: storeinfo.name,
              adress: storeinfo.adress,
              category: storeinfo.category,
              hitokoto: storeinfo.hitokoto,
              detail: storeinfo.detail
            };
            return (
              <>
                {InfoStore.category === '居酒屋' ? 
                  <React.Fragment>
                <h1>飲み直し</h1>
                <p>{InfoStore.name}</p> 
                  </React.Fragment> :
                  InfoStore.category === '純喫茶' ?
                    <React.Fragment>
                      <h2>お酒なし</h2>
                      <p>{InfoStore.name}</p> 
                    </React.Fragment> :
                    InfoStore.category === 'ガッツリ' ?
                    <React.Fragment>
                        <h2>食べ足りない</h2>
                        <p>{InfoStore.name}</p> 
                    </React.Fragment> :
                    <React.Fragment>
                        <h2>その他</h2>
                        <p>{InfoStore.name}</p> 
                    </React.Fragment>
}
              </>) 
        })
        }


        
      </div>
      

     </React.Fragment>
  );
}
