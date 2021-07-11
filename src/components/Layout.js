import React from 'react';
import Navbar from './Navbar';

const Layout = ({children}) => {
  return (
    <div className="flex flex--column width--full height--screen">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;