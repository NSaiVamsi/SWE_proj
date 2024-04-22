import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import HomePhotoN from './components/Home/PhotoN/HomePhotoN';
import Album from './components/Home/PhotoN/Album';
import Bin from './components/Home/PhotoN/Bin';
import Fav from './components/Home/PhotoN/Fav';
import Lock from './components/Home/PhotoN/Lock';
import Save from './components/Home/PhotoN/Save';
import Share from './components/Home/PhotoN/Share';

import HomeMarketPlace from './components/Home/MarketPlace/HomeMarketPlace';
import FollowFeed from './components/Home/MarketPlace/FollowFeed';
import PublicFeed from './components/Home/MarketPlace/PublicFeed';
import Uploads from './components/Home/MarketPlace/Uploads';
import PhotoDetails from './components/Home/PhotoN/PhotoView';

// function App() {
//   const [photos, setPhotos] = useState([]);
//   const [updateUI, setUpdateUI] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/api/get")
//       .then((res) => {
//         console.log(res.data);
//         setPhotos(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, [updateUI]);

//   return (
//     <div className="App">
//       <Grid photos={photos} />
//       <UploadButton setUpdateUI={setUpdateUI} />
      
//     </div>
//   );
// }

class App extends Component {

  // const [updateUI,setUpdateUI] = useState("");

  render() {
    return (
      // <div className="App">
      // <h1>HI</h1>
      // </div>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route index element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />

          {/* Add a route for photo details */}

          <Route element={<ProtectedRoute />}>

          <Route path="/home/photon/*" element={
                    <>
                    <Routes>
                        <Route path="/" element={<HomePhotoN />} />
                        <Route path="/photo-details/:id" element={<PhotoDetails />} />
                        <Route path="/share" element={<Share />} />
                        <Route path="/save" element={<Save />} />
                        <Route path="/fav" element={<Fav />} />
                        <Route path="/album" element={<Album />} />
                        <Route path="/lock" element={<Lock />} />
                        <Route path="/bin" element={<Bin />} />
                    </Routes>
                    </>
                } />
            <Route path='/home/marketplace/*' element={
                  <>
                    <Routes>
                        <Route path="/" element={<HomeMarketPlace/>} />
                        <Route path="/followfeed" element={<FollowFeed />} />
                        <Route path="/publicfeed" element={<PublicFeed/>} />
                        <Route path="/uploads" element={<Uploads />} />
                    </Routes>
                    </>
            } />
            {/* <Route path='/teacher'>
              <Route path=':teacher_id' element={<Teacher />} />
            </Route>
            <Route path='/systemadmin' element={<SystemAdmin/>} />
            <Route path='/facilityadmin'>
              <Route path=':facility_id' element={<FacilityAdmin />} />
            </Route>
            <Route path='/parent'>
              <Route path=':parent_id' element={<Parent />} />
            </Route>
            <Route path='/attendance'>
              <Route path=':class_id' element={<ClassAttendance/>} />
            </Route>
            <Route path='/child'>
              <Route path=':child_id' element={<Child/>} />
            </Route>

            <Route path='/enrollchild' element={<EnrollChild/>} />
            <Route path='/enrollteacher' element={<EnrollTeacher/>} />
            <Route path='/teacherattendance' element={<TeacherAttendance/>} />
            <Route path='/ledgerdata' element={<LedgerData/>} />
            <Route path='/reports' element={<Reports/>} /> */}
            
          </Route>

        </Routes>
      </BrowserRouter>
    );
  }

}

export default App;