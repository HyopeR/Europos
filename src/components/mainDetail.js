import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, ImageBackground } from 'react-native';
import { Icon } from 'native-base';

class MainDetail extends Component {
  render() {
    return (
      <View style={styles.formBack}>

      <View style={styles.formOutBody}>
        <ScrollView style={styles.formInBodyScroll}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.formInBody}>

        <View>
          <ImageBackground source={require('./assets/image-1.png')} style={styles.detailImageWrapper}>

            <View style={{width: '90%'}}>

              <View style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', height: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#FFF', fontSize: 20}}>Europos Mobil Yazılımı</Text>
              </View>

            </View>

          </ImageBackground>
        </View>

        <TouchableHighlight>
        <View style={styles.detailAdressWrapper}>

          <View style={styles.detailAdressTitleArea}>
            <View style={{flexDirection: 'row'}}>
            <Icon name='briefcase'/>
            <Text style={styles.detailAdressTitle}>İstanbul Şube</Text>
            </View>
          </View>

          <View style={{backgroundColor:'#ccc', height: 3}}></View>

          <View style={{alignItems: 'center', marginTop: 5}}>
            <Text style={styles.detailAdressContent}>Büyükdere Caddesi, Hukukçular Sitesi, No: 24A, Kat: 4, Daire: 40B</Text>
            <Text style={styles.detailAdressContent}>Mecidiyeköy / Istanbul</Text>
            <Text style={styles.detailAdressContent}>İrtibat: +09 212 347 8052</Text>
          </View>

          </View>
          </TouchableHighlight>

          <TouchableHighlight>
          <View style={styles.detailAdressWrapper}>

            <View style={styles.detailAdressTitleArea}>
              <View style={{flexDirection: 'row'}}>
              <Icon name='briefcase'/>
              <Text style={styles.detailAdressTitle}>İzmir Şube</Text>
              </View>
            </View>

            <View style={{backgroundColor:'#ccc', height: 3}}></View>

            <View style={{alignItems: 'center', marginTop: 5}}>
              <Text style={styles.detailAdressContent}>Cumhuriyet Bulvarı, No: 140/2, Kat: 7, Anıt İş Merkezi</Text>
              <Text style={styles.detailAdressContent}>Alsancak / Izmir</Text>
              <Text style={styles.detailAdressContent}>İrtibat: +09 232 463 7920</Text>
            </View>
            </View>
            </TouchableHighlight>

            </View>
          </View>
        </ScrollView>
      </View>

        <View style={{position: 'absolute', bottom: 5, alignItems: 'center', width: '100%', flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Icon name='information-circle' style={{fontSize:18, marginRight:5}} />
            <Text>Designed by Tolgahan Çelik for EuroProtel</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formBack: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  formInBody: {
    width:'100%',
  },
  formInBodyScroll: {
    width:'100%',
  },
  formOutBody: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 15,
  },
  detailImageWrapper: {
    height: 180,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTelView: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTelText: {
    color: '#FFF',
    fontSize: 16,
  },
  detailAdressWrapper: {
    flexDirection: 'column',
    margin: 20,
  },
  detailAdressTitleArea: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailAdressTitle: {
    fontSize: 20,
    marginLeft: 15,
  },
  detailAdressContent: {
    textAlign: 'center',
  },
});

export default (MainDetail);
