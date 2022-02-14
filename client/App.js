import React from 'react';
import Footer from './components/Footer';
import NavigationBar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  return (
    <div>
      <NavigationBar />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
