import { useEffect, useState } from "react";
import UploadButton from "./components/UploadButton";
import Grid from "./components/Grid";
import axios from "axios";

function App() {
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get")
      .then((res) => {
        console.log(res.data);
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);

  return (
    <div className="App">
      <Grid photos={photos} />
      <UploadButton setUpdateUI={setUpdateUI} />
      
    </div>
  );
}

export default App;