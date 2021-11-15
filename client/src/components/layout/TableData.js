import React from 'react';
import { nest } from 'd3-collection';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const TableData = (props) => {
  let data = nest()
    .key((d) => d.timePeriod.groupName)
    .entries(props.data);

  const dateFormat = (date) => {
    let dateParts = date.split('T')[0].split('-');
    let month = dateParts[1][0] === '0' ? dateParts[1][1] : dateParts[1];
    let day = dateParts[2][0] === '0' ? dateParts[2][1] : dateParts[2];
    let year = dateParts[0];

    return month + '/' + day + '/' + year;
  };

  return (
    <div
      style={{
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '-3px',
        width: '70vw',
        fontSize: '1.5vw',
      }}
    >
      <TableHeader
        color={props.color}
        onChange={props.onChange}
        startDate={props.startDate}
        endDate={props.endDate}
      />
      <div style={{ height: '40vh', overflowY: 'auto' }}>
        {data.map((i, index) => {
          let findData = (something) => {
            let exists = i.values.find(
              (o) => o.dataType.abbreviation === something
            );
            return exists === undefined ? 0 : exists.data;
          };
          let background = index % 2 !== 0 ? 'lightgrey' : 'none';
          return (
            <TableRow
              key={index}
              background={background}
              timePeriod={i.key}
              startDate={dateFormat(i.values[0].timePeriod.startDate)}
              endDate={dateFormat(i.values[0].timePeriod.endDate)}
              salesHistory={findData('sh')}
              userInput={findData('ui')}
              lastYear={findData('ly')}
              m3wa={findData('w3ma')}
              m3ma={findData('m3ma')}
              linearRegression={findData('lr')}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TableData;
