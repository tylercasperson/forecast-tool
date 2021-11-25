import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nest } from 'd3-collection';
import {
  listGroupedData,
  updateGroupedData,
  deleteGroupedData,
} from '../data/actions/groupedDataActions.js';
import { GROUPED_DATA_UPDATE_RESET } from '../data/constants/groupedDataConstants.js';

import TableHeader from './TableHeader';
import TableRow from './TableRow';

const TableData = (props) => {
  const dispatch = useDispatch();

  const groupedDataList = useSelector((state) => state.groupedData);
  const { groupedData } = groupedDataList;

  const groupedDataUpdate = useSelector((state) => state.groupedDataUpdate);
  const { success } = groupedDataUpdate;

  const groupedDataDelete = useSelector((state) => state.groupedDataDelete);

  let data = nest()
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
    m3ma: 4,
    m3wa: 5,
    linearRegression: 6,
  };

  const onChange = (e, arr) => {
    console.log(arr);

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
    arr.forEach((i) => {
      dispatch(deleteGroupedData(i.id));
    });

    let startDay = props.startYear + '-' + props.startMonth + '-' + props.startDay;
    let endDay = props.endYear + '-' + props.endMonth + '-' + props.endDay;

    dispatch(listGroupedData(startDay, endDay));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: GROUPED_DATA_UPDATE_RESET });
    }
  }, [dispatch, success]);

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
        color={props.color}
        onChange={props.onChange}
        startDate={props.startDate}
        endDate={props.endDate}
        showSalesHistory={props.showSalesHistory}
        showLastYear={props.showLastYear}
        showMovingAverage={props.showMovingAverage}
        showWeightedAverage={props.showWeightedAverage}
        showLinearRegression={props.showLinearRegression}
      />
      <div style={{ height: '40vh', overflowY: 'auto' }}>
        {data.map((i, index) => {
          let findData = (something) => {
            let exists = i.values.find((o) => o.dataType.abbreviation === something);
            return exists === undefined ? 0 : exists.data;
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
              m3wa={findData('w3ma')}
              m3ma={findData('m3ma')}
              linearRegression={findData('lr')}
              onChange={(e) => onChange(e, i.values)}
              delete={(e) => onDelete(i.values)}
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
