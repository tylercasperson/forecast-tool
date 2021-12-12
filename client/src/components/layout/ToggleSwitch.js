import React from 'react';

const ToggleSwitch = (props) => {
  return (
    <div
      className='toggleSwitch'
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '10vw',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '1.6vmin',
      }}
    >
      {props.showHide} {props.label}
      <label>
        <input
          className='toggleSwitchInput'
          type='checkbox'
          name={props.name}
          onChange={props.onChange}
          checked={props.checked ? '' : 'checked'}
        />
        <span className='check'></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
