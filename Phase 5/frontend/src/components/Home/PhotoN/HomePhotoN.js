import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import './css_to_these/homePhotoN.css';
import axios from "axios";
import React from 'react';
import PhotoDetails from './PhotoView.js' ;

const HomePhotoN = () => {

    const [photos,setPhotos] = useState([])

    useEffect(() => {
        axios
          .get("http://localhost:5001/api/get")
          .then((res) => {
            console.log(res.data);
            // Process the data if necessary, e.g., convert it to URLs or keep as base64
            const processedPhotos = res.data.map(photo => ({
              ...photo,
              // If needed, you can convert the base64 to a URL like this:
              // url: `data:image/jpeg;base64,${photo.data}`
            }));
            setPhotos(processedPhotos);
            console.log(photos[0])
          })
          .catch((err) => console.log(err));
      }, []);

    return(
        <div className="center">

            {/* <Menu
            onClick={(key)=>{
                navigate(key)
            }}
            items={[
                {label:"All Photos", key: "/home/photon/all"},
                {label:"Shared", key: "/home/photon/share"},
                {label:"Saved", key: "/home/photon/save"},
                {label:"Favs", key: "/home/photon/fav"},
                {label:"Albums", key: "/home/photon/album"},
                {label:"Locked", key: "/home/photon/lock"},
                {label:"Bin", key: "/home/photon/bin"},
            ]}
            >
            </Menu> */}

            <div className="sidebar">
            <ul>
                <li><a href="/home/photon" className = "current">All Photos</a></li>
                <li><a href="/home/photon/share">Shared</a></li>
                <li><a href="/home/photon/save">Saved</a></li>
                <li><a href="/home/photon/fav">Favorites</a></li>
                <li><a href="/home/photon/album">Albums</a></li>
                <li><a href="/home/photon/lock">Locked</a></li>
                <li><a href="/home/photon/bin">Bin</a></li>
            </ul>
            </div>
            <div className="main-content">
            <Grid photos={photos} flag={0} />
            </div>
            
        </div>
    )
}

export default HomePhotoN;