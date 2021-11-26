import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTimePeriodTypes } from '../data/actions/timePeriodTypeActions.js';

const List = () => {
  const timePeriodList = useRef();

  const [thisOne, setThisOne] = useState();

  const dispatch = useDispatch();

  const timePeriodTypesList = useSelector((state) => state.timePeriods);
  const { timePeriodTypes } = timePeriodTypesList;

  const onClick = (index) => {
    let isSelected = timePeriodList.current.children[index].classList;
    if (isSelected.contains('selected')) {
      isSelected.remove('selected');
    } else {
      if (thisOne !== undefined) {
        timePeriodList.current.children[thisOne].classList.remove('selected');
      }
      setThisOne(index);
      isSelected.add('selected');
    }

    if (document.getElementsByClassName('selected').length === 0) {
      isSelected.add('selected');
    }
  };

  useEffect(() => {
    dispatch(getTimePeriodTypes());
  }, [dispatch]);
  return (
    <div>
      <ul ref={timePeriodList} className='timePeriodList'>
        {timePeriodTypes.map((i, index) => {
          return (
            <li
              key={i.type}
              className={thisOne === undefined && index === 2 ? 'listItem selected' : 'listItem'}
              onClick={() => onClick(index)}
            >
              <span style={{ width: '100%', textAlign: 'center' }}>{i.type}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
