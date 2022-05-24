import React, { Component, useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
} from "reactstrap";

const RenderMenuItem = ({ dish, onClick }) => {
  return (
    <div key={dish.id} className="col-12 col-md-5 m-1">
      <Card onClick={() => onClick(dish.id)}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Card>
    </div>
  );
};

const Menu = (props) => {
  const menu = props.dishes.map((dish) => (
    <RenderMenuItem dish={dish} onClick={props.onElementClicked} />
  ));

  return <div className="row">{menu} </div>;
};

export default Menu;
