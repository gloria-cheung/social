import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Register.scss";

function Register() {
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
          <Form className="pb-3">
            <Form.Control
              className="mt-3 mb-3"
              type="text"
              placeholder="Username"
            />

            <Form.Control
              className="mt-3 mb-3"
              type="email"
              placeholder="Email"
            />

            <Form.Control
              className="mt-3 mb-3"
              type="password"
              placeholder="Password"
            />
            <Form.Control
              className="mt-3 mb-3"
              type="password"
              placeholder="Confirm Password"
            />

            <div className="d-grid gap-2">
              <Button type="submit" variant="success">
                Register
              </Button>
            </div>
          </Form>
          <p>Already have an Account? </p>
          <div className="d-grid gap-2">
            <Button variant="primary">Login</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;