import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ListGroup, Image, Container, Button } from "react-bootstrap";
import {
  PermMediaOutlined,
  LabelOutlined,
  LocationOnOutlined,
  TagFacesOutlined,
  CodeSharp,
} from "@material-ui/icons";
import { sharePost, uploadPhoto } from "../../apiCalls";
import "./Share.scss";

function Share(props) {
  const { currentUser } = props;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    const post = { desc: desc.current.value };

    try {
      if (file) {
        const data = new FormData();
        // to have unique name in case other users name their files the same
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);

        post.img = fileName;

        // need to upload photo to serverside public folder but also save path to image in db for the post
        await uploadPhoto(data);
        await sharePost(currentUser._id, post);
        history.push("/");
      }

      e.value = null;
    } catch (err) {
      console.log(err);
    }
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="share">
      <Container className="shareTop pt-3 pb-3 border-bottom">
        <Image
          className="profilePic me-3"
          src={PF + (currentUser.profilePicture || "person/noAvatar.png")}
          alt="profilepic"
        />
        <form onSubmit={submitHandler} id="sharePost">
          <input
            className="status"
            type="text"
            placeholder={`What's on your mind, ${currentUser.username}?`}
            ref={desc}
          />
        </form>
      </Container>
      <Container className="shareBottom mt-3 ms-0 me-0 mb-5 d-flex justify-content-between">
        <ListGroup horizontal>
          <ListGroup.Item className="shareBottomListItem border-0">
            <label htmlFor="file" className="file">
              <PermMediaOutlined htmlColor="coral" />
              Photo or Video
            </label>
            <input
              type="file"
              id="file"
              accept=".png, .jpg, .jpeg"
              form="sharePost"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              hidden
            />
          </ListGroup.Item>
          <ListGroup.Item className="shareBottomListItem border-0">
            <LabelOutlined htmlColor="skyblue" />
            Tag
          </ListGroup.Item>
          <ListGroup.Item className="shareBottomListItem border-0">
            <LocationOnOutlined htmlColor="olive" />
            Location
          </ListGroup.Item>
          <ListGroup.Item className="shareBottomListItem border-0">
            <TagFacesOutlined htmlColor="goldenrod" />
            Feelings
          </ListGroup.Item>
        </ListGroup>
        <Button type="submit" size="sm" form="sharePost">
          Share
        </Button>
      </Container>
    </div>
  );
}

export default Share;
