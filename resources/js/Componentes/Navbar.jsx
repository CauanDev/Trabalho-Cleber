import React from 'react';
import { router } from '@inertiajs/react' // We need to import this router for making POST request with our form
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBarComponente() {
  const handleNavigation = (url) => {
    router.visit(url);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand onClick={() => handleNavigation('/')}>Restaurante Kelvin</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
          >
            <Nav.Link onClick={() => handleNavigation('/estoque')}>Estoque</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/reservas')}>Reservas</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/pedidos')}>Pedidos</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/funcionarios')}>Funcionários</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/menu')}>Menu</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/mesas')}>Mesas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponente;
