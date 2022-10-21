import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Edit from "../../components/edit/Edit";
import { fetchUserByUsername } from "../../apiCalls";
import "./Profile.scss";

function Profile() {
  let { username } = useParams();
  const [user, setUser] = useState({});

  const search = useLocation().search;
  const edit = new URLSearchParams(search).get("edit");

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchUserByUsername(username);
        setUser(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="right">
          <div className="rightTop">
            <img
              src={PF + (user.coverPicture || "person/noCover.png")}
              alt="coverPicture"
              className="coverPicture"
            />
            <div className="coverPictureBottom">
              {user.username}
              <p>{user.desc}</p>
            </div>
            <img
              src={PF + (user.profilePicture || "person/noAvatar.png")}
              alt="profilePic"
              className="profilePic"
            />
          </div>
          {edit ? (
            <Edit />
          ) : (
            <div className="rightBottom">
              <Feed username={username} />
              <Rightbar user={user} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
