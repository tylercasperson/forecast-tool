import React, { useState } from 'react';

const SalesHistoryRow = (props) => {
  const [value, setValue] = useState(props.value);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ display: 'flex', textAlign: 'center', padding: '1pt' }}>
      <div style={{ backgroundColor: props.background, width: '12vw' }}>{props.date}</div>
      <input
        style={{
          width: '12vw',
          backgroundColor: props.background,
          fontSize: '1.7vmin',
        }}
        type='text'
        name={'value'}
        onChange={(e) => onChange(e)}
        value={value}
      />
      <div
        style={{
          width: '5vw',
          backgroundColor: props.background,
        }}
        onClick={props.onDelete}
      >
        <i
          style={{
            fontSize: '0.7rem',
            margin: '2px',
          }}
          className='far fa-trash-alt'
        ></i>
      </div>
    </div>
  );
};

export default SalesHistoryRow;
