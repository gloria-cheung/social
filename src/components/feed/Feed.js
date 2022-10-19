import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import "./Feed.scss";

function Feed(props) {
  const { username } = props;
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let userId;
        if (username) {
          let user = await axios.get(`/users?username=${username}`);
          userId = user.data._id;
        }
        const result = username
          ? await axios.get(`/posts/profile/${userId}`)
          : await axios.get("/posts/timeline/634ef7118e7c291c399eb556");
        setPosts(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchCurrentUser = async () => {
      try {
        const result = await axios.get("/users?username=gloria");
        setCurrentUser(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
    fetchCurrentUser();
  }, [username]);

  return (
    <Container className="feed">
      {!username && <Share currentUser={currentUser} />}
      <Container className="postsContainer ps-0 pe-0">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </Container>
    </Container>
  );
}

export default Feed;
