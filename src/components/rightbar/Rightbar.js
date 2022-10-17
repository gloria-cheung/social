import { Container, Image, ListGroup } from "react-bootstrap";
import "./Rightbar.scss";

function Rightbar() {
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
          <ListGroup.Item
            as="li"
            className="border-0 d-flex align-items-center"
          >
            <div className="onlineFriendsImageContainer">
              <Image
                className="profilePic me-2"
                src="/assets/person/3.jpeg"
                alt="profilepic"
              />
              <span className="online"></span>
            </div>
            John Carter
          </ListGroup.Item>

          <ListGroup.Item
            as="li"
            className="border-0 d-flex align-items-center"
          >
            <div className="onlineFriendsImageContainer">
              <Image
                className="profilePic me-2"
                src="/assets/person/3.jpeg"
                alt="profilepic"
              />
              <span className="online"></span>
            </div>
            John Carter
          </ListGroup.Item>

          <ListGroup.Item
            as="li"
            className="border-0 d-flex align-items-center"
          >
            <div className="onlineFriendsImageContainer">
              <Image
                className="profilePic me-2"
                src="/assets/person/3.jpeg"
                alt="profilepic"
              />
              <span className="online"></span>
            </div>
            John Carter
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </Container>
  );
}

export default Rightbar;
