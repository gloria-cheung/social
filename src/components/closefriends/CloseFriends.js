import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Image, ListGroup } from "react-bootstrap";
import axios from "axios";
import "./CloseFriends.scss";

function CloseFriends() {
  const { currentUser } = useContext(AuthContext);
  const [currentUserFollowings, setCurrentUserFollowings] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/users/${currentUser._id}/followings`);
      setCurrentUserFollowings(res.data);
    };
    fetchUsers();
  }, [currentUser]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      {currentUserFollowings.length > 0 &&
        currentUserFollowings.map((user) => (
          <ListGroup.Item as="li" key={user._id} className="border-0">
            <Image
              src={user.profilePicture || PF + "person/noAvatar.png"}
              alt="followingsImg"
              className="followingsImg"
            />
            {user.username}
          </ListGroup.Item>
        ))}
    </>
  );
}

export default CloseFriends;
