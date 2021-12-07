import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  format,
  add,
  differenceInDays,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachYearOfInterval,
} from 'date-fns';

import { dateFormat } from '../data/formulas/dateFormulas.js';
import { rangeSalesData, minMaxSalesDates } from '../data/actions/salesDataActions.js';
import {
  listTimePeriod,
  deleteAllTimePeriod,
  createBulkTimePeriod,
} from '../data/actions/timePeriodActions.js';
import { listDataTypes } from '../data/actions/dataTypeActions.js';
import { createBulkGroupedData, deleteAllGroupedData } from '../data/actions/groupedDataActions.js';
import { listGdp } from '../data/actions/gdpActions.js';

import TimePeriodTypesList from '../layout/TimePeriodTypesList';
import DateSlider from '../layout/calendar/DateSlider';
import ForecastList from '../layout/ForecastList';
import ButtonHover from '../layout/ButtonHover';
import ChangeColors from '../layout/ChangeColors.js';

const ForecastSetup = () => {
  const dispatch = useDispatch();

  const pullFromState = useSelector((state) => state);
  const { startDate, endDate } = pullFromState.dates;
  const { movingPeriods, weightedPeriods } = pullFromState.periods;
  const { dataTypes } = pullFromState.dataTypes;
  const { timePeriod } = pullFromState.timePeriods;
  const { minDate, maxDate } = pullFromState.salesDateMinMax.salesData;
  const { current, previousYear } = pullFromState.salesDataRange.salesData;
  const { gdp } = pullFromState.gdp;

  const forecastForm = useRef();

  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const [dataSales, setDataSales] = useState([]);
  const [dataGdp, setDataGdp] = useState([]);

  const selectedTimePeriod = () => {
    let timePeriodList = forecastForm.current.children[2].children[0].children;
    let firstLetter;
    let id;

    for (let i = 0; i < timePeriodList.length; i++) {
      if (timePeriodList[i].classList.contains('selected')) {
        firstLetter = timePeriodList[i].children[0].innerText.toLowerCase().charAt(0);
        id = parseInt(timePeriodList[i].attributes.id.value);
      }
    }
    const interval = (firstLetter) => {
      let dateRange = { start: new Date(startDate), end: new Date(endDate) };
      switch (firstLetter) {
        case 'y':
          return eachYearOfInterval(dateRange);
        case 'q':
          return eachQuarterOfInterval(dateRange);
        case 'm':
          return eachMonthOfInterval(dateRange);
        case 'w':
          return eachWeekOfInterval(dateRange);
        default:
          return differenceInDays(new Date(endDate), new Date(startDate));
      }
    };

    let occurrences = interval(firstLetter).length;
    let dayEquivalent = Math.ceil(
      differenceInDays(new Date(endDate), new Date(startDate)) / occurrences
    );
    return { dayEquivalent, occurrences, firstLetter, id, startOn: interval(firstLetter) };
  };

  const onClick = () => {
    let timeVariables = selectedTimePeriod();

    gatherSalesData(timeVariables);
    gatherLastYear(timeVariables);
    calculateMovingAverage();
    calculateWeightedAverage();

    setDataGdp([]);

    let selectedGdp = gdp
      .filter((i) => {
        return (
          new Date(dateFormat(i.date)) >= new Date(startDate) &&
          new Date(dateFormat(i.date)) <= new Date(endDate)
        );
      })
      .sort((a, b) => {
        return new Date(dateFormat(a.date)) - new Date(dateFormat(b.date));
      });

    let j = timeVariables.firstLetter === 'y' ? 0 : -1;

    for (let i = 0; i < timeVariables.occurrences; i++) {
      let splitAmount = timeVariables.occurrences / selectedGdp.length;

      if (i % Math.floor(splitAmount) === 0) {
        if (j !== selectedGdp.length - 1) {
          j += 1;
        }
      }

      let gdpPerTimePeriod = selectedGdp[j].value / splitAmount;
      dataGdp.push(Math.floor(gdpPerTimePeriod * selectedGdp.length));
    }

    calculateLinearRegression(dataSales, dataGdp);

    const uniqueArr = [...new Set(data.map((i) => i.dataTypeId))];

    for (let i = 0; i < dataSales.length; i++) {
      let sum = 0;
      for (let j = 0; j < uniqueArr.length; j++) {
        sum += data.filter((i) => i.dataTypeId === uniqueArr[j])[i].data;
      }
      addToData(
        'ui',
        timePeriod[timePeriod.length - 1].id + (i + 1),
        Math.floor(sum / uniqueArr.length)
      );
    }

    dispatch(createBulkGroupedData(data));
  };

  const addToData = (abbreviation, timePeriodId, value) => {
    let dataTypeId = dataTypes.filter((i) => {
      return i.abbreviation === abbreviation;
    })[0].id;

    data.push({ dataTypeId, timePeriodId, data: parseInt(value) });
  };

  const gatherSalesData = (timeVariables) => {
    setDataSales([]);
    setData([]);

    dispatch(deleteAllTimePeriod());
    dispatch(deleteAllGroupedData());

    let timePeriodArr = [];

    for (let i = 0; i < timeVariables.occurrences; i++) {
      const timeUnit = (unit, date, amount) => {
        switch (unit) {
          case 'y':
            return add(date, { years: amount });
          case 'q':
            return add(date, { months: amount * 3 });
          case 'm':
            return add(date, { months: amount });
          case 'w':
            return add(date, { weeks: amount });
          case 'd':
            return add(date, { days: amount });
          default:
            return;
        }
      };

      let startDay = timeUnit(timeVariables.firstLetter, new Date(startDate), i);
      let stopOnDay =
        timeUnit('d', timeUnit(timeVariables.firstLetter, startDay, 1), -1) > new Date(endDate)
          ? new Date(endDate)
          : timeUnit('d', timeUnit(timeVariables.firstLetter, startDay, 1), -1);

      let timePeriodTotal = current.salesData
        .filter((i) => {
          let dateSelected = new Date(dateFormat(i.date));
          return dateSelected >= startDay && dateSelected < stopOnDay;
        })
        .reduce((a, b) => {
          return a + b.data;
        }, 0);

      timePeriodArr.push({
        groupName: timeVariables.firstLetter + (i + 1),
        startDate: format(startDay, 'yyyy-M-d'),
        endDate: format(stopOnDay, 'yyyy-M-d'),
        timePeriodTypeID: timeVariables.id,
      });

      addToData('sh', timePeriod[timePeriod.length - 1].id + (i + 1), timePeriodTotal);
      dataSales.push(timePeriodTotal);
    }

    dispatch(createBulkTimePeriod(timePeriodArr));
  };

  const gatherLastYear = (timeVariables) => {
    let arr = [];
    let pastStartDate = add(new Date(startDate), { years: -1 });
    let pastEndDate = add(new Date(endDate), { years: -1 });
    let totalDays = differenceInDays(new Date(pastEndDate), new Date(pastStartDate)) + 1;
    let timePeriodConversion = Math.ceil(totalDays / timeVariables.dayEquivalent);

    for (let i = 0; i < timePeriodConversion; i++) {
      let startDay = add(new Date(pastStartDate), { days: i * timeVariables.dayEquivalent });
      let stopOnDay =
        add(new Date(startDay), { days: timeVariables.dayEquivalent - 1 }) > pastEndDate
          ? pastEndDate
          : add(new Date(startDay), { days: timeVariables.dayEquivalent - 1 });

      let filteredData = previousYear.salesData.filter((i) => {
        let dateSelected = new Date(dateFormat(i.date));
        return dateSelected >= startDay && dateSelected <= stopOnDay;
      });

      let timePeriodTotal = filteredData.reduce((a, b) => {
        return a + b.data;
      }, 0);

      addToData('ly', timePeriod[timePeriod.length - 1].id + (i + 1), timePeriodTotal);

      arr.push(timePeriodTotal);
    }
  };

  const calculateMovingAverage = () => {
    let periods = parseInt(movingPeriods);

    for (let i = 0; i < periods - 1; i++) {
      addToData('ma', timePeriod[timePeriod.length - 1].id + (i + 1), 0);
    }

    for (let i = periods - 1; i < dataSales.length; i++) {
      let average = 0;
      for (let j = 0; j < periods; j++) {
        average += dataSales[i - j];
      }

      addToData(
        'ma',
        timePeriod[timePeriod.length - 1].id + (i + periods - 1),
        Math.round(average / periods)
      );
    }
  };

  const calculateWeightedAverage = () => {
    let periods = parseInt(weightedPeriods);
    for (let i = 0; i < periods - 1; i++) {
      addToData('wa', timePeriod[timePeriod.length - 1].id + (i + 1), 0);
    }

    for (let i = periods - 1; i < dataSales.length; i++) {
      let average = 0;
      let totalWeight = 0;
      for (let j = 0; j < periods; j++) {
        average += dataSales[i - j] * (periods - j);
        totalWeight += j + 1;
      }
      addToData(
        'wa',
        timePeriod[timePeriod.length - 1].id + (i + periods - 1),
        Math.round(average / totalWeight)
      );
    }
  };

  const calculateLinearRegression = (arr1, arr2) => {
    const linearRegression = (x, y) => {
      let lr = {};
      let n = y.length;
      let sumX = 0;
      let sumY = 0;
      let sumXY = 0;
      let sumXX = 0;
      let sumYY = 0;

      for (let i = 0; i < y.length; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumXX += x[i] * x[i];
        sumYY += y[i] * y[i];
      }

      lr['slope'] = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      lr['intercept'] = (sumY - lr.slope * sumX) / n;
      lr['r2'] = Math.pow(
        (n * sumXY - sumX * sumY) /
          Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY)),
        2
      );

      return lr;
    };

    let xVal = arr2.map((i) => {
      return parseFloat(i);
    });
    let yVal = arr1.map((i) => {
      return parseFloat(i);
    });

    let lr = linearRegression(xVal, yVal);
    let lrArr = [0];

    for (let i = 0; i < arr1.length; i++) {
      addToData(
        'lr',
        timePeriod[timePeriod.length - 1].id + (i + 1),
        Math.round(lr.intercept + arr1[i] * lr.slope)
      );
      lrArr.push(Math.round(lr.intercept + arr1[i] * lr.slope));
    }
  };

  useEffect(() => {
    if (load) {
      dispatch(rangeSalesData(startDate, endDate));
      dispatch(listTimePeriod());
      dispatch(minMaxSalesDates());
      dispatch(listDataTypes());
      dispatch(listGdp());
      setLoad(false);
    }
  }, [dispatch, load, startDate, endDate]);

  return (
    <div ref={forecastForm} action={'./'}>
      <ChangeColors colorsDisplay={'flex'} />

      <ForecastList />
      {minDate && maxDate && <DateSlider />}
      <TimePeriodTypesList />
      <ButtonHover onClick={(e) => onClick(e)} name={'Calculate'} />
    </div>
  );
};

export default ForecastSetup;
