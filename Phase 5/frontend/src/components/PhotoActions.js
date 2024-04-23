import React, { useState } from 'react';
import axios from "axios";

const PhotoActionsContainer = ({photo}) => {

  const [isFavorite, setIsFavorite] = useState(photo[0].favoritesFlag);
//   const [imageData, setImageData] = useState(null);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       setImageData(e.target.result);
//     };

//     reader.readAsDataURL(file);
//   };

  const handleDelete = () => {
    // Logic for deleting the photo
    console.log('Deleting photo');
  };

  const handleChangeFavorite = () => {
    // Logic for changing favorite status
    console.log('Changing favorite status');

    const photoId = photo[0]._id; // Assuming you have a unique identifier for the photo
    const isCurrentlyFavorite = !photo[0].favoritesFlag ; // Get the current favorite status

  // Make an API call to update the favorite status
  axios
    .put(`http://localhost:5001/api/photo/${photoId}/favorite/`, { isFavorite: isCurrentlyFavorite })
    .then((res) => {
      console.log('Favorite status updated successfully');
      setIsFavorite(!isCurrentlyFavorite); // Update the local state with the new favorite status
    })
    .catch((err) => {
      console.error('Error updating favorite status:', err);
    });
    
  };

  const handleMakeHidden = () => {
    // Logic for making the photo hidden 
    console.log('Making photo hidden');
  };

  const handleMakeGlobal = () => {
    // Logic for making the photo global
    console.log('Making photo global');
  };

  const handleEditTags = () => {
    // Logic for editing photo tags
    console.log('Editing photo tags');
  };

  const handleDownload = () => {
    // Logic for downloading the photo
    console.log('Downloading photo');
  };

  return (
    <div className="photo-actions-container">

    <div>
        <img src={photo[0].data} alt="Uploaded" />
        <p>Resolution: {photo[0].resolution}</p>
        <p>Size: {photo[0].size}</p>
        <p>Type: {photo[0].type}</p>
    </div>

      <div className="photo-actions">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleChangeFavorite} style={{ backgroundColor: photo[0].favoritesFlag ? 'red' : 'transparent' }}>
          {photo[0].favoritesFlag ? 'Unfavorite' : 'Favorite'}
        </button>
        <button onClick={handleMakeHidden}>Make Hidden</button>
        <button onClick={handleMakeGlobal}>Make Global</button>
        <button onClick={handleEditTags}>Edit Tags</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default PhotoActionsContainer;