import React from 'react';

const Filter = (props) => {
  return (
    <div>
      <input
        type='text'
        name='startDate'
        onChange={props.onChange}
        value={props.startDate}
      />
      <input
        type='text'
        name='endDate'
        onChange={props.onChange}
        value={props.endDate}
      />
    </div>
  );
};

export default Filter;
