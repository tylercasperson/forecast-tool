import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { minMaxSalesDates } from '../data/actions/salesDataActions.js';
import { dateFormat } from '../data/formulas/dateFormulas.js';

import TimePeriodTypesList from '../layout/TimePeriodTypesList';
import DateSlider from '../layout/calendar/DateSlider';
import ForecastList from '../layout/ForecastList';
import ButtonHover from '../layout/ButtonHover';

const ForecastSetup = () => {
  const dispatch = useDispatch();

  const salesDatesMinMax = useSelector((state) => state.salesDateMinMax);
  const { minDate, maxDate } = salesDatesMinMax.salesData;

  const [lastYear, setLastYear] = useState(false);
  const [movingAverage, setMovingAverage] = useState(false);
  const [weightedAverage, setWeightedAverage] = useState(false);
  const [linearRegression, setLinearRegression] = useState(false);

  const onClick = () => {
    console.log('click');
  };

  useEffect(() => {
    dispatch(minMaxSalesDates());
  }, [dispatch]);

  return (
    <div>
      <div style={{ display: 'block' }}>
        <ForecastList
          lastYear={() => (lastYear ? setLastYear(false) : setLastYear(true))}
          movingAverage={() => (movingAverage ? setMovingAverage(false) : setMovingAverage(true))}
          weightedAverage={() =>
            weightedAverage ? setWeightedAverage(false) : setWeightedAverage(true)
          }
          linearRegression={() =>
            linearRegression ? setLinearRegression(false) : setLinearRegression(true)
          }
        />
        {minDate && maxDate && (
          <DateSlider minDate={dateFormat(minDate)} maxDate={dateFormat(maxDate)} />
        )}
      </div>
      <TimePeriodTypesList />
      <ButtonHover name={'Calculate'} onClick={() => onClick()} />
    </div>
  );
};

export default ForecastSetup;
