import React from "react";

const Grid = ({ photos }) => {
  return (
    <div>
      {photos.map(photo => (
        <img key={photo._id} src={`${photo.data}`} alt="Uploaded" />
      ))}
    </div>
  );
};

export default Grid;