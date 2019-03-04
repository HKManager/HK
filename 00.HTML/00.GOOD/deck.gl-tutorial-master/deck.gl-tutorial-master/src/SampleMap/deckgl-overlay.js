import React from 'react';
import DeckGL, { LineLayer } from 'deck.gl';

import { data } from './data';

const getColor = () => {
  const colors = [
    [0, 92, 175], // RURI
    [203, 64, 66], // AKABENI
    [77, 81, 57], // SENSAICHA
  ];

  const n = colors.length; // Number of colors
  const r = Math.floor(Math.random() * n);

  return colors[r];
};

const DeckGLOverlay = ({ viewport, width, height }) => (
  <DeckGL
    {...viewport}
    width={width}
    height={height}
    layers={[
      new LineLayer({
        data,
        getColor,
        strokeWidth: 5,
      }),
    ]}
  />
);

export default DeckGLOverlay;
