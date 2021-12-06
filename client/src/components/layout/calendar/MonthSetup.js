import React, { useEffect, useRef, useState } from 'react';
import {
  monthList,
  daysPerMonth,
  monthCode,
  centuryCode,
  digityearCode,
} from '../../data/formulas/dateFormulas.js';
import WeekLineUp from './WeekSetup';

const MonthSetup = (props) => {
  const dateSection = useRef();

  const [days, setDays] = useState([]);
  const monthName =
    monthList[props.dateSelected.split('/')[0] - 1] === undefined
      ? ''
      : monthList[props.dateSelected.split('/')[0] - 1];
  const yearUsed =
    props.dateSelected.split('/')[2] === undefined ? '' : props.dateSelected.split('/')[2];

  const calculateDayOfWeek = (date) => {
    let arr = [];
    let dateParts = date.split('/');
    let month = dateParts[0];
    let day = dateParts[1];
    let yearParts = dateParts[2].split('');
    let century = yearParts[0] + yearParts[1] + 0 + 0;
    let yearDigit = yearParts[2] + yearParts[3];
    let leapYearCheck = yearDigit % 4 === 0;
    let centenialCheck = yearDigit === '00' && century % 400 === 0;
    let leapYear = leapYearCheck || centenialCheck ? true : false;
    let JanuaryFebruary = month === '1' || month === '2' ? true : false;
    let leapYearAdjust = leapYear && JanuaryFebruary ? -1 : 0;
    let codeForMonth = monthCode[monthList[month - 1]] + leapYearAdjust;
    let calc1 = codeForMonth + parseInt(day);
    arr.push(calc1);
    arr.push(centuryCode[century]);
    for (const key in digityearCode) {
      if (digityearCode[key].includes(yearDigit)) {
        arr.push(key);
      }
    }
    let dayArrIndex = arr.reduce((a, b) => parseInt(a) + parseInt(b));

    return dayArrIndex > 7 ? dayArrIndex % 7 : dayArrIndex;
  };

  useEffect(() => {
    let daysArr = [];

    let monthSelected =
      props.dateSelected.split('/')[0] === '' ? 1 : parseInt(props.dateSelected.split('/')[0]);
    let yearSelected =
      props.dateSelected.split('/')[2] === '' ? 2020 : parseInt(props.dateSelected.split('/')[2]);
    let lastMonth = monthSelected === 1 ? 11 : monthSelected - 1 - 1;
    let startOfMonth = calculateDayOfWeek(monthSelected + '/' + 1 + '/' + yearSelected);
    let seperatedYear = yearSelected.toString().split('');
    let century = seperatedYear[0] + seperatedYear[1];
    let yearDigit = seperatedYear[2] + seperatedYear[3];
    let leapYearCheck = yearDigit % 4 === 0;
    let centenialCheck = yearDigit === '00' && century % 400 === 0;
    let lastMonthDays =
      lastMonth === 1 && (leapYearCheck || centenialCheck)
        ? daysPerMonth['FebruaryLeapYear']
        : daysPerMonth[monthList[lastMonth]];

    for (let i = startOfMonth - 1; i > -1; i--) {
      daysArr.push(lastMonthDays[lastMonthDays.length - 1 - i]);
    }

    let currentMonth =
      (leapYearCheck || centenialCheck) && monthSelected === 2
        ? 'FebruaryLeapYear'
        : monthList[monthSelected - 1];

    let currentMonthDays = daysPerMonth[currentMonth];

    currentMonthDays.forEach((i) => {
      return daysArr.push(i);
    });

    let daysInNextMonth = 42 - daysArr.length;

    for (let i = 0; i < daysInNextMonth; i++) {
      daysArr.push(i + 1);
    }
    setDays(daysArr);
  }, [props.dateSelected]);

  return (
    <div
      style={{ border: '1pt solid black', width: '20vw', textAlign: 'center' }}
      ref={dateSection}
    >
      <div
        className={'monthYear ' + props.type}
        style={{ margin: '5%', fontWeight: 'bold', fontSize: '90%', width: '20vw' }}
      >
        <i
          className='fas fa-arrow-left'
          style={{ padding: '0 1vw' }}
          onClick={props.previousMonth}
        ></i>

        {monthName + ' ' + yearUsed}
        <i
          className='fas fa-arrow-right'
          style={{ padding: '0 1vw' }}
          onClick={props.nextMonth}
        ></i>
      </div>
      <div className='dayAbbreviation' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>

      <div className='calendarDays' style={{ width: '100%', borderTop: '2pt solid black' }}>
        <WeekLineUp
          name='week1'
          sunday={days[0]}
          monday={days[1]}
          tuesday={days[2]}
          wednesday={days[3]}
          thursday={days[4]}
          friday={days[5]}
          saturday={days[6]}
          daySelected={parseInt(props.dateSelected.split('/')[1])}
          month={parseInt(props.dateSelected.split('/')[0])}
          year={parseInt(props.dateSelected.split('/')[2])}
          onClick={props.onClick}
          startDate={props.startDate}
          endDate={props.endDate}
        />
        <WeekLineUp
          name='week2'
          sunday={days[7]}
          monday={days[8]}
          tuesday={days[9]}
          wednesday={days[10]}
          thursday={days[11]}
          friday={days[12]}
          saturday={days[13]}
          daySelected={parseInt(props.dateSelected.split('/')[1])}
          month={parseInt(props.dateSelected.split('/')[0])}
          year={parseInt(props.dateSelected.split('/')[2])}
          onClick={props.onClick}
          startDate={props.startDate}
          endDate={props.endDate}
        />
        <WeekLineUp
          name='week3'
          sunday={days[14]}
          monday={days[15]}
          tuesday={days[16]}
          wednesday={days[17]}
          thursday={days[18]}
          friday={days[19]}
          saturday={days[20]}
          daySelected={parseInt(props.dateSelected.split('/')[1])}
          month={parseInt(props.dateSelected.split('/')[0])}
          year={parseInt(props.dateSelected.split('/')[2])}
          onClick={props.onClick}
          startDate={props.startDate}
          endDate={props.endDate}
        />
        <WeekLineUp
          name='week4'
          sunday={days[21]}
          monday={days[22]}
          tuesday={days[23]}
          wednesday={days[24]}
          thursday={days[25]}
          friday={days[26]}
          saturday={days[27]}
          daySelected={parseInt(props.dateSelected.split('/')[1])}
          month={parseInt(props.dateSelected.split('/')[0])}
          year={parseInt(props.dateSelected.split('/')[2])}
          onClick={props.onClick}
          startDate={props.startDate}
          endDate={props.endDate}
        />
        <WeekLineUp
          name='week5'
          sunday={days[28]}
          monday={days[29]}
          tuesday={days[30]}
          wednesday={days[31]}
          thursday={days[32]}
          friday={days[33]}
          saturday={days[34]}
          daySelected={parseInt(props.dateSelected.split('/')[1])}
          month={parseInt(props.dateSelected.split('/')[0])}
          year={parseInt(props.dateSelected.split('/')[2])}
          onClick={props.onClick}
          startDate={props.startDate}
          endDate={props.endDate}
        />
        <WeekLineUp
          name='week6'
          sunday={days[35]}
          monday={days[36]}
          tuesday={days[37]}
          wednesday={days[38]}
          thursday={days[39]}
          friday={days[40]}
          saturday={days[41]}
          daySelected={parseInt(props.dateSelected.split('/')[1])}
          month={parseInt(props.dateSelected.split('/')[0])}
          year={parseInt(props.dateSelected.split('/')[2])}
          onClick={props.onClick}
          startDate={props.startDate}
          endDate={props.endDate}
        />
      </div>
    </div>
  );
};

export default MonthSetup;
