import React from 'react';

const CheckItem = (props) => {
  return (
    <div style={{ margin: '1vh', width: '15vw', textAlign: 'center' }}>
      <label style={{ cursor: 'pointer' }}>
        <input
          type='checkbox'
          style={{ display: 'none' }}
          name={props.name}
          onChange={props.onChange}
          checked={props.checked ? 'checked' : ''}
        />
        <span>{props.item}</span>
      </label>
    </div>
  );
};

export default CheckItem;
