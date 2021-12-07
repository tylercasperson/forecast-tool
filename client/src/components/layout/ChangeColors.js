import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { saveColor } from '../data/actions/settingsActions.js';

import ColorPicker from '../layout/ColorPicker';

const ChangeColors = (props) => {
  const dispatch = useDispatch();

  const getFromState = useSelector((state) => state);
  const { colors } = getFromState.colors;

  const colorsUsed = useRef();

  const onChange = () => {
    let color = [];

    const rgb2hex = (rgb) =>
      `#${rgb
        .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
        .slice(1)
        .map((n) => parseInt(n, 10).toString(16).padStart(2, '0'))
        .join('')}`;

    for (let i = 0; i < colorsUsed.current.children.length; i++) {
      let forecastType =
        colorsUsed.current.children[i].children[0].children[0].innerText.split(' ');
      let rootVariable = '--' + forecastType[0].toLowerCase() + forecastType[1];

      let rgb = colorsUsed.current.children[i].children[0].style['background-color'];
      color.push(rgb2hex(rgb));
      document.documentElement.style.setProperty(rootVariable, rgb2hex(rgb));
    }

    dispatch(saveColor(color));
  };

  return (
    <div
      style={{
        display: props.colorsDisplay,
        flexWrap: 'wrap',
        width: '80vw',
        justifyContent: 'center',
      }}
      ref={colorsUsed}
    >
      <ColorPicker text={'User Input'} color={colors[0]} onChange={() => onChange()} />
      <ColorPicker text={'Sales History'} color={colors[1]} onChange={() => onChange()} />
      <ColorPicker text={'Last Year'} color={colors[2]} onChange={() => onChange()} />
      <ColorPicker text={'Moving Average'} color={colors[3]} onChange={() => onChange()} />
      <ColorPicker text={'Weighted Average'} color={colors[4]} onChange={() => onChange()} />
      <ColorPicker text={'Linear Regression'} color={colors[5]} onChange={() => onChange()} />
    </div>
  );
};

export default ChangeColors;
