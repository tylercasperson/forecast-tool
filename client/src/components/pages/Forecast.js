import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, add } from 'date-fns';
import { nest } from 'd3-collection';

// import { listForecastData } from '../data/actions/forecastDataActions.js';
// import { listSalesData } from '../data/actions/salesDataActions.js';
import { listGroupedData } from '../data/actions/groupedDataActions.js';

import LineGraph from '../layout/LineGraph';
import TableData from '../layout/TableData';

const Forecast = () => {
  const dispatch = useDispatch();

  // const forecastDataList = useSelector((state) => state.forecastData);
  // const { forecastData } = forecastDataList;

  // const salesDataList = useSelector((state) => state.salesData);
  // const { salesData } = salesDataList;

  const groupedDataList = useSelector((state) => state.groupedData);
  const { groupedData } = groupedDataList;

  const [startDay, setStartDay] = useState(1);
  const [startMonth, setStartMonth] = useState(1);
  const [startYear, setStartYear] = useState(2022);
  const [endDay, setEndDay] = useState(31);
  const [endMonth, setEndMonth] = useState(12);
  const [endYear, setEndYear] = useState(2022);
  const [startDate, setStartDate] = useState('2022-1-1');
  const [endDate, setEndDate] = useState('2022-12-31');

  const [color, setColor] = useState([
    '#e41a1c',
    '#377eb8',
    '#4daf4a',
    '#984ea3',
    '#ff7f00',
    '#ffff33',
    '#a65628',
    '#f781bf',
    '#999999',
  ]);

  const onChange = (e) => {
    let month = e.target.value.split('/')[0];
    let day = e.target.value.split('/')[1];
    let year = e.target.value.split('/')[2];

    switch (e.target.name) {
      case 'startDate':
        setStartMonth(month);
        setStartDay(day);
        setStartYear(year);
        if (month > 0 && month < 13) {
          if (day > 0 && day < 31) {
            if (year > 0 && year < 9999) {
              setStartDate(year + '-' + month + '-' + day);
            }
          }
        }
        break;
      case 'endDate':
        setEndMonth(month);
        setEndDay(day);
        setEndYear(year);
        if (month > 0 && month < 13) {
          if (day > 0 && day < 31) {
            if (year > 0 && year < 9999) {
              setEndDate(year + '-' + month + '-' + day);
            }
          }
        }
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    dispatch(listGroupedData(startDate, endDate));
  }, [dispatch, startDate, endDate]);

  return (
    <div>
      <LineGraph data={groupedData} color={color} />
      <TableData
        startDate={startMonth + '/' + startDay + '/' + startYear}
        endDate={endMonth + '/' + endDay + '/' + endYear}
        data={groupedData}
        color={color}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Forecast;
