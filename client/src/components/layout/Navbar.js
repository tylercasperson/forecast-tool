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
          <a
            className={
              (!document.URL.includes('forecastSetup') &&
                !document.URL.includes('forecastTypes') &&
                !document.URL.includes('salesHistory')) ||
              document.URL.includes('?salesHistory')
                ? 'selectedNav'
                : ''
            }
            href='/'
          >
            Forecast
          </a>
        </li>
        <li>
          <a
            className={document.URL.includes('forecastTypes') ? 'selectedNav' : ''}
            href='forecastTypes'
          >
            Forecast Types
          </a>
        </li>
        <li>
          <a
            className={document.URL.includes('forecastSetup') ? 'selectedNav' : ''}
            href='/forecastSetup'
          >
            Forecast Setup
          </a>
        </li>
        <li>
          <a
            className={
              document.URL.includes('salesHistory') && !document.URL.includes('?salesHistory')
                ? 'selectedNav'
                : ''
            }
            href='/salesHistory'
          >
            Sales History
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
