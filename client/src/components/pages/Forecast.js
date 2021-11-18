import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listGroupedData } from '../data/actions/groupedDataActions.js';

import LineGraph from '../layout/LineGraph';
import TableData from '../layout/TableData';
import ShowHide from '../layout/ShowHide';

const Forecast = () => {
  const dispatch = useDispatch();

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

  const [salesHistoryLock, setSalesHistoryLock] = useState(false);
  const [lastYearLock, setLastYearLock] = useState(false);
  const [movingAverageLock, setMovingAverageLock] = useState(false);
  const [weightedAverageLock, setWeightedAverageLock] = useState(false);
  const [linearRegressionLock, setLinearRegressionLock] = useState(false);

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
          if (day > 0 && day < 32) {
            if (year > 0 && year < 9999) {
              setEndDate(year + '-' + month + '-' + day);
            }
          }
        }
        break;
      case 'salesHistory':
        setSalesHistoryLock(salesHistoryLock ? false : true);
        break;
      case 'lastYear':
        setLastYearLock(lastYearLock ? false : true);
        break;
      case 'movingAverage':
        setMovingAverageLock(movingAverageLock ? false : true);
        break;
      case 'weightedAverage':
        setWeightedAverageLock(weightedAverageLock ? false : true);
        break;
      case 'linearRegression':
        setLinearRegressionLock(linearRegressionLock ? false : true);
        break;
      default:
        return;
    }
    filteredData();
  };

  const filteredData = () => {
    let removeSalesHistory = salesHistoryLock ? 2 : 0;
    let removeLastYear = lastYearLock ? 3 : 0;
    let removeMovingAverage = movingAverageLock ? 4 : 0;
    let removeWeightedAverage = weightedAverageLock ? 5 : 0;
    let removeLinearRegression = linearRegressionLock ? 6 : 0;

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
    let removeSalesHistory = salesHistoryLock ? color[1] : 0;
    let removeLastYear = lastYearLock ? color[2] : 0;
    let removeMovingAverage = movingAverageLock ? color[3] : 0;
    let removeWeightedAverage = weightedAverageLock ? color[4] : 0;
    let removeLinearRegression = linearRegressionLock ? color[5] : 0;

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
    dispatch(listGroupedData(startDate, endDate));
  }, [dispatch, startDate, endDate, color]);

  return (
    <div>
      <LineGraph data={filteredData()} color={filteredColor()} />
      <ShowHide onChange={(e) => onChange(e)} />
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
        showSalesHistory={salesHistoryLock ? 'none' : ''}
        showLastYear={lastYearLock ? 'none' : ''}
        showMovingAverage={movingAverageLock ? 'none' : ''}
        showWeightedAverage={weightedAverageLock ? 'none' : ''}
        showLinearRegression={linearRegressionLock ? 'none' : ''}
      />
    </div>
  );
};

export default Forecast;
