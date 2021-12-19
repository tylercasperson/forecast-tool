import React, { useState } from 'react';

const SalesHistoryRow = (props) => {
  const [value, setValue] = useState(props.value);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ display: 'flex', textAlign: 'center', padding: '1pt', fontSize: '1.8vmin' }}>
      <div style={{ width: '12vw' }}>{props.date}</div>
      <input
        style={{
          width: '12vw',
          fontSize: '1.8vmin',
        }}
        type='text'
        name={'value'}
        onChange={(e) => onChange(e)}
        onChangeCapture={props.onChange}
        value={value}
        onFocus={() => setValue(props.valueFocus)}
        onBlur={() => setValue(props.value)}
      />
      <div
        style={{
          width: '5vw',
        }}
        onClick={props.onDelete}
      >
        <i
          style={{
            margin: '2px',
          }}
          className='far fa-trash-alt'
        ></i>
      </div>
    </div>
  );
};

export default SalesHistoryRow;
