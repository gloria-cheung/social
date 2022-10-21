import { Image, ListGroup } from "react-bootstrap";
import "./Online.scss";

function Online(props) {
  const { usersData } = props;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const users = usersData.map((user) => (
    <ListGroup.Item
      as="li"
      className="border-0 d-flex align-items-center"
      key={user._id}
    >
      <div className="onlineFriendsImageContainer">
        <Image
          className="profilePic me-2"
          src={user.profilePicture || PF + "/noAvatar.png"}
          alt="profilepic"
        />
        <span className="online"></span>
      </div>
      {user.username}
    </ListGroup.Item>
  ));

  return <>{users}</>;
}

export default Online;
