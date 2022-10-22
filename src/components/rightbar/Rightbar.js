import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Container, Image, ListGroup, Row, Col, Button } from "react-bootstrap";
import Online from "../online/Online";
import { fetchUserFollowings, unfollowUser, followUser } from "../../apiCalls";
import { Add } from "@material-ui/icons";
import "./Rightbar.scss";

function Rightbar(props) {
  const { user, home } = props;
  const { currentUser, dispatch } = useContext(AuthContext);
  const [currentUserFollowings, setCurrentUserFollowings] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  const [followed, setFollowed] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetchUserFollowings(currentUser._id)
      .then((res) => {
        setCurrentUserFollowings(res);
      })
      .catch((err) => console.log(err.message));
  }, [currentUser]);

  useEffect(() => {
    if (user._id) {
      fetchUserFollowings(user._id)
        .then((res) => {
          setUserFollowings(res);
        })
        .catch((err) => console.log(err.message));
    }
  }, [user]);

  useEffect(() => {
    if (currentUser.followings.includes(user._id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [currentUser, user._id]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleFollow = async () => {
    // if current user follows this user, clicking should unfollow them and vice versa
    try {
      if (followed) {
        await unfollowUser(user._id, currentUser._id);
        dispatch({ type: "UNFOLLOW", payload: user._id });
        setFollowed(false);
      } else {
        await followUser(user._id, currentUser._id);
        dispatch({ type: "FOLLOW", payload: user._id });
        setFollowed(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT_SUCCESS" });
    history.push("/");
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
          src={PF + "gift.png"}
          alt="birthdayLogo"
          className="birthdayLogo me-2"
        />
        <p>
          <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
        </p>
      </Container>
      <Container className="adContainer">
        <Image rounded src={PF + "ad.png"} alt="ad" className="w-100" />
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
            <Button onClick={handleFollow}>
              {followed ? "Friends" : "Follow"}
              {!followed && <Add />}
            </Button>
          )}
          {user.username === currentUser.username && (
            <>
              <Link to={`/profile/${currentUser.username}?edit=true`}>
                <Button size="sm">Edit Profile</Button>
              </Link>
              <Button size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
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
                  src={user.profilePicture || PF + "/noAvatar.png"}
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
