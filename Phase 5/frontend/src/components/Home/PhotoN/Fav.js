import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from 'react';
import './css_to_these/fav.css';

const Fav= () => {

    const [photos,setPhotos] = useState([])

    useEffect(() => {
        axios
          .get("http://localhost:5001/api/get/fav")
          .then((res) => {
            console.log(res.data);

            const processedPhotos = res.data.map(photo => ({
              ...photo,
            }));

            setPhotos(processedPhotos);
            console.log(photos[0])
          })
          .catch((err) => console.log(err));
      }, []);

    return(
        <div className="center">
          <div className="sidebar">
            <ul>
                <li><a href="/home/photon">All Photos</a></li>
                <li><a href="/home/photon/share">Shared</a></li>
                <li><a href="/home/photon/save">Saved</a></li>
                <li><a href="/home/photon/fav" className='current'>Favorites</a></li>
                <li><a href="/home/photon/album">Albums</a></li>
                <li><a href="/home/photon/lock">Locked</a></li>
                <li><a href="/home/photon/bin" >Bin</a></li>
            </ul>
            </div>
        <div className="main-content">
        <Grid photos={photos} flag={0} />
        </div>
            
        </div>
    )
}

export default Fav;
