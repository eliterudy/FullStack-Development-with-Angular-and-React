import React, { Component, useState } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
} from "reactstrap";

const MenuComponent = (props) => {
  const [selectedDish, updateSelectedDish] = useState(null);

  const onDishSelect = (dish) => {
    updateSelectedDish(dish);
  };
  const menu = props.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <Card onClick={() => onDishSelect(dish)}>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
      </div>
    );
  });

  const renderDish = (dish) => {
    if (dish !== null) {
      return (
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div className="container">
      <div className="row">{menu} </div>
      <div className="row">{renderDish(selectedDish)}</div>
    </div>
  );
};

export default MenuComponent;
