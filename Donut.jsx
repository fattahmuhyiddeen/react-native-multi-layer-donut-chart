import React from 'react';
import Svg, {Circle} from 'react-native-svg';
export const DEFAULT_SIZE = 200;

export default ({
  total,
  data,
  size = DEFAULT_SIZE,
  strokeWidth,
  baseColor = '#f1f1f1',
}) => {
  let acc = 0;
  const radius = size / 2.3;
  const length = 2 * Math.PI * radius;

  const getProps = stroke => ({
    r: radius,
    fill: 'none',
    stroke,
    strokeWidth,
    strokeDasharray: length,
    rotation: -90,
    originX: size / 2,
  });

  return (
    <Svg height={size} width={size}>
      <Circle {...getProps(baseColor)} />
      {data
        .map(({value, color}) => (
          <Circle
            {...getProps(color)}
            strokeLinecap="round"
            strokeDashoffset={length - length * (acc += value / total)}
          />
        ))
        .reverse()}
    </Svg>
  );
};
