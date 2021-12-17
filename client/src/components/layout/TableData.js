import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { nest } from 'd3-collection';
import {
  listGroupedData,
  updateGroupedData,
  deleteGroupedData,
} from '../data/actions/groupedDataActions.js';
import { numberWithCommas } from '../data/formulas/numberFormulas.js';

import { GROUPED_DATA_UPDATE_RESET } from '../data/constants/groupedDataConstants.js';

import TableHeader from './TableHeader';
import TableRow from './TableRow';

const TableData = (props) => {
  const dispatch = useDispatch();

  const groupedDataUpdate = useSelector((state) => state.groupedDataUpdate);
  const { success } = groupedDataUpdate;

  const [lock, setLock] = useState();

  const tableData = useRef();

  let data =
    props.data &&
    nest()
      .key((d) => d.timePeriod.groupName)
      .entries(props.data);

  const dateFormat = (date) => {
    let dateParts = date.split('T')[0].split('-');
    let month = dateParts[1][0] === '0' ? dateParts[1][1] : dateParts[1];
    let day = dateParts[2][0] === '0' ? dateParts[2][1] : dateParts[2];
    let year = dateParts[0];

    return month + '/' + day + '/' + year;
  };

  const dataTypes = {
    userInput: 1,
    salesHistory: 2,
    lastYear: 3,
    ma: 4,
    wa: 5,
    linearRegression: 6,
  };

  const onChange = (e, arr) => {
    dispatch(
      updateGroupedData(
        arr[dataTypes[e.target.name] - 1].id,
        e.target.value,
        props.startDate,
        props.endDate
      )
    );

    arr[dataTypes[e.target.name] - 1].data = e.target.value;
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
              return exists === undefined ? 0 : numberWithCommas(exists.data);
            };
            let background = index % 2 !== 0 ? 'lightgrey' : 'none';
            return (
              <TableRow
                key={index}
                background={background}
                timePeriod={i.key}
                startDate={dateFormat(i.values[0].timePeriod.startDate)}
                endDate={dateFormat(i.values[0].timePeriod.endDate)}
                salesHistory={findData('sh')}
                userInput={findData('ui')}
                lastYear={findData('ly')}
                weightedAverage={findData('wa')}
                movingAverage={findData('ma')}
                linearRegression={findData('lr')}
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
