import React from 'react';
import { nest } from 'd3-collection';
import TableRow from './TableRow';

const TableData = (props) => {
  let data = nest()
    .key((d) => d.timePeriod.groupName)
    .entries(props.data);

  const dateFormat = (date) => {
    let dateParts = date.split('T')[0].split('-');
    let month = dateParts[1][0] === '0' ? dateParts[1][1] : dateParts[1];
    let day = dateParts[2][0] === '0' ? dateParts[2][1] : dateParts[2];
    let year = dateParts[0];

    return month + '/' + day + '/' + year;
  };

  return (
    <div
      style={{
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '-3px',
        width: '70vw',
        fontSize: '1.5vw',
      }}
    >
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
        {data.map((i, index) => {
          let findData = (something) => {
            let exists = i.values.find(
              (o) => o.dataType.abbreviation === something
            );
            return exists === undefined ? 0 : exists.data;
          };
          let background = index % 2 !== 0 ? 'lightgrey' : 'none';
          return (
            <TableRow
              key={index}
              background={background}
              timePeriod={i.key}
              startDate={dateFormat(i.values[0].timePeriod.startDate)}
              endDate={dateFormat(i.values[0].timePeriod.endDate)}
              currentData={findData('sh')}
              lastYear={findData('ly')}
              m3wa={findData('w3ma')}
              m3ma={findData('m3ma')}
              linearRegression={findData('lr')}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TableData;
