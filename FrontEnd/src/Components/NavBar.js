import React from "react";

import { Navbar,Container,Nav} from "react-bootstrap";
export const NavbarComp = () => {

    return(
        <div>
         <Navbar bg="primary" variant="dark" expand="lg">
         <Container fluid>
                <Nav.Link href="/"><Navbar.Brand>E-HEALTH</Navbar.Brand></Nav.Link>
                <Nav className="d-flex">
                  <Nav.Link href="/contact-us">Contact-us</Nav.Link>
                </Nav>
           </Container>
         </Navbar>
      </div>
    )
};

export default NavbarComp;