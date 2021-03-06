import React from "react";
import { StyleSheet, View } from "react-native";

const TriangleRight = () => {
  return (
    <View style={styles.triangle} />
  )
}

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#383838',
    transform: [{ rotate: '90deg'}],
    marginTop: 5,
  }
});

export { TriangleRight };
