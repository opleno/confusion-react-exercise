import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <Card key={dish.id}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  else return <div></div>;
}

function RenderComments({ comments }) {
  if (comments != null) {
    const commentList = comments.map((comment) => {
      let date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(Date.parse(comment.date)));
      return (
        <li key={comment.id}>
          <CardText>{comment.comment}</CardText>
          <CardText>
            -- {comment.author} , {date}
          </CardText>
          <p></p>
        </li>
      );
    });

    return (
      <div className="container">
        <div className="list-unstyled">
          <h4>Comments</h4>
          {commentList}
        </div>
        <div>
          <CommentForm />
        </div>
      </div>
    );
  } else return <div></div>;
}

// validators
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleSubmitComment(values) {
    this.toggleModal();
    const message = "Current state is: " + JSON.stringify(values);
    console.log(message);
    alert(message);
  }

  render() {
    return (
      <div>
        <Button
          outline
          type="button"
          color="secondary"
          onClick={this.toggleModal}
        >
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col>
                  <Control.select
                    model=".rating"
                    // id="rating"
                    name="rating"
                    // placeholder="Your Name"
                    className="form-control"
                    defaultValue="1"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Col>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required.",
                      minLength: "Must be grater than 2 characters.",
                      maxLength: "Must be 15 characters or less.",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                    defaultValue=""
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const DishDetail = (props) => {
  if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

export default DishDetail;
