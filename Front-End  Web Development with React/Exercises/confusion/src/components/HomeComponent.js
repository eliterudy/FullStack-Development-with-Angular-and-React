import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import Loading from "./LoadingComponent";
import { baseURL } from "../shared/apis";
const RenderCard = ({ item, isLoading, errMess }) => {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  }
  return (
    <Card>
      <CardImg src={baseURL + item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? (
          <CardSubtitle>{item.designation}</CardSubtitle>
        ) : null}
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
};

const Home = (props) => {
  const {
    dish,
    promotion,
    leader,
    dishLoading,
    dishErrMess,
    promotionLoading,
    promotionErrMess,
    leaderLoading,
    leaderErrMess,
  } = props;
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={dish}
            isLoading={dishLoading}
            errMess={dishErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={promotion}
            isLoading={promotionLoading}
            errMess={promotionErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={leader}
            isLoading={leaderLoading}
            errMess={leaderErrMess}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
