import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAllTimePeriod, resetTimePeriod } from '../data/actions/timePeriodActions.js';
import { deleteAllGroupedData, resetGroupedData } from '../data/actions/groupedDataActions.js';
import { deleteAllSalesData, resetSalesData } from '../data/actions/salesDataActions.js';

const ButtonReset = (props) => {
  const dispatch = useDispatch();

  const onClick = () => {
    localStorage.removeItem('periods');
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
    localStorage.removeItem('groupVariables');
    localStorage.removeItem('showForecast');
    localStorage.removeItem('colors');
    localStorage.removeItem('scrollPosition');

    dispatch(deleteAllTimePeriod());
    dispatch(deleteAllGroupedData());
    dispatch(deleteAllSalesData());

    dispatch(resetTimePeriod());
    dispatch(resetGroupedData({ lastTimePeriodId: props.lastTimePeriodId }));
    dispatch(resetSalesData());
  };

  const currentURL = () => {
    let urlParts = document.URL.split('/');

    return '/' + urlParts[urlParts.length - 1];
  };

  return (
    <li onClick={() => onClick()}>
      <a href={currentURL()}>Reset Data</a>
    </li>
  );
};

export default ButtonReset;
