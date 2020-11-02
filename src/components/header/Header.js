import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function Header(props) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto  justify-content-end">
          <Nav.Link href="https://www.geektrust.in">GeekTrust</Nav.Link>
          <Nav.Link onClick={props.reset}>Reset</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}
