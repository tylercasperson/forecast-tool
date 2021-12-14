import React from 'react';

import { dateFormat } from '../data/formulas/dateFormulas.js';

import SalesHistoryHeader from './SalesHistoryHeader.js';
import SalesHistoryRow from './SalesHistoryRow';

const SalesHistoryTable = (props) => {
  return (
    <div style={{ alignSelf: 'center' }}>
      <SalesHistoryHeader />
      <div style={{ overflowY: 'scroll', height: '50vh' }}>
        {props.array &&
          props.array.map((i, index) => (
            <SalesHistoryRow
              key={i.id}
              date={dateFormat(i.date)}
              value={i.data}
              background={index % 2 !== 0 ? 'lightgrey' : 'none'}
            />
          ))}
      </div>
    </div>
  );
};

export default SalesHistoryTable;
