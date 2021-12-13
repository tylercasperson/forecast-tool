import React, { useState } from 'react';
import ChartOptions from './ChartOptions';

const ShowHide = (props) => {
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
      <ChartOptions
        display={display}
        onChange={props.onChange}
        showSalesHistory={props.showSalesHistory}
        showLastYear={props.showLastYear}
        showMovingAverage={props.showMovingAverage}
        showWeightedAverage={props.showWeightedAverage}
        showLinearRegression={props.showLinearRegression}
        changeColors={props.changeColors}
        showChangeColors={props.showChangeColors}
        showHoverLabels={props.showHoverLabels}
        showTimePeriodText={props.showTimePeriodText}
        showTimePeriod={props.showTimePeriod}
      />
    </div>
  );
};

export default ShowHide;
