import React from 'react';

const TableHeader = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        background: 'lightGrey',
        paddingBottom: '10px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '5vw',
          marginTop: 'auto',
          marginBottom: 'auto',
          fontSize: '1.8vmin',
        }}
      >
        Time Period
      </div>
      <div
        style={{
          width: '12vw',
          marginTop: 'auto',
          marginBottom: 'auto',
          fontSize: '1.8vmin',
        }}
      >
        <input
          type='text'
          name='startDate'
          onChange={props.onChange}
          value={props.startDate}
          style={{
            backgroundColor: 'lightgrey',
            width: '90%',
            marginBottom: '3%',
            fontWeight: 'bold',
            fontSize: '1.8vmin',
          }}
          id='one'
        />
        Start Date
      </div>
      <div
        style={{
          width: '12vw',
          marginTop: 'auto',
          marginBottom: 'auto',
          fontSize: '1.8vmin',
        }}
      >
        <input
          type='text'
          name='endDate'
          onChange={props.onChange}
          value={props.endDate}
          style={{
            backgroundColor: 'lightgrey',
            width: '90%',
            marginBottom: '3%',
            fontWeight: 'bold',
            fontSize: '1.8vmin',
          }}
        />
        End Date
      </div>
      <div style={{ width: '8vw', marginTop: 'auto', marginBottom: 'auto', fontSize: '1.8vmin' }}>
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.colors[0],
          }}
        ></div>
        User Input
      </div>
      <div
        style={{
          width: '8vw',
          marginTop: 'auto',
          marginBottom: 'auto',
          display: props.showSalesHistory,
          fontSize: '1.8vmin',
        }}
      >
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.colors[1],
          }}
        ></div>
        Sales History
      </div>
      <div
        style={{
          width: '8vw',
          marginTop: 'auto',
          marginBottom: 'auto',
          display: props.showLastYear,
          fontSize: '1.8vmin',
        }}
      >
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.colors[2],
          }}
        ></div>
        Last Year
      </div>
      <div
        style={{
          width: '8vw',
          marginTop: 'auto',
          marginBottom: 'auto',
          display: props.showMovingAverage,
          fontSize: '1.8vmin',
        }}
      >
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.colors[3],
          }}
        ></div>
        {props.movingPeriod} Moving Average
      </div>
      <div
        style={{
          width: '8vw',
          marginTop: 'auto',
          marginBottom: 'auto',
          display: props.showWeightedAverage,
          fontSize: '1.8vmin',
        }}
      >
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.colors[4],
          }}
        ></div>
        {props.weightedPeriod} Weighted Average
      </div>

      <div
        style={{
          width: '8vw',
          marginTop: 'auto',
          marginBottom: 'auto',
          display: props.showLinearRegression,
          fontSize: '1.8vmin',
        }}
      >
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.colors[5],
          }}
        ></div>
        Linear Regression
      </div>
    </div>
  );
};

export default TableHeader;
