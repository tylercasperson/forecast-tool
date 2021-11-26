import React from 'react';
import DaySetup from './DaySetup';

const WeekLineUp = (props) => {
  return (
    <div
      className={'week ' + props.name}
      style={{ display: 'flex', justifyContent: 'space-between', margin: '1px' }}
    >
      <DaySetup
        value={props.sunday}
        daySelected={props.daySelected}
        month={props.month}
        year={props.year}
        onClick={props.onClick}
        startDate={props.startDate}
        endDate={props.endDate}
      />
      <DaySetup
        value={props.monday}
        daySelected={props.daySelected}
        month={props.month}
        year={props.year}
        onClick={props.onClick}
        startDate={props.startDate}
        endDate={props.endDate}
      />
      <DaySetup
        value={props.tuesday}
        daySelected={props.daySelected}
        month={props.month}
        year={props.year}
        onClick={props.onClick}
        startDate={props.startDate}
        endDate={props.endDate}
      />
      <DaySetup
        value={props.wednesday}
        daySelected={props.daySelected}
        month={props.month}
        year={props.year}
        onClick={props.onClick}
        startDate={props.startDate}
        endDate={props.endDate}
      />
      <DaySetup
        value={props.thursday}
        daySelected={props.daySelected}
        month={props.month}
        year={props.year}
        onClick={props.onClick}
        startDate={props.startDate}
        endDate={props.endDate}
      />
      <DaySetup
        value={props.friday}
        daySelected={props.daySelected}
        month={props.month}
        year={props.year}
        onClick={props.onClick}
        startDate={props.startDate}
        endDate={props.endDate}
      />
      <DaySetup
        value={props.saturday}
        daySelected={props.daySelected}
        month={props.month}
        year={props.year}
        onClick={props.onClick}
        startDate={props.startDate}
        endDate={props.endDate}
      />
    </div>
  );
};

export default WeekLineUp;
