import { useState } from "react";
import { Card, Image } from "react-bootstrap";
import {
  MoreVert,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ChatBubbleOutlineOutlined,
  SendOutlined,
} from "@material-ui/icons";
import "./Post.scss";

function Post(props) {
  const { post, user } = props;
  const [likes, setLikes] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  return (
    <Card className="border-0 mt-3">
      <Card.Header className="d-flex align-items-center justify-content-between postHeader border-0">
        <div className="postHeaderLeft">
          <Image
            className="profilePic me-2"
            src={PF + user.profilePicture}
            alt="profilepic"
          />
          {user.username}
          <span className="muted">{post.date}</span>
        </div>
        <div className="postHeaderRight">
          <MoreVert />
        </div>
      </Card.Header>

      <Card.Img variant="top" src={PF + post.photo} />

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
