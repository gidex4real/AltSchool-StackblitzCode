import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppRouter from './routes';
import './layout.css';

const CustomNavLink = ({ to, ...props }) => {
  let activeStyle = {
    textDecoration: 'underline',
    color: 'red',
    transition: 'all 4s',
  };

  return (
    <NavLink
      style={({ isActive }) =>
        isActive ? activeStyle : { textDecoration: 'none' }
      }
      to={to}
      end
      {...props}
    />
  );
};

function Layout() {
  return (
    <nav>
      <h1 className="logo">Welcome to our Router Test App</h1>
      <CustomNavLink to="/">Home</CustomNavLink>|{' '}
      <CustomNavLink to="/about">About</CustomNavLink>|{' '}
      <CustomNavLink to="/items">Items</CustomNavLink>|{' '}
      <CustomNavLink to="/items/new">New Item</CustomNavLink>
    </nav>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="App">
      {/* layout */}
      <Layout />

      {/* routes in our App */}
      <AppRouter />
    </div>
  );
}

export default App;
