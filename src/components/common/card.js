import React from "react";
import { StyleSheet, View } from "react-native";

const Card = (props) => {
  return (
    <View style = {styles.cardWrapper}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    paddingLeft: 3,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
  }
});

export { Card };
