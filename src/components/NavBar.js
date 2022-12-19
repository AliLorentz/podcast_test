import { Container, Form, Nav, Navbar, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from "../redux/store"
import { searchDataPodcast } from '../redux/slices/homePodcast';


function NavBar() {
  const dispatch = useDispatch();
  const { data: dataPodCast } = useSelector((state) => state.home);
  const { isLoading } = useSelector((state) => state.navbar)
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    dispatch(
      searchDataPodcast(event.target.value, dataPodCast)
    )

  };

  return (
    <Container>
      <Navbar bg="light" expand="md" className='mt-2'>
        <Container fluid>
          <Link style={{ 'textDecoration': 'none' }} to="/">
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

            {isLoading ? <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner> : <></>}

            <Form className="d-flex">
            <input type="text" value={value} onChange={handleChange} />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default NavBar;