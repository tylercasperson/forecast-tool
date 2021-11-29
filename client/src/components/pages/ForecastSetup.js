import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { minMaxSalesDates } from '../data/actions/salesDataActions.js';
import { dateFormat } from '../data/formulas/dateFormulas.js';

import List from '../layout/List';
import DateSlider from '../layout/calendar/DateSlider';
import ForecastList from '../layout/ForecastList';
import ButtonHover from '../layout/ButtonHover';

const ForecastSetup = () => {
  const dispatch = useDispatch();

  const salesDatesMinMax = useSelector((state) => state.salesDateMinMax);
  const { minDate, maxDate } = salesDatesMinMax.salesData;

  const onClick = () => {
    console.log('click');
  };

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
      <ButtonHover name={'Calculate'} onClick={() => onClick()} />
    </div>
  );
};

export default ForecastSetup;
