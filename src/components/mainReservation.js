import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';

class MainReservation extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {

    return (
      <View style={styles.formBack}>
        <StatusBar hidden />
        <Text>Rezervasyon</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  formBack: {
    flex: 1,
  },
});

export default (MainReservation);
