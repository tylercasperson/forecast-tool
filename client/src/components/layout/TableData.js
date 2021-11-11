import React, { useEffect } from 'react';
import TableRow from './TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { listData } from '../data/actions/dataActions';

const TableData = () => {
  const dispatch = useDispatch();

  const dataList = useSelector((state) => state.data);
  const { data } = dataList;

  useEffect(() => {
    dispatch(listData());
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
        {data.map((i, index) => {
          let background = index % 2 !== 0 ? 'lightgrey' : 'none';
          return (
            <TableRow
              key={index}
              background={background}
              timePeriod={i.timePeriod}
              startDate={i.startDate}
              endDate={i.endDate}
              type={i.type}
              data={i.data}
              w3mma={i.w3mma}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TableData;
