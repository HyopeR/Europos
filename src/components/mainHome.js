import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, StatusBar } from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import SwipeView from 'react-native-swipeview';
import { TriangleRight } from './common';

class MainHome extends Component {


  render() {
    return (
      <View style={styles.formBack}>
        <StatusBar hidden />

        <View style={styles.mainHeader}>
          <View style={[styles.triangleCornerTopLeft, {position: 'absolute', left: 0, top: 0, zIndex: 1}]}></View>
          <View style={[styles.triangleCornerTopRight, {position: 'absolute', right: 0, top: 0, zIndex: 1}]}></View>
          <View style={{width: '90%', paddingTop: 15, height: 120, alignItems: 'center'}}>
          <Image source={require('./assets/logo.png')} style={{width:'100%', maxWidth: 390, maxHeight: 100}} />
          </View>
        </View>

      <View style={styles.formOutBody}>
        <ScrollView style={styles.formInBodyScroll}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.formInBody}>

            <SwipeView
              renderVisibleContent={() =>
                <View style={styles.mainBox}>
                  <View style={styles.mainBoxImageWrap}><Image source={require('./assets/addition.png')} style={{width:80, height: 80}}></Image></View>
                  <View style={styles.mainBoxTextWrap}>
                    <View style={{flexDirection: 'row'}}>
                      <TriangleRight/>
                      <Text style={styles.mainBoxText}>Adisyon</Text>
                    </View>
                  </View>
                </View>
              }
              onSwipedRight={() => Actions.mainAddition()}
              disableSwipeToLeft={true}
            />

            <SwipeView
              renderVisibleContent={() =>
                <View style={styles.mainBox}>
                  <View style={styles.mainBoxImageWrap}><Image source={require('./assets/reservation.png')} style={{width:80, height: 80}}></Image></View>
                  <View style={styles.mainBoxTextWrap}>
                    <View style={{flexDirection: 'row'}}>
                      <TriangleRight/>
                      <Text style={styles.mainBoxText}>Rezervasyon</Text>
                    </View>
                  </View>
                </View>
              }
              onSwipedRight={() => Actions.mainReservation()}
              disableSwipeToLeft={true}
            />

              </View>
            </View>
          </ScrollView>
          <View style={{position: 'absolute', alignItems: 'center', bottom: 0, width: '100%', paddingBottom: 5}}>
            <Icon name='information-circle' style={{fontSize: 24}} onPress={() => Actions.mainDetail()}/>
          </View>
        </View>


        <View style={[styles.triangleCornerBottomLeft, {position: 'absolute', left: 0, bottom: 0, zIndex: 1}]}></View>
        <View style={[styles.triangleCornerBottomRight, {position: 'absolute', right: 0, bottom: 0, zIndex: 1}]}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formBack: {
    flex: 1,
    position: 'relative',
  },
  formInBody: {
    flexDirection: 'column',
    width:'90%',
    paddingTop: 20,
  },
  formInBodyScroll: {
    width:'100%',
  },
  formOutBody: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 40,
    position: 'relative'
  },
  mainTitle: {
    fontSize: 30,
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    padding: 10,
  },
  mainHeader: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
    backgroundColor: '#e9e9ef',
    shadowColor: '#000',
    shadowOffset: {
    	width: 0,
    	height: 4,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 10,
  },
  mainBox: {
    width: '100%',
    height: 120,
    backgroundColor: '#e9e9ef',
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.40,
    shadowRadius: 3,
    elevation: 5,
  },
  mainBoxImageWrap: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 2,
    borderColor: '#383838',
  },
  mainBoxTextWrap: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  mainBoxText: {
    fontSize: 24,
    marginLeft: 10,
  },
  triangleCornerTopLeft: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 40,
    borderTopWidth: 40,
    borderRightColor: 'transparent',
    borderTopColor: '#ccc'
  },
  triangleCornerTopRight: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 40,
    borderTopWidth: 40,
    borderRightColor: 'transparent',
    borderTopColor: '#ccc',
    transform: [
      {rotate: '90deg'}
    ]
  },
  triangleCornerBottomLeft: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 40,
    borderTopWidth: 40,
    borderRightColor: 'transparent',
    borderTopColor: '#ccc',
    transform: [
      {rotate: '270deg'}
    ]
  },
  triangleCornerBottomRight: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 40,
    borderTopWidth: 40,
    borderRightColor: 'transparent',
    borderTopColor: '#ccc',
    transform: [
      {rotate: '180deg'}
    ]
  },
});

export default (MainHome);
