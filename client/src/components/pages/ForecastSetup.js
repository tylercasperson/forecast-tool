import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { minMaxSalesDates } from '../data/actions/salesDataActions.js';
import { dateFormat } from '../data/formulas/dateFormulas.js';

import List from '../layout/List';
import DateSlider from '../layout/calendar/DateSlider';
import ForecastList from '../layout/ForecastList';

const ForecastSetup = () => {
  const dispatch = useDispatch();

  const salesDatesMinMax = useSelector((state) => state.salesDateMinMax);
  const { minDate, maxDate } = salesDatesMinMax.salesData;

  useEffect(() => {
    dispatch(minMaxSalesDates());
  }, [dispatch]);

  return (
    <div>
      <div style={{ display: 'block' }}>
        <ForecastList />
        {minDate && maxDate && (
          <DateSlider minDate={dateFormat(minDate)} maxDate={dateFormat(maxDate)} />
        )}
      </div>
      <List />
    </div>
  );
};

export default ForecastSetup;
