import { useRef, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./Login.scss";

function Login() {
  // better than useState so doesnt constantly re render component
  const email = useRef();
  const password = useRef();

  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
          <Form className="pb-3" onSubmit={handleClick}>
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
              minLength={6}
              required
              ref={password}
            />

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" disabled={isFetching}>
                {isFetching ? (
                  <Spinner animation="border" size="sm" variant="light" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            {error && (
              <Alert className="mt-3 pt-1 pb-1 text-center" variant="error">
                Error, Please Try Again
              </Alert>
            )}
          </Form>
          <p>Dont have an Account? </p>
          <div className="d-grid gap-2">
            <Button variant="success" disabled={isFetching}>
              Create New Account
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
