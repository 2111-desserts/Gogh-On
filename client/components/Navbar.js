import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavigationBar = () => (
  <Navbar
    style={{ backgroundColor: '#2f3774', flexDirection: 'column' }}
    variant='dark'
  >
    <Navbar.Brand href='/' style={{ fontSize: '70px' }}>
      <img
        alt=''
        src='/van Gogh.png'
        width='100px'
        height='100px'
        className='d-inline-block align-top'
      />{' '}
      Gogh On!
    </Navbar.Brand>
    <Nav>
      <br />
      <Nav.Link href='/about'>About Us</Nav.Link>
    </Nav>
  </Navbar>
);

export default NavigationBar;
