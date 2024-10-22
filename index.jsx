import React, {useState} from 'react';
import Svg, {Path} from 'react-native-svg';
import Donut, {DEFAULT_SIZE} from './Donut';
import {Pressable, View} from 'react-native';

const Part = ({index, total, size = DEFAULT_SIZE, data, state}) => {
  const item = data[index];
  const percent = (item.value / total) * 100;
  let height = 0;

  // TODO use parabolic function to get exact value
  const getHeight = p => (p / 50) * size;

  if (percent >= 50) height = size;
  else height = getHeight(percent);
  let top = 0;
  let cumulativePercent = 0;
  if (index) {
    data.slice(0, index).forEach(d => {
      const pcent = (d.value / total) * 100;
      cumulativePercent += pcent;
      top += getHeight(pcent);
    });
  }

  const components = [];

  const acc = top + height;
  if (acc > size) height = size - top;

  const degree1 = (cumulativePercent / 100) * 360;
  const degree2 = ((cumulativePercent + percent) / 100) * 360;
  const radian1 = ((degree1 - 90) * Math.PI) / 180;
  const radian2 = ((degree2 - 90) * Math.PI) / 180;
  const r = size / 2;
  const center = size / 2;
  const x1 = center + r * Math.cos(radian1);
  const y1 = center + r * Math.sin(radian1);
  const x2 = center + r * Math.cos(radian2);
  const y2 = center + r * Math.sin(radian2);

  components.push(
    <Path
      onPress={() => state[1](index)}
      d={`M ${center} ${center} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
      // fill={item.color}
      fill="#00000000"
    />,
  );

  if (state[0] === index && item.legend) {
    const styl = {position: 'absolute'};
    if (cumulativePercent + percent <= 25) {
      styl.left = size;
      styl.top = top;
    } else if (cumulativePercent + percent <= 50) {
      styl.left = size;
      styl.bottom = size - top - height;
    } else if (cumulativePercent + percent <= 75) {
      styl.right = size;
      styl.bottom = Math.max(0, top - size);
    } else {
      styl.right = size;
      styl.top = size * 2 - acc;
    }
    components.push(<View style={styl}>{item.legend}</View>);
  }
  return components;
};

export default props => {
  const {size = DEFAULT_SIZE, data, thickness, children} = props;
  const state = useState();
  const strokeWidth = thickness || size / 10;
  return (
    <Pressable
      style={{alignItems: 'center', justifyContent: 'center'}}
      onPress={() => state[1]()}>
      <Donut {...props} strokeWidth={strokeWidth} />

      <Svg style={{position: 'absolute'}} height={size} width={size}>
        {data.map((d, i) => (
          <Part {...props} index={i} state={state} />
        ))}
      </Svg>

      <View
        style={{
          pointerEvents: 'none',
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
          borderRadius: size,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'red',
          // opacity: .9,
          position: 'absolute',
        }}
        children={children}
      />
    </Pressable>
  );
};
