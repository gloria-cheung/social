import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Form, InputGroup, Nav, Navbar, Image, Badge } from "react-bootstrap";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import "./Topbar.scss";

function Topbar() {
  const { currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Navbar
      sticky="top"
      bg="primary"
      variant="primary"
      expand="lg"
      className="p-1"
    >
      <Link to="/" className="links">
        <Navbar.Brand>Social</Navbar.Brand>
      </Link>
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
        <Nav>
          <div className="d-flex justify-content-center">
            <Navbar.Text className="iconContainer me-3">
              <Person className="icon" fontSize="large" />
              <Badge className="badge" bg="warning" pill>
                1
              </Badge>
            </Navbar.Text>
            <Navbar.Text className="iconContainer me-3">
              <Chat className="icon" fontSize="large" />
              <Badge className="badge" bg="warning" pill>
                1
              </Badge>
            </Navbar.Text>

            <Navbar.Text className="iconContainer me-5">
              <Notifications className="icon" fontSize="large" />
              <Badge className="badge" bg="warning" pill>
                1
              </Badge>
            </Navbar.Text>
            <Link to={`/profile/${currentUser.username}`}>
              <Navbar.Text className="me-3 d-flex">
                <Image
                  className="profilePic"
                  src={currentUser.profilePicture || PF + "person/noAvatar.png"}
                  alt="profilepic"
                />
              </Navbar.Text>
            </Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Topbar;
