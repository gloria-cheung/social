import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Card, Image, Modal, ListGroup, Container } from "react-bootstrap";
import {
  MoreVert,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ChatBubbleOutlineOutlined,
  SendOutlined,
  BookmarkBorder,
  ReportProblemOutlined,
  DeleteOutlined,
} from "@material-ui/icons";
import "./Post.scss";
import { fetchUserbyId, likePost, deletePost } from "../../apiCalls";
import { format } from "timeago.js";

function Post(props) {
  const { post } = props;
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState();
  const [isDeleted, setIsDeleted] = useState();
  const [user, setUser] = useState({});

  const { currentUser } = useContext(AuthContext);

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const checkIsLiked = () => {
      if (post.likes.includes(currentUser._id)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };

    fetchUserbyId(post.userId).then((res) => {
      setUser(res);
    });
    checkIsLiked();
  }, [post, currentUser]);

  const likeHandler = () => {
    likePost(post._id, currentUser._id);

    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  const deleteHandler = () => {
    deletePost(post._id, currentUser._id);
    setIsDeleted(true);
  };

  return (
    <Container className="p-0">
      {!isDeleted && (
        <>
          <Card className="border-0 mt-3">
            <Card.Header className="d-flex align-items-center justify-content-between postHeader border-0">
              <div className="postHeaderLeft">
                <Link to={`/profile/${user.username}`}>
                  <Image
                    className="profilePic me-2"
                    src={PF + (user.profilePicture || "person/noAvatar.png")}
                    alt="profilepic"
                  />
                </Link>
                {user.username}
                <span className="muted">{format(post.createdAt)}</span>
              </div>
              <div className="postHeaderRight">
                <MoreVert onClick={handleShow} className="options" />
              </div>
            </Card.Header>

            <Card.Img variant="top" src={PF + post.img} />

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
                <p>
                  Liked by {likes === 1 ? `${likes} person` : `${likes} people`}
                </p>
              </div>
              <Card.Text>{post.desc && post.desc}</Card.Text>
            </Card.Body>
          </Card>
          <Modal show={show} onHide={handleClose} size="sm">
            <Modal.Body>
              <ListGroup variant="flush">
                <ListGroup.Item
                  onClick={likeHandler}
                  className="modalItem"
                  action
                >
                  <FavoriteBorderOutlined />
                  Like post
                </ListGroup.Item>
                <ListGroup.Item className="modalItem" action>
                  <BookmarkBorder />
                  Save post
                </ListGroup.Item>
                {user.username !== currentUser.username && (
                  <ListGroup.Item className="modalItem" action>
                    <ReportProblemOutlined />
                    Report post
                  </ListGroup.Item>
                )}
                {user.username === currentUser.username && (
                  <ListGroup.Item
                    onClick={deleteHandler}
                    className="modalItem"
                    action
                  >
                    <DeleteOutlined />
                    Delete post
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Modal.Body>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Post;
