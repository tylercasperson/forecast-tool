import React from 'react';

const ButtonHover = (props) => {
  return (
    <button
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '10px 30px',
        marginTop: '3vh',
        marginBottom: '5vh',
        width: '100%',
        borderRadius: '5px',
        textDecoration: 'none',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.8)',
        background: '#424242',
        letterSpacing: '2px',
        fontSize: '16px',
        transition: '0.5s',
      }}
      className='buttonHover'
      onClick={props.onClick}
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
