import React from 'react';

const ButtonHover = (props) => {
  return (
    <button
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: props.padding,
        marginTop: '3vh',
        marginBottom: '5vh',
        width: props.width,
        borderWidth: '0.2vw',
        borderRadius: '5px',
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: props.color,
        background: props.background,
        letterSpacing: '3px',
        fontSize: '16px',
        transition: '0.5s',
      }}
      className='buttonHover buttonRandom'
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
