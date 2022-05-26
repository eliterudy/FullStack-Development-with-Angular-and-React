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
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

const Contact = (props) => {
  const [formValues, updateFormValues] = useState({
    firstname: "",
    lastname: "",
    telnum: "",
    email: "",
    agree: false,
    contactType: "Tel.",
    message: "",
  });
  const [touched, updateTouchValidation] = useState({
    firstname: false,
    lastname: false,
    telnum: false,
    email: false,
  });

  const [errorMessages, updateErrorMessage] = useState({
    firstname: "",
    lastname: "",
    telnum: "",
    email: "",
  });

  // update state of all input fields
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type == "checkbox" ? target.checked : target.value;
    const name = target.name;
    updateFormValues({ ...formValues, [name]: value });
  };

  // Form onsubmit
  const handleSubmit = (event) => {
    alert(JSON.stringify(formValues));
    event.preventDefault();
  };

  // Invoked when onBlur for Input tag is called
  const handleBlur = (field, evt) => {
    updateTouchValidation({ ...touched, [field]: true });
  };

  // Called when touched state is updated
  useEffect(() => {
    const { firstname, lastname, telnum, email } = formValues;
    validate(firstname, lastname, telnum, email);
  }, [touched, formValues]);

  // Validate fields and update error messages
  const validate = (firstname, lastname, telnum, email) => {
    const errors = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
    };

    if (touched.firstname && firstname.length < 3) {
      errors.firstname = "First Name should be >= 3 characters";
    } else if (touched.firstname && firstname.length > 10) {
      errors.firstname = "First Name should be <= 10 characters";
    } else {
      errors.firstname = "";
    }

    if (touched.lastname && lastname.length < 3) {
      errors.lastname = "Last Name should be >= 3 characters";
    } else if (touched.lastname && lastname.length > 10) {
      errors.lastname = "Last Name should be <= 10 characters";
    } else {
      errors.lastname = "";
    }

    const reg = /^\d+$/;
    if (touched.telnum && !reg.test(telnum)) {
      errors.telnum = "Tel. num should contain only numbers";
    } else {
      errors.telnum = "";
    }

    if (
      touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    ) {
      errors.email = "Email should contain a @ symbol";
    } else {
      errors.email = "";
    }

    updateErrorMessage({ ...errors });
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
          <Form onSubmit={(e) => handleSubmit(e)}>
            {/* Row inside form using FormGroup */}
            <FormGroup row>
              {/* Occupy 2 columns using md */}
              <Label htmlFor="firstname" md={2}>
                First Name
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  onBlur={(e) => handleBlur("firstname", e)}
                  onChange={(e) => handleInputChange(e)}
                  value={formValues.firstname}
                  valid={errorMessages.firstname === ""}
                  invalid={errorMessages.firstname !== ""}
                />
                <FormFeedback>{errorMessages.firstname}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              {/* Occupy 2 columns using md */}
              <Label htmlFor="lastname" md={2}>
                Last Name
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  onBlur={(e) => handleBlur("lastname", e)}
                  onChange={(e) => handleInputChange(e)}
                  value={formValues.lastname}
                  valid={errorMessages.lastname === ""}
                  invalid={errorMessages.lastname !== ""}
                />
                <FormFeedback>{errorMessages.lastname}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              {/* Occupy 2 columns using md */}
              <Label htmlFor="telnum" md={2}>
                Contact Tel.
              </Label>
              <Col md={10}>
                <Input
                  type="tel"
                  id="telnum"
                  name="telnum"
                  placeholder="Tel. Number"
                  onBlur={(e) => handleBlur("telnum", e)}
                  onChange={(e) => handleInputChange(e)}
                  value={formValues.telnum}
                  valid={errorMessages.telnum === ""}
                  invalid={errorMessages.telnum !== ""}
                />
                <FormFeedback>{errorMessages.telnum}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              {/* Occupy 2 columns using md */}
              <Label htmlFor="email" md={2}>
                Email
              </Label>
              <Col md={10}>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onBlur={(e) => handleBlur("email", e)}
                  onChange={(e) => handleInputChange(e)}
                  value={formValues.email}
                  valid={errorMessages.email === ""}
                  invalid={errorMessages.email !== ""}
                />
                <FormFeedback>{errorMessages.email}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row className="align-items-center">
              {/* For medium screen, occupy 6 columns and left offset of 2 */}
              <Col md={{ size: 6, offset: 2 }}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="agree"
                      onChange={(e) => handleInputChange(e)}
                      checked={formValues.agree}
                    />{" "}
                    <strong>May we contact you?</strong>
                  </Label>
                </FormGroup>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <Input
                  type="select"
                  name="contactType"
                  onChange={(e) => handleInputChange(e)}
                  value={formValues.contactType}
                >
                  <option>Tel.</option>
                  <option>Email</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              {/* Occupy 2 columns using md */}
              <Label htmlFor="message" md={2}>
                Your Feedback
              </Label>
              <Col md={10}>
                <Input
                  type="textarea"
                  id="message"
                  name="message"
                  placeholder=""
                  rows="12"
                  onChange={(e) => handleInputChange(e)}
                  value={formValues.message}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
