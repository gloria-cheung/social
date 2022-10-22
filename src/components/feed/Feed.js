import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container } from "react-bootstrap";
import Share from "../share/Share";
import Post from "../post/Post";
import {
  fetchUserByUsername,
  getPostsForProfile,
  getPostsforTimeline,
} from "../../apiCalls";
import "./Feed.scss";

function Feed(props) {
  const { username } = props;
  const [posts, setPosts] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      // check to see if rendering feed for profile page or home page => then check if profile page belongs to current user or another user
      try {
        let profileUserId;
        if (username) {
          const profileUser = await fetchUserByUsername(username);
          profileUserId = profileUser._id;
        }

        const res = username
          ? await getPostsForProfile(profileUserId)
          : await getPostsforTimeline(currentUser._id);

        // sort posts by newest first
        const sortedPosts = res.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        });
        setPosts(sortedPosts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
  }, [username, currentUser]);

  const resetPosts = async () => {
    try {
      const res = username
        ? await getPostsForProfile(currentUser._id)
        : await getPostsforTimeline(currentUser._id);

      // sort posts by newest first
      const sortedPosts = res.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
      setPosts(sortedPosts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="feed">
      {(!username || username === currentUser.username) && (
        <Share currentUser={currentUser} resetPosts={resetPosts} />
      )}
      <Container className="postsContainer ps-0 pe-0">
        {posts.map((post) => (
          <Post post={post} key={post._id} resetPosts={resetPosts}/>
        ))}
      </Container>
    </Container>
  );
}

export default Feed;
