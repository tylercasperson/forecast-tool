import React from 'react';
import { useSelector } from 'react-redux';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { nest } from 'd3-collection';

const ExportToExcel = () => {
  const getFromState = useSelector((state) => state);
  const { groupedData } = getFromState.groupedData;
  const { movingPeriods, weightedPeriods } = getFromState.periods;

  const nestedData = nest()
    .key((d) => d.dataType.abbreviation)
    .entries(groupedData);

  const onClick = () => {
    let data = {
      rows: [['TimePeriod', 'startDate', 'endDate', 'userInput']],
    };

    const addColumnTitles = () => {
      data.rows[0].push(nestedData.filter((i) => i.key === 'sh')[0].values[0].dataType.name);
      data.rows[0].push(nestedData.filter((i) => i.key === 'ly')[0].values[0].dataType.name);
      data.rows[0].push(
        movingPeriods +
          ' ' +
          nestedData[0].values[0].timePeriod.timePeriodType.type.toLowerCase() +
          ' ' +
          nestedData.filter((i) => i.key === 'ma')[0].values[0].dataType.name
      );
      data.rows[0].push(
        weightedPeriods +
          ' ' +
          nestedData[0].values[0].timePeriod.timePeriodType.type.toLowerCase() +
          ' ' +
          nestedData.filter((i) => i.key === 'wa')[0].values[0].dataType.name
      );
      data.rows[0].push(nestedData.filter((i) => i.key === 'lr')[0].values[0].dataType.name);
    };

    addColumnTitles();

    const addRows = () => {
      nestedData[0].values.map((i, index) => {
        return data.rows.push([
          i.timePeriod.groupName,
          format(new Date(i.timePeriod.startDate), 'M/d/yyyy'),
          format(new Date(i.timePeriod.endDate), 'M/d/yyyy'),
          i.data,
          nestedData.filter((i) => i.key === 'sh')[0].values[index].data,
          nestedData.filter((i) => i.key === 'ly')[0].values[index].data,
          nestedData.filter((i) => i.key === 'ma')[0].values[index].data,
          nestedData.filter((i) => i.key === 'wa')[0].values[index].data,
          nestedData.filter((i) => i.key === 'lr')[0].values[index].data,
        ]);
      });
    };
    addRows();

    let workbook = XLSX.utils.book_new();
    workbook.Props = {
      Title: 'Forecasts',
      Author: 'Tyler Casperson',
      CreatedDate: new Date(),
    };
    workbook.SheetNames.push('forecast');
    let worksheet = XLSX.utils.aoa_to_sheet(data.rows);
    workbook.Sheets['forecast'] = worksheet;

    let wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    const s2ab = (s) => {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'forecast.xlsx');
  };

  return (
    <button
      style={{
        display: 'flex',
        width: '12vw',
        padding: '0.5vw',
        fontSize: '1.5vmin',
        textAlign: 'center',
        justifyContent: 'center',
      }}
      className='exportDataBtn'
      onClick={() => onClick()}
    >
      <i style={{ paddingRight: '0.5vmin' }} className='fas fa-download'></i> Download data to Excel
    </button>
  );
};

export default ExportToExcel;
