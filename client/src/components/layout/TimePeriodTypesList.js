import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTimePeriodTypes } from '../data/actions/timePeriodTypeActions.js';
import { saveFirstLetter, savePeriodId } from '../data/actions/settingsActions.js';

const TimePeriodTypesList = () => {
  const dispatch = useDispatch();

  const timePeriodList = useRef();

  const [thisOne, setThisOne] = useState();

  const getFromState = useSelector((state) => state);
  const { timePeriodTypes } = getFromState.timePeriodTypes;
  const { periodId } = getFromState.groupVariables;

  const onClick = (index, i) => {
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

    dispatch(saveFirstLetter(i.type.charAt(0)));
    dispatch(savePeriodId(i.id));
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
              id={i.id}
              className={
                thisOne === undefined && index === periodId - 1 ? 'listItem selected' : 'listItem'
              }
              onClick={() => onClick(index, i)}
            >
              <span style={{ width: '100%', textAlign: 'center' }}>{i.type}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TimePeriodTypesList;
