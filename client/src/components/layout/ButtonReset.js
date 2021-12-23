import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllTimePeriod, resetTimePeriod } from '../data/actions/timePeriodActions.js';
import { deleteAllGroupedData, resetGroupedData } from '../data/actions/groupedDataActions.js';
import { deleteAllSalesData, resetSalesData } from '../data/actions/salesDataActions.js';
import { GROUPED_DATA_RESET_RESET } from '../data/constants/groupedDataConstants.js';
import { SALES_DATA_RESET_RESET } from '../data/constants/salesDataConstants.js';
import { TIME_PERIOD_RESET_RESET } from '../data/constants/timePeriodConstants.js';

const ButtonReset = (props) => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { success: timePeriodResetSuccess } = getFromState.timePeriodsReset;
  const { success: salesDataResetSuccess } = getFromState.salesDataReset;
  const { success: groupedDataResetSuccess } = getFromState.groupedDataReset;

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

  useEffect(() => {
    if (timePeriodResetSuccess) {
      dispatch({ type: TIME_PERIOD_RESET_RESET });
    }
    if (salesDataResetSuccess) {
      dispatch({ type: SALES_DATA_RESET_RESET });
    }
    if (groupedDataResetSuccess) {
      dispatch({ type: GROUPED_DATA_RESET_RESET });
    }
  }, [dispatch, timePeriodResetSuccess, salesDataResetSuccess, groupedDataResetSuccess]);

  return (
    <li onClick={() => onClick()}>
      <a href={currentURL()}>Reset Data</a>
    </li>
  );
};

export default ButtonReset;
