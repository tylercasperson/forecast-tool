import React from 'react';
import { format } from 'date-fns';
import TableRow from './TableRow';

const TableData = (props) => {
  return (
    <div
      style={{
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '-3px',
        width: '70vw',
      }}
    >
      <div
        style={{
          display: 'flex',
          background: 'lightGrey',
          paddingBottom: '10px',
        }}
      >
        <div style={{ width: '5vw', marginTop: 'auto', marginBottom: 'auto' }}>
          Time Period
        </div>
        <div style={{ width: '12vw', marginTop: 'auto', marginBottom: 'auto' }}>
          <input
            type='text'
            name='startDate'
            onChange={props.onChange}
            value={props.startDate}
            style={{
              backgroundColor: 'lightgrey',
              width: '80%',
              marginBottom: '3%',
              fontSize: '110%',
              fontWeight: 'bold',
            }}
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
              width: '80%',
              marginBottom: '3%',
              fontSize: '110%',
              fontWeight: 'bold',
            }}
          />
          End Date
        </div>
        <div style={{ width: '8vw', marginTop: 'auto', marginBottom: 'auto' }}>
          Current Data
        </div>
        <div style={{ width: '8vw', marginTop: 'auto', marginBottom: 'auto' }}>
          Last Year
        </div>
        <div
          style={{
            width: '8vw',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        >
          3 month weight average
        </div>
        <div style={{ width: '8vw', marginTop: 'auto', marginBottom: 'auto' }}>
          3 month moving average
        </div>
        <div style={{ width: '8vw', marginTop: 'auto', marginBottom: 'auto' }}>
          Linear Regression
        </div>
      </div>
      <div style={{ height: '40vh', overflowY: 'auto' }}>
        {props.data.map((i, index) => {
          let background = index % 2 !== 0 ? 'lightgrey' : 'none';
          return (
            <TableRow
              key={index}
              background={background}
              timePeriod={i.timePeriod.groupName}
              startDate={format(new Date(i.startDate), 'M/d/yyyy')}
              endDate={format(new Date(i.endDate), 'M/d/yyyy')}
              currentData={i.forecastData === null ? '' : i.forecastData}
              lastYear={i.lastYear === null ? '' : i.lastYear}
              m3wa={
                i.timePeriod.groupName === 'W9'
                  ? i.m3wa === null
                    ? ''
                    : i.m3wa
                  : '9999'
              }
              m3ma={i.m3ma === null ? '' : i.m3ma}
              linearRegression={
                i.linearRegression === null ? '' : i.linearRegression
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default TableData;
