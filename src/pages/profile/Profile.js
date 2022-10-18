import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./Profile.scss";

function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="right">
          <div className="rightTop">
            <img
              src="assets/post/3.jpeg"
              alt="coverPicture"
              className="coverPicture"
            />
            <div className="coverPictureBottom">
              Sarak Kocaoglu
              <p>Hello my friends!</p>
            </div>
            <img
              src="assets/person/3.jpeg"
              alt="profilePic"
              className="profilePic"
            />
          </div>
          <div className="rightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
