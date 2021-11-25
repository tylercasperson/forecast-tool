import React from 'react';

const TableHeader = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        background: 'lightGrey',
        paddingBottom: '10px',
      }}
    >
      <div
        style={{
          width: '5vw',
          marginTop: 'auto',
          marginBottom: 'auto',
        }}
      >
        Time Period
      </div>
      <div
        style={{
          width: '12vw',
          marginTop: 'auto',
          marginBottom: 'auto',
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
          }}
        />
        End Date
      </div>
      <div style={{ width: '8vw', marginTop: 'auto', marginBottom: 'auto' }}>
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.color[0],
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
        }}
      >
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.color[1],
          }}
        ></div>
        Sales History
        {console.log()}
      </div>
      <div
        style={{
          width: '8vw',
          marginTop: 'auto',
          marginBottom: 'auto',
          display: props.showLastYear,
        }}
      >
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.color[2],
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
        }}
      >
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.color[3],
          }}
        ></div>
        3 month moving average
      </div>
      <div
        style={{
          width: '8vw',
          marginTop: 'auto',
          marginBottom: 'auto',
          display: props.showWeightedAverage,
        }}
      >
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.color[4],
          }}
        ></div>
        3 month weight average
      </div>

      <div
        style={{
          width: '8vw',
          marginTop: 'auto',
          marginBottom: 'auto',
          display: props.showLinearRegression,
        }}
      >
        <div
          style={{
            height: '1vh',
            width: '1vw',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: props.color[5],
          }}
        ></div>
        Linear Regression
      </div>
    </div>
  );
};

export default TableHeader;