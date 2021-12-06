import React from 'react';

const ForecastInformation = (props) => {
  return (
    <div
      style={{
        height: '30vh',
        width: '40vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        <div style={{ textAlign: 'center', fontSize: '2vh', padding: '0.5vw' }}>
          <div
            style={{
              display: 'flex',
              justifySelf: 'flex-start',
              fontWeight: 'bold',
              paddingTop: '1vh',
            }}
          >
            Calculation:
          </div>
          {props.bestToUseWhen}
        </div>
      </div>
    </div>
  );
};

export default ForecastInformation;
