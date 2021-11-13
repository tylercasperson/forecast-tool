import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, add } from 'date-fns';

import { listForecastData } from '../data/actions/forecastDataActions.js';
import { listSalesData } from '../data/actions/salesDataActions.js';

import LineGraph from '../layout/LineGraph';
import TableData from '../layout/TableData';

const Forecast = () => {
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
    <div>
      <LineGraph data={forecastData} />
      <TableData
        startDate={startDate}
        endDate={endDate}
        data={forecastData}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Forecast;
