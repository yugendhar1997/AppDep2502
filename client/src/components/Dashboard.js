import { useSelector } from "react-redux";
import TopNavigation from "./TopNavigation";

function Dashboard() {
  let userDetails = useSelector((store) => {
    return store.userDetails;
  });

  let onDeleteProfile = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", userDetails.email);

    let reqOptions = {
      method: "DELETE",
      body: dataToSend,
    };

    let JSONData = await fetch(":4444/deleteProfile", reqOptions);

    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
  };
  return (
    <div>
      <TopNavigation></TopNavigation>
      <h1>Dashboard</h1>
      <button
        type="button"
        onClick={() => {
          onDeleteProfile();
        }}
      >
        Delete Account
      </button>
      <h1>
        {userDetails.firstName}
        {userDetails.lastName}
        <img src={`:4444/${userDetails.profilePic}`} alt=""></img>
      </h1>
    </div>
  );
}

export default Dashboard;
