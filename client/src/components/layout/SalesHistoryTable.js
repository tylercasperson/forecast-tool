import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { dateFormat } from '../data/formulas/dateFormulas.js';
import { numberWithCommas, noCommas } from '../data/formulas/numberFormulas.js';
import {
  listSalesData,
  deleteSalesData,
  updateSalesData,
} from '../data/actions/salesDataActions.js';

import SalesHistoryHeader from './SalesHistoryHeader.js';
import SalesHistoryRow from './SalesHistoryRow';

const SalesHistoryTable = (props) => {
  const dispatch = useDispatch();

  const [lock, setLock] = useState(true);

  const onChange = (id, data) => {
    dispatch(updateSalesData(id, data));
  };

  const onDelete = (id) => {
    dispatch(deleteSalesData(id));
    setLock(true);
  };

  useEffect(() => {
    if (lock) {
      dispatch(listSalesData());
      setLock(false);
    }
  }, [dispatch, lock]);

  return (
    <div style={{ alignSelf: 'center' }}>
      <SalesHistoryHeader />
      <div style={{ overflowY: 'scroll', height: '50vh' }}>
        {props.array &&
          props.array.map((i, index) => (
            <SalesHistoryRow
              key={i.id}
              onChange={(e) => onChange(i.id, e.target.value)}
              onDelete={() => onDelete(i.id)}
              date={dateFormat(i.date)}
              value={numberWithCommas(i.data)}
              background={index % 2 !== 0 ? 'lightgrey' : 'none'}
            />
          ))}
      </div>
    </div>
  );
};

export default SalesHistoryTable;
