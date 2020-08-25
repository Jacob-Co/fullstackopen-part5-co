import React, { useState } from 'react';

const Toggable = ({children, label}) => {
  const [visible, setVisible] = useState(false);

  const showIfVisible = {display: visible ? '' : 'none'};
  const showIfNotVisible = {display: visible ? 'none' : ''};

  const toggelVisibility = () => {
    setVisible(!visible);
  }

  return (
    <div>
      <div style={showIfNotVisible}>
        <button onClick={toggelVisibility}>{label}</button>
      </div>
      <div style={showIfVisible}>
        {children}
        <button onClick={toggelVisibility}>cancel</button>
      </div>
    </div>
  )

};

export default Toggable;