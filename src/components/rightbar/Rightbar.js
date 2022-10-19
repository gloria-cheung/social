import { Container, Image, ListGroup, Row, Col } from "react-bootstrap";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import "./Rightbar.scss";

function Rightbar(props) {
  const { profile, user } = props;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const getRelationshipStatus = (num) => {
    switch (num) {
      case 1:
        return "Single";
      case 2:
        return "In a Relationship";
      case 3:
        return "It's Complicated";
      default:
        return "Unknown";
    }
  };

  const homeRightBar = (
    <>
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
          <Online usersData={Users} />
        </ListGroup>
      </Container>
    </>
  );
  const profileRightBar = (
    <>
      <Container className="userDetailsContainer">
        <h5>User Info</h5>
        <p>City: {user.city}</p>
        <p>From: {user.from}</p>
        <p>Relationship: {getRelationshipStatus(user.relationship)}</p>
      </Container>
      <Container className="friendListContainer">
        <h5>User Friends</h5>
        <Row className="flex-wrap">
          {Users.map((user) => (
            <Col md={4} className="friendsContainer" key={user.id}>
              <Image
                className="friendsImage"
                src={PF + user.profilePicture}
                alt="friends"
              />
              <p className="friendsUsername">{user.username}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
  return (
    <Container className="rightbar pt-3">
      {profile ? profileRightBar : homeRightBar}
    </Container>
  );
}

export default Rightbar;
