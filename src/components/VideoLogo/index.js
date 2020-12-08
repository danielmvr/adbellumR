import React from 'react';
import video from './iconwebm.webm';

export default function VideoLogo() {
  return (
    <video src={video} width="50px" height="50px" loop muted id="tapSword"></video>
  );
};
