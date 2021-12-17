import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dateFormat } from '../data/formulas/dateFormulas.js';
import { numberWithCommas, noCommas } from '../data/formulas/numberFormulas.js';
import { deleteSalesData, updateSalesData } from '../data/actions/salesDataActions.js';
import { SALES_DATA_UPDATE_RESET } from '../data/constants/salesDataConstants.js';
import { updateGroupedData } from '../data/actions/groupedDataActions.js';
import { GROUPED_DATA_UPDATE_RESET } from '../data/constants/groupedDataConstants.js';

import SalesHistoryHeader from './SalesHistoryHeader.js';
import SalesHistoryRow from './SalesHistoryRow';

const SalesHistoryTable = (props) => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { groupedData } = getFromState.groupedData;
  const { salesData } = getFromState.salesData;
  const { success: salesUpdateSuccess } = getFromState.salesDataUpdate;
  const { success: groupedDataUpdateSuccess } = getFromState.groupedDataUpdate;

  const salesTable = useRef();

  const [deletedRecords] = useState([]);

  const groupedDataUpdate = (arr, data) => {
    let salesDate = new Date(dateFormat(salesData.filter((i) => i.id === arr.id)[0].date));
    let dataPoint = groupedData
      .filter(
        (i) =>
          new Date(dateFormat(i.timePeriod.startDate)) <= salesDate &&
          new Date(dateFormat(i.timePeriod.endDate)) >= salesDate
      )
      .filter((j) => j.dataTypeId === 2)[0];
    let total = parseInt(dataPoint.data) - parseInt(arr.data) + parseInt(noCommas(data));

    dispatch(updateGroupedData(dataPoint.id, total));

    dataPoint.data = total;
  };

  const onChange = (arr, data) => {
    let incommingData = noCommas(data);

    groupedDataUpdate(arr, incommingData);
    dispatch(updateSalesData(arr.id, incommingData));

    arr.data = parseInt(incommingData);
  };

  const onDelete = (arr) => {
    deletedRecords.push(arr.id);
    groupedDataUpdate(arr, '0');
    dispatch(deleteSalesData(arr.id));
  };

  useEffect(() => {
    if (salesUpdateSuccess) {
      dispatch({ type: SALES_DATA_UPDATE_RESET });
    }
    if (groupedDataUpdateSuccess) {
      dispatch({ type: GROUPED_DATA_UPDATE_RESET });
    }
  }, [dispatch, salesUpdateSuccess, groupedDataUpdateSuccess]);

  return (
    <div style={{ alignSelf: 'center' }}>
      <SalesHistoryHeader />
      <div style={{ overflowY: 'scroll', height: '50vh' }} className='salesTable' ref={salesTable}>
        {props.array &&
          props.array
            .filter((j) => !deletedRecords.includes(j.id))
            .map((i) => {
              return (
                <SalesHistoryRow
                  key={i.id}
                  onChange={(e) => onChange(i, e.target.value)}
                  onDelete={() => onDelete(i)}
                  date={dateFormat(i.date)}
                  value={numberWithCommas(i.data)}
                  valueFocus={noCommas(i.data.toString())}
                />
              );
            })}
      </div>
    </div>
  );
};

export default SalesHistoryTable;
