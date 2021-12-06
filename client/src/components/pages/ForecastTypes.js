import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listDataTypes } from '../data/actions/dataTypeActions.js';

import ForecastInformation from '../layout/ForecastInformation.js';

const ForecastTypes = () => {
  const dispatch = useDispatch();

  const pullFromState = useSelector((state) => state);
  const { dataTypes } = pullFromState.dataTypes;
  const { colors } = pullFromState.colors;

  const [record, setRecord] = useState(0);

  useEffect(() => {
    dispatch(listDataTypes());
  }, [dispatch]);

  return dataTypes !== undefined && dataTypes.length > 0 ? (
    <div>
      <div
        style={{
          backgroundColor: colors[record],
          paddingLeft: '10vw',
          width: '80%',
          height: '5vh',
        }}
      ></div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <i
          onClick={() => setRecord(record - 1 < 0 ? dataTypes.length - 1 : record - 1)}
          style={{ fontSize: '10vh', margin: '3%' }}
          className='fas fa-chevron-left'
        ></i>
        {
          <ForecastInformation
            name={dataTypes[record].name}
            description={dataTypes[record].description}
            calculation={dataTypes[record].calculation}
          />
        }
        <i
          onClick={() => setRecord(record + 1 > dataTypes.length - 1 ? 0 : record + 1)}
          style={{ fontSize: '10vh', margin: '3%' }}
          className='fas fa-chevron-right'
        ></i>
      </div>
    </div>
  ) : (
    ''
  );
};

export default ForecastTypes;
