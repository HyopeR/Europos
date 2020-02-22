import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const ButtonIGT = ({ text, onPress, underlayColor, selected }) => {

  return (
    <View style={
      selected
      ? styles.wrapperSelectIGT
      : styles.wrapperIGT
    }>
      <TouchableHighlight
        style={styles.touchIGT}
        underlayColor={underlayColor}
        onPress={onPress}
        >
      <View style={styles.inIGT}>
        <Text style={styles.textIGT}>{text}</Text>
      </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapperIGT: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    height: 40,
    width: '30%',
    margin: '1%',
  },
  wrapperSelectIGT: {
    backgroundColor: '#e94f2e',
    borderRadius: 10,
    height: 40,
    width: '30%',
    margin: '1%',
  },
  touchIGT: {
    height: 40,
    width: '100%',
    borderRadius: 10,
  },
  inIGT: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    padding: 2,
  },
  textIGT: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
  },
});

export { ButtonIGT };
