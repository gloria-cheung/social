import { Container } from "react-bootstrap";
import {} from "@material-ui/icons";
import Share from "../share/Share";
import "./Feed.scss";

function Feed() {
  return (
    <Container className="feed">
      <Share />
    </Container>
  );
}

export default Feed;
