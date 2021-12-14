import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import { listSalesData } from '../data/actions/salesDataActions.js';
import { listGroupedData } from '../data/actions/groupedDataActions.js';

import LineChart from '../layout/LineChart';
import SalesHistoryTable from '../layout/SalesHistoryTable';

const SalesHistory = () => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { salesData } = getFromState.salesData;
  const { groupedData } = getFromState.groupedData;
  const { colors } = getFromState.colors;
  const { startDate, endDate } = getFromState.dates;

  useEffect(() => {
    dispatch(listSalesData());
    dispatch(
      listGroupedData(
        format(new Date(startDate), 'yyyy-M-d'),
        format(new Date(endDate), 'yyyy-M-d')
      )
    );
  }, [dispatch, startDate, endDate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {salesData && (
        <LineChart
          data={groupedData && groupedData.filter((data) => data.dataTypeId === 2)}
          colors={[colors[1], 'white']}
          showHoverLabels={false}
          xLabelOption={false}
        />
      )}
      <SalesHistoryTable array={salesData} />
    </div>
  );
};

export default SalesHistory;
