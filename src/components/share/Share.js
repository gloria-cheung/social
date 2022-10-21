import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ListGroup, Image, Container, Button } from "react-bootstrap";
import {
  PermMediaOutlined,
  LabelOutlined,
  LocationOnOutlined,
  TagFacesOutlined,
} from "@material-ui/icons";
import { sharePost } from "../../apiCalls";
import storage from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // const percent = Math.round(
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
            // // show progress
            // console.log(percent);
          },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              post.img = url;
              sharePost(currentUser._id, post).then(() => {
                history.push("/");
              });
            });
          }
        );
      } else {
        alert("Please upload a file first!");
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
          src={currentUser.profilePicture || PF + "/noAvatar.png"}
          alt="profilepic"
        />
        <form onSubmit={submitHandler} id="sharePost">
          <input
            className="status"
            type="text"
            placeholder={`What's on your mind, ${currentUser.username}?`}
            ref={desc}
            required
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
