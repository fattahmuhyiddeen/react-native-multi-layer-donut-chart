import React from 'react';
import Svg, {Circle} from 'react-native-svg';
export const DEFAULT_SIZE = 200;

export default ({
  data,
  size = DEFAULT_SIZE,
  strokeWidth,
  baseColor = '#f1f1f1',
  ...props
}) => {
  let acc = 0;
  const realTotal = data.reduce((pv, d) => pv + +d.value, 0);
  const total = props.total ? Math.max(realTotal, +props.total) : realTotal;
  // const radius = (size / strokeWidth) * 6;
  const radius = size / 2 - strokeWidth / 2;
  const length = 2 * Math.PI * radius;

  const totalPercent = data.reduce((pv, d) => pv + (+d.value / total) * 100, 0);
  const degree = (totalPercent / 100) * 360 - 1; // minus one is not because of math reason, but due to ui issue that make the cicle looks detached from its pieces
  const radian = ((degree - 90) * Math.PI) / 180;
  const center = size / 2;
  const x = center + radius * Math.cos(radian);
  const y = center + radius * Math.sin(radian);

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
            strokeDashoffset={length - length * (acc += +value / total)}
          />
        ))
        .reverse()}
      <Circle
        x={x}
        y={y}
        fill={data[data.length - 1].color}
        r={strokeWidth / 2}
      />
    </Svg>
  );
};
