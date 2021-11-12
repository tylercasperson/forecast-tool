import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listForecastData } from '../data/actions/forecastDataActions.js';
import TableRow from './TableRow';

const TableData = () => {
  const dispatch = useDispatch();

  const forecastDataList = useSelector((state) => state.forecastData);
  const { forecastData } = forecastDataList;

  const getDate = (dateToConvert) => {
    let dateParts = dateToConvert.split('-');
    let jsDate = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2].substr(0, 2)
    );

    let month = (jsDate.getMonth() + 1).toString();
    let day = jsDate.getDate().toString();
    let year = jsDate.getFullYear();

    return month + '/' + day + '/' + year;
  };

  console.log('fd: ', forecastData);
  forecastData.length === 0
    ? console.log('wait')
    : console.log(
        'date?: ',
        forecastData[0].timePeriod.startDate instanceof Date
      );

  useEffect(() => {
    dispatch(listForecastData());
  }, [dispatch]);

  return (
    <div
      style={{
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '-5px',
      }}
    >
      <div
        style={{
          display: 'flex',
          background: 'lightGrey',
        }}
      >
        <div style={{ width: '5vw', marginTop: 'auto', marginBottom: 'auto' }}>
          Time Period
        </div>
        <div style={{ width: '12vw', marginTop: 'auto', marginBottom: 'auto' }}>
          Start Date
        </div>
        <div style={{ width: '12vw', marginTop: 'auto', marginBottom: 'auto' }}>
          End Date
        </div>
        <div style={{ width: '8vw', marginTop: 'auto', marginBottom: 'auto' }}>
          Current Data
        </div>
        <div style={{ width: '8vw', marginTop: 'auto', marginBottom: 'auto' }}>
          Last Year
        </div>
        <div style={{ width: '8vw', marginTop: 'auto', marginBottom: 'auto' }}>
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
        {forecastData.map((i, index) => {
          let background = index % 2 !== 0 ? 'lightgrey' : 'none';
          return (
            <TableRow
              key={index}
              background={background}
              timePeriod={i.timePeriod.groupName}
              startDate={getDate(i.timePeriod.startDate)}
              endDate={getDate(i.timePeriod.endDate)}
              currentData={i.forecastData === null ? '' : i.forecastData}
              lastYear={i.lastYear === null ? '' : i.lastYear}
              m3wa={i.m3wa === null ? '' : i.m3wa}
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
