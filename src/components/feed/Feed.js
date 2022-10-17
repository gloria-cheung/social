import { Container } from "react-bootstrap";
import Share from "../share/Share";
import Post from "../post/Post";
import { Users, Posts } from "../../dummyData";
import "./Feed.scss";

function Feed() {
  return (
    <Container className="feed">
      <Share currentUser={Users[0]} />
      <Container className="postsContainer ps-0 pe-0 pt-5">
        {Posts.map((post) => (
          <Post
            post={post}
            key={post.id}
            user={Users.find((user) => user.id === post.userId)}
          />
        ))}
      </Container>
    </Container>
  );
}

export default Feed;
