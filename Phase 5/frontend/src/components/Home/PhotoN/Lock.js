import { useEffect, useState } from "react";
import Grid from "../../Grid.js";
import axios from "axios";
import React from "react";
import './css_to_these/lock.css'

const Lock = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (authenticated) {
      axios
        .get("http://localhost:5001/api/get/lock")
        .then((res) => {
          console.log(res.data);

          const processedPhotos = res.data.map((photo) => ({
            ...photo,
          }));

          setPhotos(processedPhotos);
          console.log(photos[0]);
        })
        .catch((err) => console.log(err));
    }
  }, [authenticated]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you can add your password validation logic
    if (password === "LOCK") {
      setAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="center">
      {!authenticated ? (
        <div className="container">
        <form className="col s12" onSubmit={handleFormSubmit}>
            <div className="row">
                <div className="input-field col s12">
                    {/* <textarea id="textarea1" className="materialize-textarea" onChange={(e) => { setPassword(e.target.value) }}></textarea> */}
                    <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    />
                    <label htmlFor="textarea1">Password</label>
                </div>
            </div>

            <button className="waves-effect waves-light btn"> Submit </button>
        </form>
        </div>
        
      ) : (
        <Grid photos={photos} flag={2} />
      )}
      <div className="sidebar">
            <ul>
                <li><a href="/home/photon">All Photos</a></li>
                <li><a href="/home/photon/share">Shared</a></li>
                <li><a href="/home/photon/save">Saved</a></li>
                <li><a href="/home/photon/fav">Favorites</a></li>
                <li><a href="/home/photon/album">Albums</a></li>
                <li><a href="/home/photon/lock"  className='current'>Locked</a></li>
                <li><a href="/home/photon/bin" >Bin</a></li>
            </ul>
            </div>
    </div>
  );
};

export default Lock;
