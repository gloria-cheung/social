import { Container, Image, ListGroup } from "react-bootstrap";
import { Users } from "../../dummyData";
import "./Rightbar.scss";

function Rightbar() {
  const users = Users.map((user) => (
    <ListGroup.Item
      as="li"
      className="border-0 d-flex align-items-center"
      key={user.id}
    >
      <div className="onlineFriendsImageContainer">
        <Image
          className="profilePic me-2"
          src={user.profilePicture}
          alt="profilepic"
        />
        <span className="online"></span>
      </div>
      {user.username}
    </ListGroup.Item>
  ));

  return (
    <Container className="rightbar pt-3">
      <Container className="birthdayContainer d-flex">
        <Image
          src="./assets/gift.png"
          alt="birthdayLogo"
          className="birthdayLogo me-2"
        />
        <p>
          <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
        </p>
      </Container>
      <Container className="adContainer">
        <Image rounded src="./assets/ad.png" alt="ad" className="w-100" />
      </Container>
      <Container className="friendListContainer">
        <h5>Online Friends</h5>
        <ListGroup as="ul" className="border-0">
          {users}
        </ListGroup>
      </Container>
    </Container>
  );
}

export default Rightbar;
