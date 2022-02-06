import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavigationBar = () => (
  <Navbar bg='primary' variant='dark'>
    <Navbar.Brand href='/'>
      <img
        alt=''
        src='/favicon.ico'
        width='30'
        height='30'
        className='d-inline-block align-top'
      />{' '}
      Collaborative Drawing Website
    </Navbar.Brand>
    <Nav>
      <Nav.Link href='/'>Home</Nav.Link>
      <Nav.Link href='/settings'>Settings</Nav.Link>
      <Nav.Link href='/canvas'>Canvas</Nav.Link>
      <Nav.Link href='/chat'>Chat</Nav.Link>
      <Nav.Link href='/about'>About Us</Nav.Link>
    </Nav>
  </Navbar>
);

export default NavigationBar;
