import React from 'react';

const DataCell = (props) => {
  return (
    <td>
      <input
        type='number'
        name={'data'}
        onChange={props.onChange}
        value={props.data}
      />
    </td>
  );
};

export default DataCell;
