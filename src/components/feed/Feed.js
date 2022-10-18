import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Share from "../share/Share";
import Post from "../post/Post";
import "./Feed.scss";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await axios.get(
          "/posts/timeline/634ef7118e7c291c399eb556"
        );
        setPosts(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchCurrentUser = async () => {
      try {
        const result = await axios.get("/users/634ef7118e7c291c399eb556");
        setCurrentUser(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
    fetchCurrentUser();
  }, []);

  return (
    <Container className="feed">
      <Share currentUser={currentUser} />
      <Container className="postsContainer ps-0 pe-0 pt-5">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </Container>
    </Container>
  );
}

export default Feed;
