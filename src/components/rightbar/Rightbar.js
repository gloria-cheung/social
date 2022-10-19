import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container, Image, ListGroup, Row, Col } from "react-bootstrap";
import Online from "../online/Online";
import axios from "axios";
import "./Rightbar.scss";

function Rightbar(props) {
  const { user } = props;
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
          <Online usersData={currentUserFollowings} />
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
          {currentUserFollowings.map((user) => (
            <Col md={4} className="friendsContainer" key={user._id}>
              <Image
                className="friendsImage"
                src={user.profilePicture || PF + "person/noAvatar.png"}
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
      {user ? profileRightBar : homeRightBar}
    </Container>
  );
}

export default Rightbar;
