import { Container } from "react-bootstrap";
import Share from "../share/Share";
import Post from "../post/Post";
import { Users, Posts } from "../../dummyData";
import "./Feed.scss";

function Feed() {
  return (
    <Container className="feed">
      <Share currentUser={Users[0]} />
      <Post postsData={Posts} usersData={Users} />
    </Container>
  );
}

export default Feed;
