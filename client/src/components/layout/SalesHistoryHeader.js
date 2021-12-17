import React from 'react';

const SalesHistoryHeader = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        background: 'lightGrey',
        height: '3vh',
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
      }}
    >
      <div
        style={{
          width: '12vw',
          fontSize: '1.8vmin',
        }}
      >
        Date
      </div>
      <div style={{ width: '12vw', fontSize: '1.8vmin' }}>Sales</div>
    </div>
  );
};

export default SalesHistoryHeader;
