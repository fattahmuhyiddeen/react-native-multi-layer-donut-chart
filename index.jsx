import React, {useState} from 'react';
import Donut from './Donut';
import {Pressable, View} from 'react-native';

const Part = ({index, total, size, data, state}) => {
  const width = size / 2;
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

  const style = {
    // backgroundColor: item.color,
    // opacity: 0.5,
    width,
    position: 'absolute',
  };

  const props = {
    onPress: () => state[1](index),
  };

  const components = [];

  const acc = top + height;
  if (top >= size) {
    components.push(
      <Pressable
        {...props}
        style={[
          style,
          {
            height: acc > size * 2 ? acc - size * 2 : height,
            bottom: top - size,
          },
        ]}
      />,
    );
  } else {
    const part2Height = top < size && acc > size ? acc - size : 0;
    if (acc > size) height = size - top;

    components.push(
      <>
        <Pressable {...props} style={[style, {height, right: 0, top}]} />
        {!!part2Height && (
          <Pressable
            {...props}
            style={[style, {height: part2Height, bottom: 0}]}
          />
        )}
      </>,
    );
  }

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
  const {size = 200, data} = props;
  const state = useState();
  return (
    <Pressable
      style={{alignItems: 'center', justifyContent: 'center'}}
      onPress={() => state[1]()}>
      <Donut {...props} />
      <View
        style={{
          position: 'absolute',
          height: size,
          width: size,
        }}>
        {data.map((d, i) => (
          <Part {...props} index={i} state={state} />
        ))}
      </View>
    </Pressable>
  );
};
