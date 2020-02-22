import React from "react";
import { StyleSheet } from "react-native";
import { Scene, Router, Actions } from "react-native-router-flux";
//import LoginForm from "./components/loginForm";

import MainHome from './components/mainHome';
import MainAddition from './components/mainAddition';
import MainReservation from './components/mainReservation';
import MainDetail from './components/mainDetail';

import AdditionTables from './components/additionTables';
import AdditionTableChange from './components/additionTableChange';

const RouterComp = () => {
  return (
    <Router navigationBarStyle = { styles.navigationWrapper} >
      <Scene titleStyle = { styles.sceneTitle } key = "root" hideNavBar = {true}>

        <Scene key = "main" initial>
          <Scene key = "home"
            component = {MainHome}
            title = "Home"
            hideNavBar = {true}
            initial
          />

          <Scene key='mainAddition'
            component={MainAddition}
            title = "Adisyon"
            onLeft= {() => {Actions.main()}}
            onRight = {() => {}}
          />

          <Scene key='additionTables'
            component={AdditionTables}
            title = "Adisyon / Masalar"
            onLeft= {() => {Actions.mainAddition()}}
            onRight = {() => {}}
          />

          <Scene key='additionTableChange'
            component={AdditionTableChange}
            title = "Adisyon / Ekle"
            onLeft= {() => {Actions.additionTables()}}
            onRight = {() => {}}
          />

          <Scene key='mainReservation'
            title = "Rezervasyon"
            component={MainReservation}
            onLeft= {() => {Actions.home()}}
            onRight = {() => {}}
          />

          <Scene key='mainDetail'
            title = "Detaylar"
            component={MainDetail}
            onLeft= {() => {Actions.home()}}
            onRight = {() => {}}
          />
          </Scene>
        </Scene>
    </Router>
  )
}

const styles = StyleSheet.create({
  navigationWrapper: {
    textAlign: 'center',
    backgroundColor: '#e94f2e'
  },
  sceneTitle: {
    color: '#000',
    flex: 1,
    textAlign: 'center',
    fontSize: 16
  }
})

export default RouterComp;
