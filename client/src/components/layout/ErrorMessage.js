import React from 'react';

const ErrorMessage = (props) => {
  return (
    <div
      style={{
        display: props.errorDisplay,
        marginTop: '2vh',
        marginLeft: '2vw',
        width: '80vmin',
        fontSize: '2.5vmin',
        fontWeight: 'bold',
      }}
    >
      Error:
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          textAlign: 'center',
          fontSize: '2vmin',
        }}
      >
        Dates cannot be in the future. The gdp has only been calculated for past data. The data
        recorded is only for past data. Please adjust the dates.
      </div>
    </div>
  );
};

export default ErrorMessage;
