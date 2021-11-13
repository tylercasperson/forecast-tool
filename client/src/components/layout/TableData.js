import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, add } from 'date-fns';
import { listForecastData } from '../data/actions/forecastDataActions.js';
import { listSalesData } from '../data/actions/salesDataActions.js';
import TableRow from './TableRow';
import Filter from './Filter';

const TableData = () => {
  const dispatch = useDispatch();

  const forecastDataList = useSelector((state) => state.forecastData);
  const { forecastData } = forecastDataList;

  const salesDataList = useSelector((state) => state.salesData);
  const { salesData } = salesDataList;

  const [startDate, setStartDate] = useState(
    format(add(Date.now(), { years: -2 }), 'MM/dd/yyyy')
  );
  const [endDate, setEndDate] = useState(
    format(add(Date.now(), { years: -1 }), 'MM/dd/yyyy')
  );

  console.log('fd: ', forecastData);
  console.log('sd: ', salesData);

  const onChange = (e) => {
    switch (e.target.name) {
      case 'startDate':
        return setStartDate(e.target.value);
      case 'endDate':
        return setEndDate(e.target.value);
      default:
        return;
    }
  };

  useEffect(() => {
    dispatch(listForecastData());
    dispatch(listSalesData(startDate, endDate));
  }, [dispatch, startDate, endDate]);

  return (
    <div
      style={{
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '-5px',
        width: '70vw',
      }}
    >
      <Filter
        startDate={startDate}
        endDate={endDate}
        onChange={(e) => onChange(e)}
      />
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
              startDate={format(new Date(i.timePeriod.startDate), 'MM/dd/yyyy')}
              endDate={format(new Date(i.timePeriod.endDate), 'MM/dd/yyyy')}
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
