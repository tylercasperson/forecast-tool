import React, { useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorPicker = (props) => {
  const colorOptions = useRef();

  const [color, setColor] = useState(props.color);

  const onBlur = () => {
    colorOptions.current.classList.add('hide');
  };

  const onFocus = () => {
    colorOptions.current.classList.remove('hide');
  };

  const onClick = () => {
    colorOptions.current.classList.contains('hide')
      ? colorOptions.current.classList.remove('hide')
      : colorOptions.current.classList.add('hide');
  };

  const letterColor = () => {
    const hexToRgb = (hex) => {
      let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (r, g, b) => {
        return r + r + g + g + b + b;
      });

      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16),
          }
        : null;
    };

    let colorRatio =
      hexToRgb(color).red * 0.299 + hexToRgb(color).green * 0.587 + hexToRgb(color).blue * 0.114;

    return colorRatio > 160 ? '#000' : '#fff';
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1%',
        fontSize: '90%',
      }}
    >
      <div
        onClick={() => onClick()}
        style={{
          width: '200px',
          height: '3vh',
          backgroundColor: color,
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            color: letterColor(),
            marginTop: '0.5vh',
          }}
        >
          {props.text}
        </span>
      </div>
      <div
        ref={colorOptions}
        tabIndex={0}
        onFocus={() => onFocus()}
        onBlur={() => onBlur()}
        onBlurCapture={props.onChange}
        className='hide'
      >
        <HexColorPicker color={color} onChange={setColor} />
      </div>
    </div>
  );
};

export default ColorPicker;
