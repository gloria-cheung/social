import { Image, ListGroup } from "react-bootstrap";
import "./CloseFriends.scss";

function CloseFriends(props) {
  const { usersData } = props;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const users = usersData.map((user) => (
    <ListGroup.Item as="li" key={user.id} className="border-0">
      <Image
        src={PF + user.profilePicture}
        alt="followingsImg"
        className="followingsImg"
      />
      {user.username}
    </ListGroup.Item>
  ));

  return <>{users}</>;
}

export default CloseFriends;
