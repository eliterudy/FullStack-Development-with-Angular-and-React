import React, { useState } from "react";
import {
  Jumbotron,
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isNavOpen, updateNavOpen] = useState(false);
  const [isModalOpen, updateModalOpen] = useState(false);
  var username = null;
  var password = null;
  var remember = null;
  const toggleNav = () => {
    updateNavOpen(!isNavOpen);
  };

  const toggleModal = () => {
    updateModalOpen(!isModalOpen);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    updateModalOpen(!isModalOpen);
    alert(
      "Username: " +
        username.value +
        ", Password: " +
        password.value +
        ", Remember?  : " +
        remember.checked
    );
  };
  return (
    <>
      {/* Show toggle button when size is smaller than md */}
      <Navbar dark expand="md">
        <div className="container">
          {/* Toggle button to show/hide menu list/elements */}
          <NavbarToggler onClick={() => toggleNav()} />
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="assets/images/logo.png"
              height={30}
              width={41}
              alt="Ristorante con Fusion"
            />
          </NavbarBrand>
          {/* Wrapper to collapse. Has a key isOpen  */}
          <Collapse isOpen={isNavOpen} navbar>
            {/* Navigation */}
            <Nav navbar>
              <NavItem>
                <NavLink className={"nav-link"} to="/home">
                  <span className="fa fa-home fa-lg"> Home</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={"nav-link"} to="/aboutus">
                  <span className="fa fa-info fa-lg"> About Us</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={"nav-link"} to="/menu">
                  <span className="fa fa-list fa-lg"> Menu</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={"nav-link"} to="/contactus">
                  <span className="fa fa-address-card fa-lg"> Contact Us</span>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button outline onClick={() => toggleModal()}>
                  <span className=" fa fa-sign-in fa-lg"> Login</span>
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Ristorante con Fusion</h1>
              <p>
                We take inspiration from the World's best cuisines, and create a
                unique fusion experience. Our lipsmacking creations will tickle
                your culinary senses!
              </p>
            </div>
          </div>
        </div>
      </Jumbotron>
      <Modal isOpen={isModalOpen} toggle={() => toggleModal()}>
        <ModalHeader toggle={() => toggleModal()}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => handleLogin(e)}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                innerRef={(input) => (username = input)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                innerRef={(input) => (password = input)}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="remember"
                  innerRef={(input) => (remember = input)}
                />{" "}
                Remember me
              </Label>
            </FormGroup>
            <Button type="submit" value="submit" color="primary">
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Header;
