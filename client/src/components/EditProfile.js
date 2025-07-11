import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function EditProfile() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNumberInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic, SetProfilePic] = useState(
    "https://pulse.brninfotech.com/media/auth/images/no-pic3.png"
  );

  let userDetails = useSelector((store) => {
    return store.userDetails;
  });

  useEffect(() => {
    firstNameInputRef.current.value = userDetails.firstName;
    lastNameInputRef.current.value = userDetails.lastName;
    ageInputRef.current.value = userDetails.age;
    emailInputRef.current.value = userDetails.email;
    mobileNumberInputRef.current.value = userDetails.mobileNumber;
    SetProfilePic(`:4444/${userDetails.profilePic}`);
  }, []);

  let editProfile = async () => {
    let dataTosend = new FormData();
    dataTosend.append("firstName", firstNameInputRef.current.value);
    dataTosend.append("lastName", lastNameInputRef.current.value);
    dataTosend.append("age", ageInputRef.current.value);
    dataTosend.append("email", emailInputRef.current.value);
    dataTosend.append("password", passwordInputRef.current.value);
    dataTosend.append("mobileNumber", mobileNumberInputRef.current.value);
    for (let i = 0; i <= profilePicInputRef.current.files.length; i++) {
      dataTosend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "PATCH",
      body: dataTosend,
    };

    let JSONData = await fetch(":4444/editProfile", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
  };

  return (
    <div className="App">
      <TopNavigation></TopNavigation>
      <h1>Edit Profile</h1>
      <form>
        <div>
          <label>First Name</label>
          <input type="text" ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input type="number" ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input type="email" ref={emailInputRef} readOnly></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile Number</label>
          <input type="number" ref={mobileNumberInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            type="file"
            // multiple
            ref={profilePicInputRef}
            onChange={(eo) => {
              let selectedPath = URL.createObjectURL(eo.target.files[0]);
              SetProfilePic(selectedPath);
            }}
          ></input>
        </div>
        <div>
          <img className="profilePic" src={profilePic} alt=""></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              editProfile();
            }}
          >
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
