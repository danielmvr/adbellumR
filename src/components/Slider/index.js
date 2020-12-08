import React from 'react';

export default function Slider (props){
  return(
    <>
    <input
    type="range"
    min="0"
    max="1000"
    defaultValue="950"
    id="velo"
    className="slider"
    onMouseUp={props.onMouseUp}
    />
    </>
  )
}
