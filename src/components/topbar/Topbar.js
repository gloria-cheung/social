import { Form, InputGroup, Nav, Navbar, Image, Badge } from "react-bootstrap";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./Topbar.scss";

function Topbar() {
  return (
    <Navbar bg="primary" variant="primary" expand="lg" className="p-1">
      <Navbar.Brand href="/">Social</Navbar.Brand>

      <Form className="d-flex w-50 justify-content-center">
        <InputGroup>
          <InputGroup.Text id="basic-addon1">
            <Search />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search for friend, post or video"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </Form>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse
        id="basic-navbar-nav"
        className="justify-content-end"
        variant=""
      >
        <Nav className="">
          <div className="d-flex justify-content-around">
            <Nav.Link href="/" className="d-flex align-items-center">
              Home
            </Nav.Link>
            <Nav.Link href="/" className="d-flex align-items-center">
              Timeline
            </Nav.Link>
            <Nav.Link href="/" className="iconContainer">
              <Person className="icon" fontSize="large" />
              <Badge className="badge" bg="warning" pill>
                1
              </Badge>
            </Nav.Link>
            <Nav.Link href="/" className="iconContainer">
              <Chat className="icon" fontSize="large" />
              <Badge className="badge" bg="warning" pill>
                1
              </Badge>
            </Nav.Link>
            <Nav.Link href="/" className="iconContainer">
              <Notifications className="icon" fontSize="large" />
              <Badge className="badge" bg="warning" pill>
                1
              </Badge>
            </Nav.Link>
            <Nav.Link href="/">
              <Image
                className="profilePic"
                src="/assets/person/1.jpeg"
                alt="profilepic"
              />
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Topbar;
