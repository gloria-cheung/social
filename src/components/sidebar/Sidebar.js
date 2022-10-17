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
        <ListGroup variant="flush">
          <ListGroup.Item>
            <RssFeedOutlined className="listIcon" />
            Feed
          </ListGroup.Item>
          <ListGroup.Item>
            <ChatOutlined className="listIcon" />
            Chats
          </ListGroup.Item>
          <ListGroup.Item>
            <PlayCircleOutlineOutlined className="listIcon" /> Videos
          </ListGroup.Item>
          <ListGroup.Item>
            <GroupOutlined className="listIcon" />
            Groups
          </ListGroup.Item>
          <ListGroup.Item>
            <BookmarkBorderOutlined className="listIcon" /> Bookmarks
          </ListGroup.Item>
          <ListGroup.Item>
            <HelpOutlineOutlined className="listIcon" /> Questions
          </ListGroup.Item>
          <ListGroup.Item>
            <WorkOutlineOutlined className="listIcon" /> Jobs
          </ListGroup.Item>
          <ListGroup.Item>
            <EventOutlined className="listIcon" /> Events
          </ListGroup.Item>
          <ListGroup.Item>
            <SchoolOutlined className="listIcon" /> Courses
          </ListGroup.Item>
        </ListGroup>
        <Button className="ps-5 pe-5">Show More</Button>
        <hr />
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Image
              src="/assets/person/2.jpeg"
              alt="followingsImg"
              className="followingsImg"
            />
            Jane Doe
          </ListGroup.Item>
          <ListGroup.Item>
            <Image
              src="/assets/person/2.jpeg"
              alt="followingsImg"
              className="followingsImg"
            />
            Jane Doe
          </ListGroup.Item>
          <ListGroup.Item>
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
