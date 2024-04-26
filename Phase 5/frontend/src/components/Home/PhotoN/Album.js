import React, { useEffect, useState } from "react";
import axios from "axios";
import M from "materialize-css";
import Cookies from "js-cookie";
import './css_to_these/album.css';

const AlbumManager = () => {
  const [newAlbumName, setNewAlbumName] = useState('');
  const [albums, setAlbums] = useState([]);

  // Fetch existing albums from the backend on component mount
  useEffect(() => {
    fetchAlbums();
    M.AutoInit(); // Initialize Materialize components
  }, []);

  // Function to fetch albums
  const fetchAlbums = () => {
    axios.get("http://localhost:5001/api/getAlbums")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => console.error("Error fetching albums:", error));
  };

  // Function to handle the creation of a new album
  const handleCreateAlbum = () => {
    if (!newAlbumName.trim()) {
      alert("Please enter an album name.");
      return;
    }
    console.log(newAlbumName) ;
    const ecookie = Cookies.get('id');
    axios.post("http://localhost:5001/api/album", {
        ownerUserId: ecookie,
        vaultName: newAlbumName,
    })
    .then((response) => {
      fetchAlbums(); // Refresh the album list
      setNewAlbumName(''); // Clear input field
      alert("Album created successfully!");
    })
    .catch((error) => console.error("Error creating album:", error));
  };

  return (
    <div>
      <div className="center">ALBUMS PAGE
      <div className="sidebar">
            <ul>
                <li><a href="/home/photon">All Photos</a></li>
                <li><a href="/home/photon/share">Shared</a></li>
                <li><a href="/home/photon/save">Saved</a></li>
                <li><a href="/home/photon/fav">Favorites</a></li>
                <li><a href="/home/photon/album"  className='current'>Albums</a></li>
                <li><a href="/home/photon/lock">Locked</a></li>
                <li><a href="/home/photon/bin">Bin</a></li>
            </ul>
            </div>
      </div>
      
      <div class="content">
        <div class="input-field">
            <input
                type="text"
                id="album_name"
                value={newAlbumName}
                onChange={(e) => setNewAlbumName(e.target.value)}
                placeholder="Enter new album name"
            />
            <button class="waves-effect waves-light btn" onClick={handleCreateAlbum}>
                Create Album
            </button>
        </div>

        <div>
            <h5>Existing Albums:</h5>
            {albums.length > 0 ? (
                albums.map((album, index) => (
                    <button key={index} class="waves-effect waves-light btn">
                        {album.vaultName}
                    </button>
                ))
            ) : (
                <p>No albums found.</p>
            )}
        </div>
    </div>
    </div>
  );
};

export default AlbumManager;
