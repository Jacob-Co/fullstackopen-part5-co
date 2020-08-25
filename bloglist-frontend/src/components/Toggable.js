import React, { useState, useImperativeHandle } from 'react';

const Toggable = React.forwardRef(({children, label}, ref) => {
  const [visible, setVisible] = useState(false);

  const showIfVisible = {display: visible ? '' : 'none'};
  const showIfNotVisible = {display: visible ? 'none' : ''};

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  })

  return (
    <div>
      <div style={showIfNotVisible}>
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={showIfVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )

});

export default Toggable;