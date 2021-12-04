import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import { listGroupedData } from '../data/actions/groupedDataActions.js';
import {
  saveStartDate,
  saveEndDate,
  saveShowSalesHistory,
  saveShowLastYear,
  saveShowMovingAverage,
  saveShowWeightedAverage,
  saveShowLinearRegression,
} from '../data/actions/settingsActions.js';

import LineGraph from '../layout/LineGraph';
import TableData from '../layout/TableData';
import ShowHide from '../layout/ShowHide';

const Forecast = () => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { groupedData } = getFromState.groupedData;
  const { startDate, endDate } = getFromState.dates;
  const {
    showSalesHistory,
    showLastYear,
    showMovingAverage,
    showWeightedAverage,
    showLinearRegression,
  } = getFromState.showForecast;

  const [startDay, setStartDay] = useState(1);
  const [startMonth, setStartMonth] = useState(1);
  const [startYear, setStartYear] = useState(2022);
  const [endDay, setEndDay] = useState(31);
  const [endMonth, setEndMonth] = useState(12);
  const [endYear, setEndYear] = useState(2022);

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
          if (day > 0 && day < 32) {
            if (year > 0 && year < 9999) {
              dispatch(saveStartDate(e.target.value));
            }
          }
        }
        break;
      case 'endDate':
        setEndMonth(month);
        setEndDay(day);
        setEndYear(year);
        if (month > 0 && month < 13) {
          if (day > 0 && day < 32) {
            if (year > 0 && year < 9999) {
              dispatch(saveEndDate(e.target.value));
            }
          }
        }
        break;
      case 'salesHistory':
        dispatch(saveShowSalesHistory(showSalesHistory ? false : true));
        break;
      case 'lastYear':
        dispatch(saveShowLastYear(showLastYear ? false : true));
        break;
      case 'movingAverage':
        dispatch(saveShowMovingAverage(showMovingAverage ? false : true));
        break;
      case 'weightedAverage':
        dispatch(saveShowWeightedAverage(showWeightedAverage ? false : true));
        break;
      case 'linearRegression':
        dispatch(saveShowLinearRegression(showLinearRegression ? false : true));
        break;
      default:
        return;
    }
    filteredData();
  };

  const filteredData = () => {
    let removeSalesHistory = showSalesHistory ? 0 : 2;
    let removeLastYear = showLastYear ? 0 : 3;
    let removeMovingAverage = showMovingAverage ? 0 : 4;
    let removeWeightedAverage = showWeightedAverage ? 0 : 5;
    let removeLinearRegression = showLinearRegression ? 0 : 6;

    return groupedData.filter(
      (data) =>
        data.dataTypeId !== removeSalesHistory &&
        data.dataTypeId !== removeLastYear &&
        data.dataTypeId !== removeMovingAverage &&
        data.dataTypeId !== removeWeightedAverage &&
        data.dataTypeId !== removeLinearRegression
    );
  };

  const filteredColor = () => {
    let removeSalesHistory = showSalesHistory ? 0 : color[1];
    let removeLastYear = showLastYear ? 0 : color[2];
    let removeMovingAverage = showMovingAverage ? 0 : color[3];
    let removeWeightedAverage = showWeightedAverage ? 0 : color[4];
    let removeLinearRegression = showLinearRegression ? 0 : color[5];

    return color.filter(
      (i) =>
        i !== removeSalesHistory &&
        i !== removeLastYear &&
        i !== removeMovingAverage &&
        i !== removeWeightedAverage &&
        i !== removeLinearRegression
    );
  };

  useEffect(() => {
    dispatch(
      listGroupedData(
        format(new Date(startDate), 'yyyy-M-d'),
        format(new Date(endDate), 'yyyy-M-d')
      )
    );
  }, [dispatch, startDate, endDate]);

  return (
    <div>
      <LineGraph data={filteredData()} color={filteredColor()} />
      <ShowHide
        onChange={(e) => onChange(e)}
        showSalesHistory={showSalesHistory}
        showLastYear={showLastYear}
        showMovingAverage={showMovingAverage}
        showWeightedAverage={showWeightedAverage}
        showLinearRegression={showLinearRegression}
      />
      <TableData
        startDay={startDay}
        startMonth={startMonth}
        startYear={startYear}
        endDay={endDay}
        endMonth={endMonth}
        endYear={endYear}
        startDate={startMonth + '/' + startDay + '/' + startYear}
        endDate={endMonth + '/' + endDay + '/' + endYear}
        data={groupedData}
        color={color}
        onChange={(e) => onChange(e)}
        showSalesHistory={showSalesHistory ? '' : 'none'}
        showLastYear={showLastYear ? '' : 'none'}
        showMovingAverage={showMovingAverage ? '' : 'none'}
        showWeightedAverage={showWeightedAverage ? '' : 'none'}
        showLinearRegression={showLinearRegression ? '' : 'none'}
      />
    </div>
  );
};

export default Forecast;
