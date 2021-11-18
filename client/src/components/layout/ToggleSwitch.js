import React from 'react';

const ToggleSwitch = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        marginRight: 'auto',
        marginLeft: 'auto',
      }}
    >
      <div
        style={{
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {props.label}
        <label>
          <input
            className='toggleSwitchInput'
            type='checkbox'
            name={props.name}
            onChange={props.onChange}
          />
          <span className='check'></span>
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
