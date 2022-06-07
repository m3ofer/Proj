import React from "react";

import { Navbar,Container,Nav} from "react-bootstrap";
export const NavbarClt = () => {

    return(
        <div>
          <Navbar bg="primary" variant="dark">
                <Container>
                <Navbar.Brand href="/client/home">E-Health</Navbar.Brand>
                <Nav>
                <Nav.Link href="/client/history">History</Nav.Link></Nav>
                <Nav className="d-flex">
                <Nav.Link href="/">Sign out</Nav.Link>
                </Nav>
                </Container>
           </Navbar>
      </div>
    )
};

export default NavbarClt;