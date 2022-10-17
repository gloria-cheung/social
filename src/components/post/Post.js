import { Card, Image, Container } from "react-bootstrap";
import {
  MoreVert,
  FavoriteBorderOutlined,
  ChatBubbleOutlineOutlined,
  SendOutlined,
} from "@material-ui/icons";
import "./Post.scss";

function Post() {
  return (
    <Container className="postsContainer ps-0 pe-0 pt-5">
      <Card className="border-0 mt-3">
        <Card.Header className="d-flex align-items-center justify-content-between postHeader border-0">
          <div className="postHeaderLeft">
            <Image
              className="profilePic me-2"
              src="/assets/person/1.jpeg"
              alt="profilepic"
            />
            Gloria Cheung <span className="muted">5 mins ago</span>
          </div>
          <div className="postHeaderRight">
            <MoreVert />
          </div>
        </Card.Header>

        <Card.Img variant="top" src="/assets/post/1.jpeg" />

        <Card.Body>
          <div className="cardImgFooter">
            <FavoriteBorderOutlined className="cardImgFooterIcon" />
            <ChatBubbleOutlineOutlined className="cardImgFooterIcon" />
            <SendOutlined className="cardImgFooterIcon" />
            <p>Liked by 32 people</p>
          </div>
          <Card.Text>Hi! this is my first post.</Card.Text>
        </Card.Body>
      </Card>

      <Card className="border-0 mt-3">
        <Card.Header className="d-flex align-items-center justify-content-between postHeader border-0">
          <div className="postHeaderLeft">
            <Image
              className="profilePic me-2"
              src="/assets/person/1.jpeg"
              alt="profilepic"
            />
            Gloria Cheung <span className="muted">5 mins ago</span>
          </div>
          <div className="postHeaderRight">
            <MoreVert />
          </div>
        </Card.Header>

        <Card.Img variant="top" src="/assets/post/1.jpeg" />

        <Card.Body>
          <div className="cardImgFooter">
            <FavoriteBorderOutlined className="cardImgFooterIcon" />
            <ChatBubbleOutlineOutlined className="cardImgFooterIcon" />
            <SendOutlined className="cardImgFooterIcon" />
            <p>Liked by 32 people</p>
          </div>
          <Card.Text>Hi! this is my first post.</Card.Text>
        </Card.Body>
      </Card>

      <Card className="border-0 mt-3">
        <Card.Header className="d-flex align-items-center justify-content-between postHeader border-0">
          <div className="postHeaderLeft">
            <Image
              className="profilePic me-2"
              src="/assets/person/1.jpeg"
              alt="profilepic"
            />
            Gloria Cheung <span className="muted">5 mins ago</span>
          </div>
          <div className="postHeaderRight">
            <MoreVert />
          </div>
        </Card.Header>

        <Card.Img variant="top" src="/assets/post/1.jpeg" />

        <Card.Body>
          <div className="cardImgFooter">
            <FavoriteBorderOutlined className="cardImgFooterIcon" />
            <ChatBubbleOutlineOutlined className="cardImgFooterIcon" />
            <SendOutlined className="cardImgFooterIcon" />
            <p>Liked by 32 people</p>
          </div>
          <Card.Text>Hi! this is my first post.</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Post;
