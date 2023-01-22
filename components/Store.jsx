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
      category: 'ラーメン',
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
          onClick={() => {
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
          <React.Fragment>

          <h1 className="text-lg block font-bold">飲み直し</h1>
            {STOREINFOS[0].map((storeinfo) => {
              if (storeinfo.category === '居酒屋') {
                return (
                  <ul>
                    <li>{storeinfo.name}</li>
                  </ul>
                  )
              }
  
})}
            <h1 className="text-lg block font-bold">お酒なし</h1>
            {STOREINFOS[0].map((storeinfo) => {
              if (storeinfo.category === '純喫茶') {
                return (
                  <ul>
                    <li>{storeinfo.name}</li>
                  </ul>
                  )
              }
  
})}
            
            <h1 className="text-lg block font-bold">食べ足りない</h1>
            {STOREINFOS[0].map((storeinfo) => {
              if (storeinfo.category === 'ガッツリ') {
                return (
                  <ul>
                    <li>{storeinfo.name}</li>
                  </ul>
                )
              }
  
})}
            
          <h1 className="text-lg block font-bold">その他</h1>  
            {STOREINFOS[0].map((storeinfo) => {
              if (storeinfo.category !== 'ガッツリ' && storeinfo.category !=='純喫茶' && storeinfo.category !=='居酒屋') {
                return (
                  <ul>
                    <li>{storeinfo.name}</li>
                  </ul>
                )
              }
  
})}

          </React.Fragment>
}

        
      </div>
      

     </React.Fragment>
  );
}
