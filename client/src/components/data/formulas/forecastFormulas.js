import { add, min, max, format, differenceInDays } from 'date-fns';
import { dateFormat } from './dateFormulas';

export const calculateForecasts = (
  timeVariables,
  startDate,
  endDate,
  salesDataArr,
  dataTypes,
  lastTimePeriodId,
  previousYear,
  movingPeriods,
  weightedPeriods,
  gdp
) => {
  let dataArr = [];
  const firstDate = min([new Date(startDate), new Date(endDate)]);
  const secondDate = max([new Date(startDate), new Date(endDate)]);

  let salesData = gatherSalesData(
    timeVariables,
    dataArr,
    firstDate,
    secondDate,
    salesDataArr,
    dataTypes,
    lastTimePeriodId
  );

  gatherLastYear(
    timeVariables,
    dataArr,
    firstDate,
    secondDate,
    lastTimePeriodId,
    previousYear,
    dataTypes
  );

  calculateMovingAverage(dataArr, movingPeriods, lastTimePeriodId, dataTypes);
  calculateWeightedAverage(dataArr, weightedPeriods, lastTimePeriodId, dataTypes);

  let gdpData = gdpSelected(timeVariables, gdp, firstDate, secondDate);
  let dataSales = dataArr.filter((i) => i.dataTypeId === 2);

  calculateLinearRegression(dataSales, gdpData.data, lastTimePeriodId, dataArr, dataTypes);
  userInputDefault(dataArr, dataSales, lastTimePeriodId, dataArr, dataTypes);

  return { data: dataArr, timePeriods: salesData.timePeriodArr };
};

const addToData = (dataTypeId, timePeriodId, value, dataArr) => {
  dataArr.push({ dataTypeId, timePeriodId, data: parseInt(value) });
};

const gatherSalesData = (
  timeVariables,
  dataArr,
  firstDate,
  secondDate,
  salesDataArr,
  dataTypes,
  lastTimePeriodId
) => {
  let dataSales = [];
  let timePeriodArr = [];

  let dataTypeId = dataTypes.filter((i) => {
    return i.abbreviation === 'sh';
  })[0].id;

  for (let i = 0; i < timeVariables.occurrences; i++) {
    const timeUnit = (unit, date, amount) => {
      switch (unit) {
        case 'Y':
        case 'y':
          return add(date, { years: amount });
        case 'Q':
        case 'q':
          return add(date, { months: amount * 3 });
        case 'M':
        case 'm':
          return add(date, { months: amount });
        case 'W':
        case 'w':
          return add(date, { weeks: amount });
        default:
          return add(date, { days: amount });
      }
    };

    let startDay =
      timeUnit(timeVariables.firstLetter, firstDate, i) > secondDate
        ? secondDate
        : timeUnit(timeVariables.firstLetter, firstDate, i);

    let stopOnDay =
      timeUnit('d', timeUnit(timeVariables.firstLetter, startDay, 1), -1) > secondDate
        ? secondDate
        : timeUnit('d', timeUnit(timeVariables.firstLetter, startDay, 1), -1);

    let timePeriodTotal = salesDataArr
      .filter((i) => {
        let dateSelected = new Date(dateFormat(i.date));
        return dateSelected >= startDay && dateSelected <= stopOnDay;
      })
      .reduce((a, b) => {
        return a + b.data;
      }, 0);

    timePeriodArr.push({
      groupName: timeVariables.firstLetter.toUpperCase() + (i + 1),
      startDate: format(startDay, 'yyyy-M-d'),
      endDate: format(stopOnDay, 'yyyy-M-d'),
      timePeriodTypeID: timeVariables.periodId,
    });

    addToData(dataTypeId, lastTimePeriodId + (i + 1), timePeriodTotal, dataArr);
    dataSales.push(timePeriodTotal);
  }

  return { timePeriodArr: timePeriodArr, data: dataArr };
};

const gatherLastYear = (
  timeVariables,
  dataArr,
  firstDate,
  secondDate,
  lastTimePeriodId,
  previousYear,
  dataTypes
) => {
  let arr = [];
  let pastStartDate = add(firstDate, { years: -1 });
  let pastEndDate = add(secondDate, { years: -1 });
  let totalDays = differenceInDays(new Date(pastEndDate), new Date(pastStartDate)) + 1;
  let timePeriodConversion = Math.ceil(totalDays / timeVariables.dayEquivalent);

  let dataTypeId = dataTypes.filter((i) => {
    return i.abbreviation === 'ly';
  })[0].id;

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

    addToData(dataTypeId, lastTimePeriodId + (i + 1), timePeriodTotal, dataArr);

    arr.push(timePeriodTotal);
  }

  return { data: dataArr };
};

const calculateMovingAverage = (dataArr, movingPeriods, lastTimePeriodId, dataTypes) => {
  let periods = parseInt(movingPeriods);

  let dataSales = dataArr.filter((i) => i.dataTypeId === 2);

  let dataTypeId = dataTypes.filter((i) => {
    return i.abbreviation === 'ma';
  })[0].id;

  for (let i = 0; i < periods; i++) {
    addToData(dataTypeId, lastTimePeriodId + (i + 1), 0, dataArr);
  }

  for (let i = periods - 1; i < dataSales.length; i++) {
    let average = 0;
    for (let j = 0; j < periods; j++) {
      average += dataSales[i - j].data;
    }

    addToData(dataTypeId, lastTimePeriodId + (i + 2), Math.round(average / periods), dataArr);
  }
};

const calculateWeightedAverage = (dataArr, weightedPeriods, lastTimePeriodId, dataTypes) => {
  let periods = parseInt(weightedPeriods);
  let dataSales = dataArr.filter((i) => i.dataTypeId === 2);

  let dataTypeId = dataTypes.filter((i) => {
    return i.abbreviation === 'wa';
  })[0].id;

  for (let i = 0; i < periods; i++) {
    addToData(dataTypeId, lastTimePeriodId + (i + 1), 0, dataArr);
  }

  for (let i = periods - 1; i < dataSales.length; i++) {
    let average = 0;
    let totalWeight = 0;
    for (let j = 0; j < periods; j++) {
      average += dataSales[i - j].data * (periods - j);
      totalWeight += j + 1;
    }
    addToData(dataTypeId, lastTimePeriodId + (i + 2), Math.round(average / totalWeight), dataArr);
  }
};

const gdpSelected = (timeVariables, gdp, firstDate, secondDate) => {
  let dataGdp = [];

  let selectedGdp = Array.from(gdp)
    .filter((i) => {
      return (
        new Date(dateFormat(i.date)) >= firstDate && new Date(dateFormat(i.date)) <= secondDate
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

  return { data: dataGdp };
};

const calculateLinearRegression = (arr1, arr2, lastTimePeriodId, dataArr, dataTypes) => {
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
      (n * sumXY - sumX * sumY) / Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY)),
      2
    );

    return lr;
  };

  let xVal = arr2.map((i) => {
    return parseFloat(i);
  });
  let yVal = arr1.map((i) => {
    return parseFloat(i.data);
  });

  let lr = linearRegression(xVal, yVal);
  let lrArr = [0];

  let dataTypeId = dataTypes.filter((i) => {
    return i.abbreviation === 'lr';
  })[0].id;

  for (let i = 0; i < arr1.length; i++) {
    addToData(
      dataTypeId,
      lastTimePeriodId + (i + 1),
      Math.round(lr.intercept + arr1[i].data * lr.slope),
      dataArr
    );
    lrArr.push(Math.round(lr.intercept + arr1[i].data * lr.slope));
  }
};

const userInputDefault = (data, dataSales, lastTimePeriodId, dataArr, dataTypes) => {
  const uniqueArr = [...new Set(data.map((i) => i.dataTypeId))];

  let dataTypeId = dataTypes.filter((i) => {
    return i.abbreviation === 'ui';
  })[0].id;

  for (let i = 0; i < dataSales.length; i++) {
    let sum = 0;
    for (let j = 0; j < uniqueArr.length; j++) {
      sum +=
        data.filter((i) => i.dataTypeId === uniqueArr[j])[i] === undefined
          ? 0
          : data.filter((i) => i.dataTypeId === uniqueArr[j])[i].data;
    }

    addToData(dataTypeId, lastTimePeriodId + (i + 1), Math.floor(sum / uniqueArr.length), dataArr);
  }
};
