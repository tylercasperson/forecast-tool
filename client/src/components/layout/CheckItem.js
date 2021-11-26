import React from 'react';

const CheckItem = (props) => {
  return (
    <div style={{ margin: '1vh' }}>
      <label style={{ cursor: 'pointer' }}>
        <input type='checkbox' style={{ display: 'none' }} name={props.name} />
        <span>{props.item}</span>
      </label>
    </div>
  );
};

export default CheckItem;
