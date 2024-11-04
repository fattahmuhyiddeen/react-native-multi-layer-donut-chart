# react-native-multi-layer-donut-chart

![ezgif-5-3af8326b17](https://github.com/user-attachments/assets/44e4d27a-c688-4e3f-b38b-5b52cd249898)


## Installation

```
npm i react-native-multi-layer-donut-chart react-native-svg
```
* this repo requires react-native-svg


## Usage (Sample code)

```
import React from 'react';
import DonutContainer from 'react-native-multi-layer-donut-chart';
import {StyleSheet, Text, View} from 'react-native';

const Legend = (subtitle, backgroundColor) => (
  <View style={styles.legend}>
    <Text style={{fontWeight: 'bold'}}>{backgroundColor.toUpperCase()}</Text>
    <Text>{subtitle}</Text>
    <View
      style={{
        backgroundColor,
        width: 20,
        height: 5,
        borderRadius: 10,
      }}
    />
  </View>
);
const App = () => {
  return (
    <View style={{marginTop: 100}}>
      <DonutContainer
        total={1000} // if this props not defined, it will take total sum of value in data. and also, if this prop is lesser than total sum in data, total sum in data will be used
        size={150} // default 200
        data={[
          {
            value: 60,
            color: 'green',
            legend: Legend('description', 'green'),
          },
          {
            value: 60,
            color: 'gray',
            legend: Legend('description', 'gray'),
          },
          {
            value: 200,
            color: 'red',
            legend: Legend('description', 'red'),
          },
          {
            value: 100,
            color: 'blue',
            legend: Legend('description', 'blue'),
          },
          {
            value: 300,
            color: 'orange',
            legend: Legend('description', 'orange'),
          },
          {
            value: 100,
            color: 'black',
            legend: Legend('description', 'black'),
          },
          {
            value: 100,
            color: 'brown',
            legend: Legend('description', 'brown'),
          },
          {
            value: 100,
            color: 'turquoise',
            legend: Legend('description', 'turquoise'),
          },
        ]}>
        <Text style={{fontWeight: 'bold'}}>Title</Text>
        <Text>Subtitle</Text>
      </DonutContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  legend: {
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 10,
  },
});

```

