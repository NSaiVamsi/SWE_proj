import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
import Cookies from "js-cookie";

const Button = ({ setUpdateUI }) => {
  const handleChange = (e) => {
    e.preventDefault();

    const ecookie = Cookies.get('id'); //ownerId
    const formData = new FormData();    

    formData.append("photo", e.target.files[0]);
    formData.append('ownerUserId', ecookie);
    console.log(e.target.files[0])

    axios
      .post("http://localhost:5001/api/save", formData)
      .then((res) => {
        console.log(res.data);
        setUpdateUI(res.data._id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <label className="button" htmlFor="file_picker">
      Upload Image
      <input
        hidden
        type="file"
        name="file_picker"
        id="file_picker"
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
};

export default Button;