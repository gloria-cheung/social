import { Container, ListGroup, Button, Image } from "react-bootstrap";
import {
  RssFeedOutlined,
  ChatOutlined,
  PlayCircleOutlineOutlined,
  GroupOutlined,
  BookmarkBorderOutlined,
  HelpOutlineOutlined,
  WorkOutlineOutlined,
  EventOutlined,
  SchoolOutlined,
} from "@material-ui/icons";
import "./Sidebar.scss";

function Sidebar() {
  return (
    <div className="sidebar">
      <Container className="pt-3 pb-3">
        <ListGroup as="ul" variant="flush">
          <ListGroup.Item as="li">
            <RssFeedOutlined className="listIcon" />
            Feed
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <ChatOutlined className="listIcon" />
            Chats
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <PlayCircleOutlineOutlined className="listIcon" /> Videos
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <GroupOutlined className="listIcon" />
            Groups
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <BookmarkBorderOutlined className="listIcon" /> Bookmarks
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <HelpOutlineOutlined className="listIcon" /> Questions
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <WorkOutlineOutlined className="listIcon" /> Jobs
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <EventOutlined className="listIcon" /> Events
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <SchoolOutlined className="listIcon" /> Courses
          </ListGroup.Item>
        </ListGroup>
        <Button className="ps-5 pe-5">Show More</Button>
        <hr />
        <ListGroup as="ul" variant="flush">
          <ListGroup.Item as="li">
            <Image
              src="/assets/person/2.jpeg"
              alt="followingsImg"
              className="followingsImg"
            />
            Jane Doe
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <Image
              src="/assets/person/2.jpeg"
              alt="followingsImg"
              className="followingsImg"
            />
            Jane Doe
          </ListGroup.Item>
          <ListGroup.Item as="li">
            <Image
              src="/assets/person/2.jpeg"
              alt="followingsImg"
              className="followingsImg"
            />
            Jane Doe
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </div>
  );
}

export default Sidebar;
