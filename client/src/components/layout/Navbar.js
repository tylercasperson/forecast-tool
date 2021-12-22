import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, add } from 'date-fns';

import { listGroupedData } from '../data/actions/groupedDataActions.js';
import { listSalesData } from '../data/actions/salesDataActions.js';
import { listTimePeriod } from '../data/actions/timePeriodActions.js';

import ButtonReset from './ButtonReset';

const Navbar = () => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { startDate, endDate } = getFromState.dates;
  const { timePeriod } = getFromState.timePeriods;

  useEffect(() => {
    dispatch(listTimePeriod());
    dispatch(
      listGroupedData(
        format(add(new Date(startDate), { days: -1 }), 'yyyy-M-d'),
        format(add(new Date(endDate), { days: 1 }), 'yyyy-M-d')
      )
    );
    dispatch(
      listSalesData(format(new Date(startDate), 'yyyy-M-d'), format(new Date(endDate), 'yyyy-M-d'))
    );
  }, [dispatch, startDate, endDate]);
  return (
    <div style={{ height: '8vh', marginBottom: '20px' }}>
      <ul
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <a
            className={
              (!document.URL.includes('forecastSetup') &&
                !document.URL.includes('forecastTypes') &&
                !document.URL.includes('salesHistory')) ||
              document.URL.includes('?salesHistory')
                ? 'selectedNav'
                : ''
            }
            href='/'
          >
            Forecast
          </a>
        </li>
        <li>
          <a
            className={document.URL.includes('forecastTypes') ? 'selectedNav' : ''}
            href='forecastTypes'
          >
            Forecast Types
          </a>
        </li>
        <li>
          <a
            className={document.URL.includes('forecastSetup') ? 'selectedNav' : ''}
            href='/forecastSetup'
          >
            Forecast Setup
          </a>
        </li>
        <li>
          <a
            className={
              document.URL.includes('salesHistory') && !document.URL.includes('?salesHistory')
                ? 'selectedNav'
                : ''
            }
            href='/salesHistory'
          >
            Sales History
          </a>
        </li>
        {timePeriod.length !== 0 && (
          <ButtonReset lastTimePeriodId={timePeriod[timePeriod.length - 1].id} />
        )}
      </ul>
    </div>
  );
};

export default Navbar;
