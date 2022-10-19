import { useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { registerCall } from "../../apiCalls";
import "./Register.scss";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const { currentUser, error, isFetching, dispatch } = useContext(AuthContext);

  const clickHandler = (e) => {
    e.preventDefault();
    // add validation to see if password matches confirm password
    if (password.current.value !== confirmPassword.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else {
      registerCall(
        {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        },
        dispatch
      );
    }
  };

  return (
    <Container className="d-flex justify-content-center loginRegisterContainer">
      <Row className="align-items-center">
        <Col md={6}>
          <h1 className="title">Social</h1>
          <h3 className="description">
            Connect with friends all around the world on Social
          </h3>
        </Col>
        <Col md={6}>
          <Form className="pb-3" onSubmit={clickHandler}>
            <Form.Control
              className="mt-3 mb-3"
              type="text"
              placeholder="Username"
              required
              ref={username}
            />

            <Form.Control
              className="mt-3 mb-3"
              type="email"
              placeholder="Email"
              required
              ref={email}
            />

            <Form.Control
              className="mt-3 mb-3"
              type="password"
              placeholder="Password"
              required
              ref={password}
              min={6}
            />
            <Form.Control
              className="mt-3 mb-3"
              type="password"
              placeholder="Confirm Password"
              required
              ref={confirmPassword}
              min={6}
            />

            <div className="d-grid gap-2">
              <Button type="submit" variant="success" disabled={isFetching}>
                {isFetching ? (
                  <Spinner animation="border" size="sm" variant="light" />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
            {error && (
              <Alert className="mt-3 pt-1 pb-1 text-center" variant="error">
                Error, Please Try Again
              </Alert>
            )}
          </Form>
          <p>Already have an Account? </p>
          <div className="d-grid gap-2">
            <Button variant="primary" disabled={isFetching}>
              Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
