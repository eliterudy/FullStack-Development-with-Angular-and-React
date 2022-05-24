import React, { Component, useState } from "react";
import {
  Jumbotron,
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isNavOpen, updateOpen] = useState(false);

  const toggleNav = () => {
    updateOpen(!isNavOpen);
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
    </>
  );
};

export default Header;
