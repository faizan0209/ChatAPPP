import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

function Mains() {
  return (
    <div>
      <Nav />
      <Outlet /> {/* This will render the child routes like Login */}
      <Footer />
    </div>
  );
}

export default Mains;
