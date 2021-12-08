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

import LineChart from '../layout/LineChart';
import TableData from '../layout/TableData';
import ShowHide from '../layout/ShowHide';
import ChangeColors from '../layout/ChangeColors';

const Forecast = () => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { groupedData } = getFromState.groupedData;
  const { startDate, endDate } = getFromState.dates;
  const { movingPeriods, weightedPeriods } = getFromState.periods;

  const { colors } = getFromState.colors;
  const {
    showSalesHistory,
    showLastYear,
    showMovingAverage,
    showWeightedAverage,
    showLinearRegression,
  } = getFromState.showForecast;

  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [colorsDisplay, setColorsDisplay] = useState('none');
  const [toggleHoverText, setToggleHoverText] = useState('Hide Hover Laebls');

  const onChange = (e) => {
    console.log(e);
    let month = e.target.value.split('/')[0];
    let day = e.target.value.split('/')[1];
    let year = e.target.value.split('/')[2];

    switch (e.target.name) {
      case 'startDate':
        setTempStartDate(e.target.value);
        if (month > 0 && month < 13) {
          if (day > 0 && day < 32) {
            if (year > 0 && year < 9999) {
              dispatch(saveStartDate(e.target.value));
            }
          }
        }
        break;
      case 'endDate':
        setTempEndDate(e.target.value);
        if (month > 0 && month < 13) {
          if (day > 0 && day < 32) {
            if (year > 0 && year < 9999) {
              dispatch(saveEndDate(e.target.value));
            }
          }
        }
        break;
      case 'showHideHoverLabels':
        if (toggleHoverText.split(' ')[0] === 'Show') {
          setToggleHoverText('Hide Hover Labels');
        } else {
          setToggleHoverText('Show Hover Labels');
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
    let removeSalesHistory = showSalesHistory ? 0 : colors[0];
    let removeLastYear = showLastYear ? 0 : colors[1];
    let removeMovingAverage = showMovingAverage ? 0 : colors[2];
    let removeWeightedAverage = showWeightedAverage ? 0 : colors[3];
    let removeLinearRegression = showLinearRegression ? 0 : colors[4];

    return colors.filter(
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
    <div style={{ height: '92vh' }}>
      {groupedData && (
        <LineChart
          data={filteredData()}
          colors={filteredColor()}
          showHoverLabels={toggleHoverText.split(' ')[0] === 'Show' ? false : true}
        />
      )}
      <ShowHide
        onChange={(e) => onChange(e)}
        showSalesHistory={showSalesHistory}
        showLastYear={showLastYear}
        showMovingAverage={showMovingAverage}
        showWeightedAverage={showWeightedAverage}
        showLinearRegression={showLinearRegression}
        changeColors={() =>
          colorsDisplay === 'none' ? setColorsDisplay('flex') : setColorsDisplay('none')
        }
        showChangeColors={colorsDisplay === 'none' ? '' : 'checked'}
        showHoverLabels={toggleHoverText.split(' ')[0] === 'Show' ? '' : 'checked'}
        showHideHoverText={toggleHoverText}
      />

      <ChangeColors colorsDisplay={colorsDisplay} />

      {groupedData.length > 0 && (
        <TableData
          startDate={tempStartDate}
          endDate={tempEndDate}
          data={groupedData}
          colors={colors}
          onChange={(e) => onChange(e)}
          showSalesHistory={showSalesHistory ? '' : 'none'}
          showLastYear={showLastYear ? '' : 'none'}
          showMovingAverage={showMovingAverage ? '' : 'none'}
          showWeightedAverage={showWeightedAverage ? '' : 'none'}
          showLinearRegression={showLinearRegression ? '' : 'none'}
          movingPeriod={
            movingPeriods + ' ' + groupedData[0].timePeriod.timePeriodType.type.toLowerCase()
          }
          weightedPeriod={
            weightedPeriods + ' ' + groupedData[0].timePeriod.timePeriodType.type.toLowerCase()
          }
        />
      )}
    </div>
  );
};

export default Forecast;
