import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    const post_content = event.target.elements.post_content.value;
    const boast_or_roast = event.target.elements.boast_or_roast.value;
    axios.post("http://localhost:8000/api/posts/", {
      post_content: post_content,
      boast_or_roast: boast_or_roast,
    });
    fetch("http://localhost:8000/api/posts/")
      .then((response) => response.json())
      .then((data) => this.setState({ posts: data }));
  };

  render() {
    return (
      <>
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
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

export default MyForm;
// ReactDOM.render(<FormSizeDemo />, mountNode);
