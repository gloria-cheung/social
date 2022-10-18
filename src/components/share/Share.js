import { ListGroup, Image, Container, Button } from "react-bootstrap";
import {
  PermMediaOutlined,
  LabelOutlined,
  LocationOnOutlined,
  TagFacesOutlined,
} from "@material-ui/icons";
import "./Share.scss";

function Share(props) {
  const { currentUser } = props;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="share">
      <Container className="shareTop pt-3 pb-3 border-bottom">
        <Image
          className="profilePic me-3"
          src={currentUser.profilePicture || PF + "person/noAvatar.png"}
          alt="profilepic"
        />
        <form>
          <input
            className="status"
            type="text"
            placeholder={`What's on your mind, ${currentUser.username}?`}
          />
        </form>
      </Container>
      <Container className="shareBottom mt-3 ms-0 me-0 d-flex justify-content-between">
        <ListGroup as="ul" horizontal>
          <ListGroup.Item as="li" className="shareBottomListItem border-0">
            <a href="#">
              <PermMediaOutlined htmlColor="coral" />
              Photo or Video
            </a>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="shareBottomListItem border-0">
            <a href="#">
              <LabelOutlined htmlColor="skyblue" />
              Tag
            </a>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="shareBottomListItem border-0">
            <a href="#">
              <LocationOnOutlined htmlColor="olive" />
              Location
            </a>
          </ListGroup.Item>
          <ListGroup.Item as="li" className="shareBottomListItem border-0">
            <a href="#">
              <TagFacesOutlined htmlColor="goldenrod" />
              Feelings
            </a>
          </ListGroup.Item>
        </ListGroup>
        <Button size="sm">Share</Button>
      </Container>
    </div>
  );
}

export default Share;
