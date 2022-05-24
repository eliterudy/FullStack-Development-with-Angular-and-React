import React, { Component, useState } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

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
      </div>
    );
  } else {
    return <div></div>;
  }
};
const DishDetail = (props) => {
  const { dish } = props;
  return (
    <div className="row">
      <RenderDish dish={dish} />
      <RenderComments comments={dish.comments} />
    </div>
  );
};

export default DishDetail;
