import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { nest } from 'd3-collection';

import { dateFormat } from '../data/formulas/dateFormulas.js';
import { noCommas, numberWithCommas } from '../data/formulas/numberFormulas.js';
import {
  listGroupedData,
  updateGroupedData,
  deleteGroupedData,
} from '../data/actions/groupedDataActions.js';
import { listDataTypes } from '../data/actions/dataTypeActions.js';

import { GROUPED_DATA_UPDATE_RESET } from '../data/constants/groupedDataConstants.js';

import TableHeader from './TableHeader';
import TableRow from './TableRow';

const TableData = (props) => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { success } = getFromState.groupedDataUpdate;
  const { dataTypes } = getFromState.dataTypes;

  const [lock, setLock] = useState();

  const tableData = useRef();

  let data =
    props.data &&
    nest()
      .key((d) => d.timePeriod.groupName)
      .entries(props.data);

  const onChange = (e, arr) => {
    let dataTypeRecord = dataTypes.find((i) => {
      let nameParts = i.name.split(' ');
      return nameParts[0].toLowerCase() + nameParts[1] === e.target.name;
    });

    dispatch(
      updateGroupedData(
        arr[dataTypeRecord.id - 1].id,
        e.target.value,
        props.startDate,
        props.endDate
      )
    );

    arr[dataTypeRecord.id - 1].data = e.target.value;
  };

  const onDelete = (arr) => {
    localStorage.setItem('scrollPosition', tableData.current.scrollTop);

    arr.forEach((i) => {
      dispatch(deleteGroupedData(i.id));
    });

    dispatch(
      listGroupedData(
        format(new Date(props.startDate), 'yyyy-M-d'),
        format(new Date(props.endDate), 'yyyy-M-d')
      )
    );
  };

  useEffect(() => {
    tableData.current.scrollTop = localStorage.getItem('scrollPosition');

    dispatch(listDataTypes());

    if (success) {
      dispatch({ type: GROUPED_DATA_UPDATE_RESET });
      setLock(false);
    }
  }, [dispatch, success, lock]);

  return (
    <div
      style={{
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '-3px',
        fontSize: '1.5vw',
      }}
    >
      <TableHeader
        colors={props.colors}
        onChange={props.onChange}
        startDate={props.startDate}
        endDate={props.endDate}
        showSalesHistory={props.showSalesHistory}
        showLastYear={props.showLastYear}
        showMovingAverage={props.showMovingAverage}
        showWeightedAverage={props.showWeightedAverage}
        showLinearRegression={props.showLinearRegression}
        movingPeriod={props.movingPeriod}
        weightedPeriod={props.weightedPeriod}
      />
      <div style={{ height: '40vh', overflowY: 'auto' }} ref={tableData}>
        {data &&
          data.map((i, index) => {
            let findData = (something) => {
              let exists = i.values.find((o) => o.dataType.abbreviation === something);
              return exists === undefined || exists.data === null ? 0 : exists.data.toString();
            };
            let background = index % 2 !== 0 ? 'lightgrey' : 'none';
            return (
              <TableRow
                key={index}
                background={background}
                timePeriod={i.key}
                startDate={dateFormat(i.values[0].timePeriod.startDate)}
                endDate={dateFormat(i.values[0].timePeriod.endDate)}
                userInput={numberWithCommas(findData('ui'))}
                salesHistory={numberWithCommas(findData('sh'))}
                lastYear={numberWithCommas(findData('ly'))}
                weightedAverage={numberWithCommas(findData('wa'))}
                movingAverage={numberWithCommas(findData('ma'))}
                linearRegression={numberWithCommas(findData('lr'))}
                userInputFocus={() => noCommas(findData('ui'))}
                salesHistoryFocus={() => noCommas(findData('sh'))}
                lastYearFocus={() => noCommas(findData('ly'))}
                weightedAverageFocus={() => noCommas(findData('wa'))}
                movingAverageFocus={() => noCommas(findData('ma'))}
                linearRegressionFocus={() => noCommas(findData('lr'))}
                onChange={(e) => onChange(e, i.values)}
                delete={() => onDelete(i.values)}
                showSalesHistory={props.showSalesHistory}
                showLastYear={props.showLastYear}
                showMovingAverage={props.showMovingAverage}
                showWeightedAverage={props.showWeightedAverage}
                showLinearRegression={props.showLinearRegression}
              />
            );
          })}
      </div>
    </div>
  );
};

export default TableData;
