import React, { Component, useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (value) => value && value.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const RenderDish = ({ dish }) => {
  if (dish !== null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const CommentForm = () => {
  const [isModalOpen, updateModalOpen] = useState(false);
  const toggleModal = () => {
    updateModalOpen(!isModalOpen);
  };

  const handleSubmit = (values) => {
    console.log(":", values);
    // updateModalOpen(!isModalOpen);
    alert(JSON.stringify(values));
  };

  return (
    <div>
      <Button outline onClick={() => toggleModal()}>
        <span className=" fa fa-pencil fa-lg"> Submit Comment</span>
      </Button>
      <Modal isOpen={isModalOpen} toggle={() => toggleModal()}>
        <ModalHeader toggle={() => toggleModal()}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Col className="form-group pl-0 pr-0">
              <Label htmlFor="yourName">Rating</Label>
              <Control.select
                className="form-control"
                model=".rating"
                id="rating"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Control.select>
            </Col>
            <Col className="form-group pl-0 pr-0">
              <Label htmlFor="yourName">Your Name</Label>
              <Control.text
                model=".author"
                id="author"
                className="form-control"
                name="author"
                placeholder="Your Name"
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
                  required: "Required",
                  minLength: "Must be greater than 2 characters",
                  maxLength: "Must be 15 characters or less",
                }}
              />
            </Col>
            <Col className="form-group pl-0 pr-0">
              <Label htmlFor="yourName">Comment</Label>
              <Control.textarea
                model=".comment"
                id="comment"
                className="form-control"
                name="comment"
                placeholder=""
                rows="6"
              />
            </Col>

            <Button type="submit" value="submit" color="primary">
              Submit
            </Button>
          </LocalForm>
        </ModalBody>
      </Modal>
    </div>
  );
};

const RenderComments = ({ comments }) => {
  if (comments !== null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h3>Comments</h3>
        <div className="list-unstyled">
          {comments.map((comment) => {
            const date = new Date(comment.date);
            const options = {
              year: "numeric",
              month: "short",
              day: "numeric",
            };
            return (
              <div key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                  -- {comment.author},{" "}
                  {date.toLocaleDateString("en-EN", options)}
                </p>
              </div>
            );
          })}
        </div>
        <CommentForm />
      </div>
    );
  } else {
    return (
      <div>
        <CommentForm />
      </div>
    );
  }
};

const DishDetail = (props) => {
  const { dish, comments } = props;

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={"/menu"}>Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={dish} />
        <RenderComments comments={comments} />
      </div>
    </div>
  );
};

export default DishDetail;
