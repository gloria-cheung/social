import { Container } from "react-bootstrap";
import {} from "@material-ui/icons";
import Share from "../share/Share";
import Post from "../post/Post";
import "./Feed.scss";

function Feed() {
  return (
    <Container className="feed">
      <Share />
      <Post />
    </Container>
  );
}

export default Feed;
