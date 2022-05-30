import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (value) => value && value.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const Contact = (props) => {
  const [errorMessages, updateErrorMessage] = useState({
    firstname: "",
    lastname: "",
    telnum: "",
    email: "",
  });

  // Form onsubmit
  const handleSubmit = (values) => {
    alert(JSON.stringify(values));
  };

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={"/home"}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Contact Us</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Location Information</h3>
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Our Address</h5>
          <address>
            121, Clear Water Bay Road
            <br />
            Clear Water Bay, Kowloon
            <br />
            HONG KONG
            <br />
            <i className="fa fa-phone"></i>: +852 1234 5678
            <br />
            <i className="fa fa-fax"></i>: +852 8765 4321
            <br />
            <i className="fa fa-envelope"></i>:{" "}
            <a href="mailto:confusion@food.net">confusion@food.net</a>
          </address>
        </div>
        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Map of our Location</h5>
        </div>
        <div className="col-12 col-sm-11 offset-sm-1">
          <div className="btn-group" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel:+85212345678"
            >
              <i className="fa fa-phone"></i> Call
            </a>
            <a role="button" className="btn btn-info">
              <i className="fa fa-skype"></i> Skype
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:confusion@food.net"
            >
              <i className="fa fa-envelope-o"></i> Email
            </a>
          </div>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Send us your Feedback</h3>
        </div>
        <div className="col-12 col-md-9">
          <LocalForm onSubmit={(values) => handleSubmit(values)}>
            {/* Row inside form using FormGroup */}
            <Row className="form-group">
              {/* Occupy 2 columns using md */}
              <Label htmlFor="firstname" md={2}>
                First Name
              </Label>
              <Col md={10}>
                <Control.text
                  model=".firstname"
                  id="firstname"
                  className="form-control"
                  name="firstname"
                  placeholder="First Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".firstname"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              {/* Occupy 2 columns using md */}
              <Label htmlFor="lastname" md={2}>
                Last Name
              </Label>
              <Col md={10}>
                <Control.text
                  model=".lastname"
                  id="lastname"
                  name="lastname"
                  className="form-control"
                  placeholder="Last Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".lastname"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              {/* Occupy 2 columns using md */}
              <Label htmlFor="telnum" md={2}>
                Contact Tel.
              </Label>
              <Col md={10}>
                <Control.text
                  model=".telnum"
                  id="telnum"
                  name="telnum"
                  className="form-control"
                  placeholder="Tel. Number"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                    isNumber,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".telnum"
                  show="touched"
                  messages={{
                    required: "Required",
                    minLength: "Must be greater than 2 numbers",
                    maxLength: "Must be 15 numbers or less",
                    isNumber: "Must be a number",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              {/* Occupy 2 columns using md */}
              <Label htmlFor="email" md={2}>
                Email
              </Label>
              <Col md={10}>
                <Control.text
                  model=".email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  validators={{
                    required,
                    validEmail,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".email"
                  show="touched"
                  messages={{
                    required: "Required",
                    validEmail: "Must be a valid email",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group align-items-center">
              {/* For medium screen, occupy 6 columns and left offset of 2 */}
              <Col md={{ size: 6, offset: 2 }}>
                <div className="form-check" check>
                  <Label check>
                    <Control.checkbox
                      model=".agree"
                      name="agree"
                      className="form-check-input"
                    />{" "}
                    <strong>May we contact you?</strong>
                  </Label>
                </div>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <Control.select model=".contactType" name="contactType">
                  <option>Tel.</option>
                  <option>Email</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              {/* Occupy 2 columns using md */}
              <Label htmlFor="message" md={2}>
                Your Feedback
              </Label>
              <Col md={10}>
                <Control.textarea
                  model="message"
                  className="form-control"
                  id="message"
                  name="message"
                  placeholder=""
                  rows="12"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </div>
      </div>
    </div>
  );
};

export default Contact;
