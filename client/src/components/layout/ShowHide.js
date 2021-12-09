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
    <div style={{ margin: ' -2.5vh 0 0 0.5vw' }}>
      <i onClick={() => onClick()} className='fas fa-cog'></i>
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
        showHideHoverText={props.showHideHoverText}
      />
    </div>
  );
};

export default ShowHide;
