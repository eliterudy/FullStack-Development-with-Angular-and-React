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
import { useSelector, useDispatch } from "react-redux";
import { addNewComment } from "../redux/comments";
import Loading from "./LoadingComponent";
import { baseURL } from "../shared/apis";

const required = (value) => value && value.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const DishDetail = (props) => {
  const { dish, comments, dishLoading, dishErrMess, commentErrMess } = props;
  if (dishErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{dishErrMess}</h4>
        </div>
      </div>
    );
  } else if (dishLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else {
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
          <RenderComments
            comments={comments}
            dishId={dish.id}
            errMess={commentErrMess}
          />
        </div>
      </div>
    );
  }
};

const RenderDish = ({ dish }) => {
  if (dish !== null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={baseURL + dish.image} alt={dish.name} />
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

const RenderComments = ({ comments, dishId }) => {
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
        <CommentForm dishId={dishId} />
      </div>
    );
  } else {
    return (
      <div>
        <CommentForm dishId={dishId} />
      </div>
    );
  }
};

const CommentForm = ({ dishId }) => {
  const [isModalOpen, updateModalOpen] = useState(false);
  const toggleModal = () => {
    updateModalOpen(!isModalOpen);
  };
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    updateModalOpen(!isModalOpen);
    dispatch(
      addNewComment({
        dishId: dishId,
        rating: values.rating || 1,
        author: values.author,
        comment: values.comment || "",
      })
    );
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

export default DishDetail;
