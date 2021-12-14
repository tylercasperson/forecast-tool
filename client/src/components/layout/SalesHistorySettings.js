import React, { useState } from 'react';

import ColorPicker from './ColorPicker';
import ToggleSwitch from './ToggleSwitch';
import ExportToExcel from './ExportToExcel';

const SalesHistorySettings = (props) => {
  const [display, setDisplay] = useState('none');

  const onClick = () => {
    if (display === 'none') {
      setDisplay('flex');
    } else {
      setDisplay('none');
    }
  };

  return (
    <div
      style={{
        width: '90vw',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        margin: ' -2.5vh 0 0 0.5vw',
      }}
    >
      <i
        style={{ display: 'flex', marginLeft: '5vw' }}
        onClick={() => onClick()}
        className='fas fa-cog'
      ></i>
      <div
        style={{
          height: '8vh',
          display: display,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          Change Color
          <ColorPicker text={'Sales History'} color={props.color} onChange={props.onChange} />
        </div>
        <ToggleSwitch
          label={props.showTimePeriodText}
          onChange={props.onChange}
          name={'showTimePeriod'}
          checked={props.showTimePeriod}
        />
        <ToggleSwitch
          label={'Hover Labels'}
          showHide={props.showHoverLabels ? 'Hide' : 'Show'}
          onChange={props.onChange}
          name={'showHideHoverLabels'}
          checked={props.showHoverLabels}
        />
        <ExportToExcel option={'salesData'} />
      </div>
    </div>
  );
};

export default SalesHistorySettings;
