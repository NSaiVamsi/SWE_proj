import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";

const HomePhotoN = () => {

    const [photos,setPhotos] = useState([])

    useEffect(() => {
        axios
          .get("http://localhost:5000/api/get")
          .then((res) => {
            console.log(res.data);
            setPhotos(res.data);
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
                <li><a href="/home/photon">All Photos</a></li>
                <li><a href="/home/photon/share">Shared</a></li>
                <li><a href="/home/photon/save">Saved</a></li>
                <li><a href="/home/photon/fav">Favs</a></li>
                <li><a href="/home/photon/album">Albums</a></li>
                <li><a href="/home/photon/lock">Locked</a></li>
                <li><a href="/home/photon/bin">Bin</a></li>
            </ul>
            </div>
            <div className="main-content">
            <Grid photos={photos} />
            </div>
            
        </div>
    )
}

export default HomePhotoN;