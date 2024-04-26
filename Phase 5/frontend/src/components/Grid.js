import React from "react";
import { Link } from "react-router-dom";
import './Grid.css'

const Grid = ({ photos, flag }) => {
  let gridContent;

  if (flag === 0) {
    gridContent = (
      <div className="grid-container">
        {photos.map(photo => (
  <Link to={`/home/photon/photo-details/${photo._id}`} key={photo._id} className="grid-item">
    <img src={photo.data} alt="Uploaded" />
  </Link>
))}
      </div>
    );
  } 
  if (flag === 1) {
    gridContent = (
      <div className="grid-container">
        {photos.map(photo => (
  <Link to={`/home/photon/photo-details/${photo._id}`} key={photo._id} className="grid-item">
    <img src={photo.data} alt="Uploaded" />
  </Link>
))}
      </div>
    );
  }
  if (flag === 2) {
    gridContent = (
      <div className="grid-container">
        {photos.map(photo => (
  <Link to={`/home/photon/photo-details/${photo._id}`} key={photo._id} className="grid-item">
    <img src={photo.data} alt="Uploaded" />
  </Link>
))}
      </div>
    );
  }

  return gridContent;
};

export default Grid;