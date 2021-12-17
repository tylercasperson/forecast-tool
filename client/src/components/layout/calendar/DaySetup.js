import React, { useEffect, useRef } from 'react';

const DaySetup = (props) => {
  const day = useRef();

  useEffect(() => {
    //   reset
    day.current.classList.remove('notThisMonth');
    day.current.classList.remove('lastMonth');
    day.current.classList.remove('nextMonth');
    day.current.classList.remove('selectedDate');
    day.current.classList.remove('throughDate');

    if (props.value !== undefined) {
      const setThroughStyle = (month, year) => {
        let datePassedIn = new Date(month + '/' + props.value + '/' + year);
        day.current.attributes.date.value = month + '/' + props.value + '/' + year;

        let start = new Date(props.startDate);
        let end = new Date(props.endDate);

        if (start > end) {
          if (datePassedIn > end && datePassedIn < start) {
            day.current.classList.add('throughDate');
          } else {
            day.current.classList.remove('throughDate');
          }
        } else {
          if (datePassedIn < end && datePassedIn > start) {
            day.current.classList.add('throughDate');
          } else {
            day.current.classList.remove('throughDate');
          }
        }
      };

      //   not this month
      if (day.current.parentElement.classList.contains('week1')) {
        if (props.value > 8) {
          day.current.classList.add('notThisMonth', 'lastMonth');
          if (props.month === 1) {
            setThroughStyle(12, props.year - 1);
          } else {
            setThroughStyle(props.month - 1, props.year);
          }
        } else {
          setThroughStyle(props.month, props.year);
        }
      } else if (day.current.parentElement.classList.contains('week5')) {
        if (props.value < 15) {
          day.current.classList.add('notThisMonth', 'nextMonth');
          if (props.month === 12) {
            setThroughStyle(1, props.year + 1);
          } else {
            setThroughStyle(props.month + 1, props.year);
          }
        } else {
          setThroughStyle(props.month, props.year);
        }
      } else if (day.current.parentElement.classList.contains('week6')) {
        if (props.value < 15) {
          day.current.classList.add('notThisMonth', 'nextMonth');
          if (props.month === 12) {
            setThroughStyle(1, props.year + 1);
          } else {
            setThroughStyle(props.month + 1, props.year);
          }
        } else {
          setThroughStyle(props.month, props.year);
        }
      } else {
        setThroughStyle(props.month, props.year);
      }

      //   select dates
      if (
        day.current.attributes.date.value === props.startDate ||
        day.current.attributes.date.value === props.endDate
      ) {
        day.current.classList.add('selectedDate');
      } else {
        if (props.value === props.daySelected) {
          if (!day.current.classList.contains('notThisMonth')) {
            let startMonth = Number(props.startDate.split('/')[0]);
            let startYear = Number(props.startDate.split('/')[2]);
            let endMonth = Number(props.endDate.split('/')[0]);
            let endYear = Number(props.endDate.split('/')[2]);

            if (
              (props.month === startMonth && props.year === startYear) ||
              (props.month === endMonth && props.year === endYear)
            ) {
              day.current.classList.add('selectedDate');
            }
          } else {
            day.current.classList.remove('selectedDate');
          }
        } else {
          day.current.classList.remove('selectedDate');
        }
      }
    }
  }, [props.daySelected, props.value, props.month, props.year, props.startDate, props.endDate]);

  return (
    <span
      className={'dayOfWeek'}
      style={{ width: '14%', border: 'none' }}
      date=''
      onClick={props.onClick}
      ref={day}
    >
      {props.value}
    </span>
  );
};

export default DaySetup;
