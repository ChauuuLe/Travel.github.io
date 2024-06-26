import "./userInfo.css";
import { useState, useEffect } from "react";
const Userinfo = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [userAvatar, setUserAvatar] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUserAvatar(currentUser.avatar);
    setUsername(currentUser.username);
  }, [currentUser]);

  const renderAvatar = (avatar) => {
    if (avatar) {
      return avatar;
    }
    else {
      console.log("cac");
      return "./assets/avatar.png";
    }
  };

  return (
    <div className="userInfo">
      <div className="user">
        <h2 className="texts">{username}</h2>
        <img src={renderAvatar(userAvatar)} alt="" />
      </div>
      <div className="icons">
        <img src="./assets/more.png" alt="" />
        <img src="./assets/video.png" alt="" />
        <img src="./assets/edit.png" alt="" />
      </div>
    </div>
  )
}

export default Userinfo