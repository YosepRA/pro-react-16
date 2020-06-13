import React, { useState } from 'react';

export function HooksButton(props) {
  // const [counter, setCounter] = useState(0);
  const [hasButtonBeenClicked, setHasButtonBeenClicked] = useState(false);

  const handleClick = () => {
    props.incrementCallback(5);
    setHasButtonBeenClicked(true);
    props.callback();
  };

  return (
    <button
      onClick={handleClick}
      className={props.className}
      disabled={props.disabled === 'true' || props.disabled === true}
    >
      {props.text} {props.counter}{' '}
      {hasButtonBeenClicked && <div>Button clicked!</div>}
    </button>
  );
}
