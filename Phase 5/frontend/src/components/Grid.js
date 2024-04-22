import React from "react";
import { Link } from "react-router-dom";

const Grid = ({ photos, flag }) => {
  let gridContent;

  if (flag === 0) {
    gridContent = (
      <div className="grid-container">
        {photos.map(photo => (
          <Link to={`/home/photon/photo-details/${photo._id}`} key={photo._id}>
            <img src={`${photo.data}`} alt="Uploaded" />
          </Link>
        ))}
      </div>
    );
  } 
  if (flag === 1) {
    gridContent = (
      <div>
        {photos.map(photo => (
          <img key={photo._id} src={`${photo.data}`} alt="Uploaded" />
        ))}
      </div>
    );
  }

  return gridContent;
};

export default Grid;

