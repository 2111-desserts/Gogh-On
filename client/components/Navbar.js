import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div>
    <Link to ='/'>
      <h1>Collaborative Drawing Website</h1>
    </Link>
    <nav>
      <div>
        <Link to='/settings'>settings</Link>
        <Link to='/canvas'>canvas</Link>
        <Link to ='/chat'>chat</Link>
        <Link to ='/about'>about us</Link>

      </div>
    </nav>
    <hr />
  </div>
);

export default (Navbar);
