import React, { useEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import Donut, { DEFAULT_SIZE } from "./Donut";
import { Pressable, View } from "react-native";

const Part = ({ index, size = DEFAULT_SIZE, data, state, ...props }) => {
  const realTotal = data.reduce((pv, d) => pv + +d.value, 0);
  const total = props.total ? Math.max(realTotal, +props.total) : realTotal;
  const item = data[index];
  const percent = (+item.value / total) * 100;

  const cumulativePercent = data
    .slice(0, index)
    .reduce((pv, d) => pv + (+d.value / total) * 100, 0);

  const degree1 = (cumulativePercent / 100) * 360;
  const degree2 = (Math.min(cumulativePercent + percent, 99.9) / 100) * 360;
  const radian1 = ((degree1 - 90) * Math.PI) / 180;
  const radian2 = ((degree2 - 90) * Math.PI) / 180;
  const r = size / 2;
  const center = size / 2;
  const x1 = center + r * Math.cos(radian1);
  const y1 = center + r * Math.sin(radian1);
  const x2 = center + r * Math.cos(radian2);
  const y2 = center + r * Math.sin(radian2);

  const largeArcFlag = +(percent > 50);

  return (
    <Path
      onPress={() => state[1](index)}
      d={`M ${center} ${center} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
      fill="#00000000"
      // fill={item.color}
    />
  );
};

const Legend = ({ size = DEFAULT_SIZE, data, state, ...props }) => {
  const realTotal = data.reduce((pv, d) => pv + +d.value, 0);
  const total = props.total ? Math.max(realTotal, +props.total) : realTotal;
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const index = state[0];
  if (index != 0 && !index) return;
  const item = data[index];
  if (!item) return;

  const percent = Math.min((+item.value / total) * 100, 99.9);
  let height = 0;

  // TODO use parabolic function to get exact value
  const getHeight = (p) => (p / 50) * size;

  if (percent >= 50) height = size;
  else height = getHeight(percent);
  let top = 0;
  let cumulativePercent = 0;
  if (index) {
    data.slice(0, index).forEach((d) => {
      const pcent = (+d.value / total) * 100;
      cumulativePercent += pcent;
      top += getHeight(pcent);
    });
  }
  const acc = top + height;
  if (acc > size) height = size - top;

  if (state[0] === index && item.legend) {
    const style = { position: "absolute", transform: [] };
    if (cumulativePercent + percent <= 50) {
      style.transform.push({ translateX: size - layout.width / 4 });
      // style.left = size;
      if (cumulativePercent + percent <= 25) {
        style.top = top;
        // style.transform.push({translateY: -r + layout.height / 2 + top});
      } else {
        style.bottom = size - top - height;
        // style.transform.push({translateY: r - layout.height / 2 - height});
      }
    } else {
      style.transform.push({ translateX: layout.width / 4 - size });
      // style.right = size;

      if (cumulativePercent + percent <= 75)
        style.bottom = Math.max(0, top - size);
      else style.top = layout.height;
      // else style.top = size * 2 - acc;
    }
    return (
      <View
        onLayout={({ nativeEvent }) => setLayout(nativeEvent.layout)}
        style={style}
      >
        {item.legend}
      </View>
    );
  }
};

export default (props) => {
  const { size = DEFAULT_SIZE, data, thickness, children, total } = props;
  const state = useState();
  const strokeWidth = thickness || size / 10;
  useEffect(() => {
    state[1]();
  }, [total, data]);
  return (
    <Pressable
      style={{ alignItems: "center", justifyContent: "center" }}
      onPress={() => state[1]()}
    >
      <Donut {...props} strokeWidth={strokeWidth} />

      <Svg style={{ position: "absolute" }} height={size} width={size}>
        {data.map((_, i) => (
          <Part {...props} index={i} state={state} />
        ))}
      </Svg>
      <Legend {...props} state={state} />

      <View
        style={{
          pointerEvents: "none",
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
          borderRadius: size,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: 'red',
          // opacity: .9,
          position: "absolute",
        }}
        children={children}
      />
    </Pressable>
  );
};
