import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dateFormat } from '../data/formulas/dateFormulas.js';
import { createBulkTimePeriod } from '../data/actions/timePeriodActions.js';
import { createBulkGroupedData } from '../data/actions/groupedDataActions.js';
import { minMaxSalesDates } from '../data/actions/salesDataActions.js';

import TimePeriodTypesList from '../layout/TimePeriodTypesList';
import DateSlider from '../layout/calendar/DateSlider';
import ForecastList from '../layout/ForecastList';
import ButtonHover from '../layout/ButtonHover';

const ForecastSetup = () => {
  const dispatch = useDispatch();

  const pullFromState = useSelector((state) => state);
  const { minDate, maxDate } = pullFromState.salesDateMinMax.salesData;
  const { startDate, endDate } = pullFromState.dates;

  const [data, setData] = useState([]);

  const onClick = () => {
    console.log('click');

    setData([]);

    let timePeriodArr = [];

    dispatch(createBulkGroupedData(data));
    dispatch(createBulkTimePeriod(timePeriodArr));
  };

  useEffect(() => {
    dispatch(minMaxSalesDates());
  }, [dispatch]);

  return (
    <div>
      <div style={{ display: 'block' }}>
        <ForecastList />
        {minDate && maxDate && <DateSlider />}
      </div>
      <TimePeriodTypesList />
      <ButtonHover name={'Calculate'} onClick={() => onClick()} />
    </div>
  );
};

export default ForecastSetup;
