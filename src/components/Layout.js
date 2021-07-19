import React from 'react';
import Navbar from './Navbar';

const Layout = ({children}) => {
  return (
    <div className="flex flex--column width--full height--screen">
      <Navbar />
      <main className="Page flex content--center">
        <div className="container">
          { children }
        </div>
      </main>
    </div>
  );
}

export default Layout;