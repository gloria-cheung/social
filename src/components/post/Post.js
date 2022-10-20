import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import {
  MoreVert,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ChatBubbleOutlineOutlined,
  SendOutlined,
} from "@material-ui/icons";
import "./Post.scss";
import axios from "axios";
import { format } from "timeago.js";

function Post(props) {
  const { post } = props;
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState();
  const [user, setUser] = useState({});

  const { currentUser } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    const checkIsLiked = () => {
      if (post.likes.includes(currentUser._id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };

    fetchUser();
    checkIsLiked();
  }, [post, currentUser]);

  const likeHandler = () => {
    sendToAPI();
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  const sendToAPI = async () => {
    const res = await axios.put(`/posts/${post._id}/like`, {
      userId: currentUser._id,
    });
    console.log(res.data);
  };

  return (
    <Card className="border-0 mt-3">
      <Card.Header className="d-flex align-items-center justify-content-between postHeader border-0">
        <div className="postHeaderLeft">
          <Link to={`/profile/${user.username}`}>
            <Image
              className="profilePic me-2"
              src={user.profilePicture || PF + "person/noAvatar.png"}
              alt="profilepic"
            />
          </Link>
          {user.username}
          <span className="muted">{format(post.createdAt)}</span>
        </div>
        <div className="postHeaderRight">
          <MoreVert />
        </div>
      </Card.Header>

      <Card.Img variant="top" src={post.img} />

      <Card.Body>
        <div className="cardImgFooter">
          {isLiked ? (
            <FavoriteOutlined
              className="cardImgFooterIcon"
              onClick={likeHandler}
              htmlColor="salmon"
            />
          ) : (
            <FavoriteBorderOutlined
              className="cardImgFooterIcon"
              onClick={likeHandler}
            />
          )}

          <ChatBubbleOutlineOutlined className="cardImgFooterIcon" />
          <SendOutlined className="cardImgFooterIcon" />
          <p>Liked by {likes} people</p>
        </div>
        <Card.Text>{post.desc && post.desc}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Post;
