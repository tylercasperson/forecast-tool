import React from 'react';

const Navbar = () => {
  return (
    <div style={{ height: '8vh', marginBottom: '20px' }}>
      <ul
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <a href='/'>Line Chart</a>
        </li>
        <li>
          <a href='forecastTypes'>Forecast Types</a>
        </li>
        <li>
          <a href='/forecastSetup'>Forecast Setup</a>
        </li>
        <li>
          <a href='/salesHistory'>Sales History</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
