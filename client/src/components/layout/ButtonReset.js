import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAllTimePeriod, resetTimePeriod } from '../data/actions/timePeriodActions.js';
import { deleteAllGroupedData, resetGroupedData } from '../data/actions/groupedDataActions.js';
import { deleteAllSalesData, resetSalesData } from '../data/actions/salesDataActions.js';

const ButtonReset = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(deleteAllTimePeriod());
    dispatch(deleteAllGroupedData());
    dispatch(deleteAllSalesData());

    dispatch(resetTimePeriod());
    dispatch(resetGroupedData());
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
