import { Card, Image, Container } from "react-bootstrap";
import {
  MoreVert,
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
  SendOutlined,
} from "@material-ui/icons";
import { Users, Posts } from "../../dummyData";
import "./Post.scss";

function Post() {
  const posts = Posts.map((post) => (
    <Card className="border-0 mt-3">
      <Card.Header className="d-flex align-items-center justify-content-between postHeader border-0">
        <div className="postHeaderLeft">
          <Image
            className="profilePic me-2"
            src={Users.find((user) => user.id === post.userId).profilePicture}
            alt="profilepic"
          />
          {Users.find((user) => user.id === post.userId).username}{" "}
          <span className="muted">{post.date}</span>
        </div>
        <div className="postHeaderRight">
          <MoreVert />
        </div>
      </Card.Header>

      <Card.Img variant="top" src={post.photo} />

      <Card.Body>
        <div className="cardImgFooter">
          <FavoriteBorderOutlined className="cardImgFooterIcon" />
          <ChatBubbleOutlineOutlined className="cardImgFooterIcon" />
          <SendOutlined className="cardImgFooterIcon" />
          <p>Liked by {post.like} people</p>
        </div>
        <Card.Text>{post.desc && post.desc}</Card.Text>
      </Card.Body>
    </Card>
  ));

  return (
    <Container className="postsContainer ps-0 pe-0 pt-5">{posts}</Container>
  );
}

export default Post;
