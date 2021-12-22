import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, add } from 'date-fns';

import { listSalesData } from '../data/actions/salesDataActions.js';
import { listGroupedData } from '../data/actions/groupedDataActions.js';
import { saveStartDate, saveEndDate } from '../data/actions/settingsActions.js';

import LineChart from '../layout/LineChart';
import SalesHistorySettings from '../layout/SalesHistorySettings.js';
import SalesHistoryModifying from '../layout/SalesHistoryModifying.js';
import SalesHistoryTable from '../layout/SalesHistoryTable';

const SalesHistory = () => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { salesData } = getFromState.salesData;
  const { groupedData } = getFromState.groupedData;
  const { colors } = getFromState.colors;
  const { startDate, endDate } = getFromState.dates;

  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [showHoverText, setShowHoverText] = useState(true);
  const [showTimePeriod, setShowTimePeriod] = useState(true);
  const [showTimePeriodText, setShowTimePeriodText] = useState('Show Dates');
  const [lock, setLock] = useState(true);

  const onChange = (e) => {
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
      case 'showTimePeriod':
        showTimePeriod ? setShowTimePeriod(false) : setShowTimePeriod(true);
        showTimePeriod
          ? setShowTimePeriodText('Show Time Period')
          : setShowTimePeriodText('Show Dates');

        break;
      case 'showHideHoverLabels':
        showHoverText ? setShowHoverText(false) : setShowHoverText(true);
        break;
      default:
        return;
    }
  };

  const justSalesData = () => {
    return groupedData.filter((data) => data.dataTypeId === 2);
  };

  const onClick = () => {
    setLock(true);
  };

  useEffect(() => {
    if (lock) {
      dispatch(
        listSalesData(
          format(add(new Date(startDate), { days: -1 }), 'yyyy-M-d'),
          format(add(new Date(endDate), { days: 1 }), 'yyyy-M-d')
        )
      );
      dispatch(
        listGroupedData(
          format(add(new Date(startDate), { days: -1 }), 'yyyy-M-d'),
          format(add(new Date(endDate), { days: 1 }), 'yyyy-M-d')
        )
      );
    }
  }, [dispatch, startDate, endDate, lock]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {groupedData && (
        <LineChart
          data={justSalesData()}
          colors={[colors[1], colors[1]]}
          showHoverLabels={showHoverText}
          xLabelOption={showTimePeriod}
        />
      )}
      <SalesHistorySettings
        color={colors[1]}
        showTimePeriod={showTimePeriod ? 'checked' : ''}
        showHoverLabels={showHoverText ? 'checked' : ''}
        showTimePeriodText={showTimePeriodText}
        onChange={(e) => onChange(e)}
      />
      <SalesHistoryModifying
        startDate={tempStartDate}
        endDate={tempEndDate}
        onChange={() => onChange()}
        onClick={() => onClick()}
      />
      <SalesHistoryTable array={salesData} />
    </div>
  );
};

export default SalesHistory;
