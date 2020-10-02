import React from "react";
// import { Form, Input, Button, Checkbox } from 'antd';
// import MyForm from './form'
import { Container, Form, Button, ButtonGroup, Card} from "react-bootstrap";
import moment from 'moment'

import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      message: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/posts/").then((response) => {
      const posts = response.data;
      this.setState({ posts });
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const post_content = event.target.elements.post_content.value;
    const boast_or_roast = event.target.elements.boast_or_roast.value;
    axios.post("http://localhost:8000/api/posts/", {
      post_content: post_content,
      boast_or_roast: boast_or_roast,
    });
    axios.get("http://localhost:8000/api/posts/").then((response) => {
      const posts = response.data;
      this.setState({ posts, message: "" });
    });
  };

  onHandleChange = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  handleUpVote = (postId) => {
    axios.post(`http://localhost:8000/api/posts/${postId}/up_vote/`, {
      pk: postId,
    });
    axios.get("http://localhost:8000/api/posts/").then((response) => {
      const posts = response.data;
      this.setState({ posts });
    });
  };

  handleDownVote = (postId) => {
    axios.post(`http://localhost:8000/api/posts/${postId}/down_vote/`, {
      pk: postId,
    });
    axios.get("http://localhost:8000/api/posts/").then((response) => {
      const posts = response.data;
      this.setState({ posts });
    });
  };

  handleFeed = (feedName) => {
    axios.get(`http://localhost:8000/api/${feedName}/`).then((response) => {
      const posts = response.data;
      this.setState({ posts });
    });
  };
  render() {
    return (
      <>
        <Container fluid>
          <row>
          <h1>ghostPost <i class="fas fa-ghost"></i></h1>
          </row>

          <row>
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="primary"
                type="submit"
                onClick={() => this.handleFeed("posts")}
              >
                All Posts
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => this.handleFeed("boasts")}
              >
                Boasts
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => this.handleFeed("roasts")}
              >
                Roasts
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => this.handleFeed("top")}
              >
                Top Posts
              </Button>
            </ButtonGroup>
          </row>
          <h2>New Post</h2>
          <div>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Example select</Form.Label>
                <Form.Control as="select" name="boast_or_roast">
                  <option value={true}>Roast</option>
                  <option value={false}>Boast</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Post Contents</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  maxLength="280"
                  name="post_content"
                  onChange={this.onHandleChange}
                  placeholder="Type your message"
                  value={this.state.message}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <h2>All Posts</h2>
          {this.state.posts.map((post) => (
            <Card
              key={post.id}
              style={{ border: "black 2px solid", marginBottom: 10 }}
            >
              <Card.Body>
              <h3>Post Content: {post.post_content}</h3>
              <h3>Post Made @ {moment(post.submission_time).format('LLL')}</h3>
              <h3>Total Votes: {post.votes}</h3>
              <ButtonGroup aria-label="Basic example">

              <Button
                variant="success"
                type="submit"
                onClick={() => this.handleUpVote(post.id)}
              >
                Up VOTE
              </Button>
              <Button
                variant="danger"
                type="submit"
                onClick={() => this.handleDownVote(post.id)}
              >
                Down VOTE
              </Button>
              </ButtonGroup>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </>
    );
  }
}

export default App;
