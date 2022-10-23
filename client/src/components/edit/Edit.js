import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { editProfile } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Edit.scss";

function Edit() {
  const { currentUser, dispatch } = useContext(AuthContext);

  const history = useHistory();

  const username = useRef();
  const email = useRef();
  const profilePicture = useRef();
  const coverPicture = useRef();
  const desc = useRef();
  const city = useRef();
  const from = useRef();
  const relationship = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const userDetails = {
      username: username.current.value,
      email: email.current.value,
      profilePicture: profilePicture.current.value,
      coverPicture: coverPicture.current.value,
      desc: desc.current.value,
      city: city.current.value,
      from: from.current.value,
      relationship: relationship.current.value,
    };

    try {
      await editProfile(currentUser._id, userDetails);
      await dispatch({ type: "EDIT_PROFILE", payload: userDetails });
      history.push(`/`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container className="p-3 mb-3">
      <Form onSubmit={submitHandler}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              ref={username}
              type="text"
              placeholder="enter username"
              defaultValue={currentUser.username}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              ref={email}
              type="email"
              placeholder="enter email"
              defaultValue={currentUser.email}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Profile Picture URL</Form.Label>
          <Form.Control
            ref={profilePicture}
            placeholder="enter URL"
            defaultValue={currentUser.profilePicture}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Cover Picture URL</Form.Label>
          <Form.Control
            ref={coverPicture}
            placeholder="enter URL"
            defaultValue={currentUser.coverPicture}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            ref={desc}
            as="textarea"
            placeholder="enter description"
            defaultValue={currentUser.desc}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control ref={city} defaultValue={currentUser.city} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>From</Form.Label>
            <Form.Control ref={from} defaultValue={currentUser.from} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Relationship</Form.Label>
            <Form.Select
              ref={relationship}
              defaultValue={currentUser.relationship}
            >
              <option>Choose...</option>
              <option value="1">Single</option>
              <option value="2">In a Relationship</option>
              <option value="3">It's Complicated</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" className="ps-5 pe-5">
            Update
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Edit;
