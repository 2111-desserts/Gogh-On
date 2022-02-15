import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavigationBar = () => (
  <Navbar
    style={{
      backgroundColor: '#2f3774',
      flexDirection: 'column',
      paddingBottom: '0',
    }}
    variant='dark'
  >
    <Navbar.Brand href='/' style={{ fontSize: '55px' }}>
      <img
        alt=''
        src='/van Gogh.png'
        width='90px'
        height='90px'
        className='d-inline-block align-top'
      />{' '}
      Gogh On!
    </Navbar.Brand>
    <Nav>
      <br />
      <Nav.Link href='/'>Home</Nav.Link>
    </Nav>
  </Navbar>
);

export default NavigationBar;
