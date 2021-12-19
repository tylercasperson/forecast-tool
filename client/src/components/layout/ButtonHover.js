import React from 'react';

const ButtonHover = (props) => {
  return (
    <button
      style={{
        position: 'relative',
        display: 'inline-block',
        borderWidth: '0.2vw',
        borderRadius: '5px',
        textDecoration: 'none',
        transition: '0.5s',
      }}
      className={'buttonHover buttonRandom ' + props.className}
      onClick={props.onClick}
      onClickCapture={props.onClickCapture}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {props.name}
    </button>
  );
};

export default ButtonHover;
