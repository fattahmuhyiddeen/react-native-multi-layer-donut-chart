# react-native-multi-layer-donut-chart

![ezgif-5-3af8326b17](https://github.com/user-attachments/assets/44e4d27a-c688-4e3f-b38b-5b52cd249898)


## Installation

```
npm i react-native-multi-layer-donut-chart
```


## Usage (Sample code)

```
import React from 'react';
import DonutContainer from 'react-native-multi-layer-donut-chart';
import {StyleSheet, Text, View} from 'react-native';

const Legend = (title, subtitle, backgroundColor) => (
  <View style={styles.legend}>
    <Text>{title}</Text>
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
        total={1000}
        size={150}
        data={[
          {
            value: 100,
            color: 'green',
            legend: Legend('Desmond', '24GB used', 'green'),
          },
          {
            value: 200,
            color: 'red',
            legend: Legend('Desmond', '24GB used', 'red'),
          },
          {
            value: 100,
            color: 'blue',
            legend: Legend('Desmond', '24GB used', 'blue'),
          },
          {
            value: 300,
            color: 'orange',
            legend: Legend('Desmond', '24GB used', 'orange'),
          },
          {
            value: 100,
            color: 'black',
            legend: Legend('Desmond', '24GB used', 'black'),
          },
          {
            value: 100,
            color: 'brown',
            legend: Legend('Desmond', '24GB used', 'brown'),
          },
          {
            value: 100,
            color: 'turquoise',
            legend: Legend('Desmond', '24GB used', 'turquoise'),
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

