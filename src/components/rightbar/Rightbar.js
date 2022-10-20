import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Container, Image, ListGroup, Row, Col, Button } from "react-bootstrap";
import Online from "../online/Online";
import { fetchUserFollowings } from "../../apiCalls";
import "./Rightbar.scss";

function Rightbar(props) {
  const { user, home } = props;
  const { currentUser } = useContext(AuthContext);
  const [currentUserFollowings, setCurrentUserFollowings] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchUserFollowings(currentUser._id);
        setCurrentUserFollowings(res);

        if (user._id) {
          const res2 = await fetchUserFollowings(user._id);
          setUserFollowings(res2);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [currentUser, user]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const isFriend = () => {
    return currentUser.followings.includes(user._id) ? "Friends" : "Follow";
  };

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
        <div className="userDetailsHeader">
          <h5>User Info</h5>
          {user.username !== currentUser.username && (
            <Button className="followButton">{isFriend()}</Button>
          )}
        </div>
        <p>City: {user.city}</p>
        <p>From: {user.from}</p>
        <p>Relationship: {getRelationshipStatus(user.relationship)}</p>
      </Container>
      <Container className="friendListContainer">
        <h5>User Friends</h5>
        <Row className="flex-wrap">
          {userFollowings.map((user) => (
            <Col md={4} className="friendsContainer" key={user._id}>
              <Link to={`/profile/${user.username}`}>
                <Image
                  className="friendsImage"
                  src={user.profilePicture || PF + "person/noAvatar.png"}
                  alt="friends"
                />
              </Link>
              <p className="friendsUsername">{user.username}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
  return (
    <Container className="rightbar pt-3">
      {home ? homeRightBar : profileRightBar}
    </Container>
  );
}

export default Rightbar;
