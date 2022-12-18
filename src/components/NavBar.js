import {Button,Container,Form,Nav,Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Container>
    <Navbar bg="light" expand="md" className='mt-2'>
      <Container fluid>
        <Link style={{'textDecoration':'none'}} to="/">
        <Navbar.Brand >Podcaster</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          > 
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </Container>
  );
}

export default NavBar;