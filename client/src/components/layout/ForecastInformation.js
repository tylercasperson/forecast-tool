import React from 'react';

const ForecastInformation = (props) => {
  return (
    <div
      style={{
        height: '60vh',
        width: '50vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
      }}
    >
      <div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '3vh',
            fontWeight: 'bold',
            padding: '1vw',
          }}
        >
          {props.name}
        </div>
        <div style={{ fontSize: '2vh', padding: '0.5vw' }}>{props.description}</div>
        <div
          style={{
            textAlign: 'start',
            justifyContent: 'flex-start',
            width: '45vw',
            fontSize: '2vh',
            padding: '0.5vw',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontWeight: 'bold',
              paddingTop: '1vh',
              paddingBottom: '1vh',
            }}
          >
            Calculation:
          </div>
          {props.calculation}
        </div>
      </div>
    </div>
  );
};

export default ForecastInformation;
