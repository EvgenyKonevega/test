import React from 'react';
import { Navbar, Nav, Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './index.css';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Karasic</Navbar.Brand>
      <Nav className="mr-auto">
        <InputGroup>
          <InputGroup.Prepend>
            <Button variant="outline-light">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup.Prepend>
          <Form.Control type="text" placeholder="Search here.." />
        </InputGroup>
      </Nav>
      <Nav>
        <Nav.Link href="#signIn">Sign In</Nav.Link>
        <Nav.Link href="#signUp">Sign Up</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
