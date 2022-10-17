import { Container, Image, ListGroup } from "react-bootstrap";
import { Users } from "../../dummyData";
import Online from "../online/Online";
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
          <Online usersData={Users} />
        </ListGroup>
      </Container>
    </Container>
  );
}

export default Rightbar;
