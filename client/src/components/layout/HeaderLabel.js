import React from 'react';

const HeaderLabel = (props) => {
  return (
    <h3
      style={{
        textTransform: 'uppercase',
        fontWeight: 'normal',
        fontSize: '2vh',
        paddingTop: '1vh',
      }}
    >
      {props.header}
      <hr
        style={{
          marginLeft: '-2vw',
          marginTop: '2px',
          borderStyle: 'none',
          backgroundImage: 'linear-gradient(to right, #696969, white)',
          borderRadius: '50%',
          height: '0.5vh',
          width: '33vw',
        }}
      ></hr>
    </h3>
  );
};

export default HeaderLabel;
