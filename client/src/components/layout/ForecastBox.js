import React, { useState } from 'react';

const ForecastBox = (props) => {
  const [value, setValue] = useState(3);
  const [numberWidth, setNumberWidth] = useState('1vw');

  const onChange = (e) => {
    console.log(e);
    setValue(e.target.value);
    if (e.target.value.length === 2) {
      setNumberWidth('1.8vw');
    } else {
      setNumberWidth('1vw');
    }
  };

  return (
    <div className='forecastBox' style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'inline-block',
          textAlign: 'center',
          width: '17vw',
          border: '1pt solid black',
        }}
      >
        <input
          type='text'
          style={{
            fontSize: '1.5vw',
            width: numberWidth,
          }}
          name='numberInput'
          value={value}
          onChange={(e) => onChange(e)}
        />
        <label style={{ fontSize: '1.5vw', marginLeft: '0.2vw' }} htmlFor='numberInput'>
          time periods will be {props.type} together.
        </label>
      </div>
      <input
        type='range'
        style={{ width: '80%', alignSelf: 'center', marginTop: '2vh' }}
        value={value}
        step={1}
        min={2}
        max={10}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default ForecastBox;
