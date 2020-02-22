import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, StatusBar, Dimensions, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Left, Right, Icon, Body } from 'native-base';
import { connect } from 'react-redux';
import { fetchReceiptDetail, fetchReceipt, emptyReceipt, loadLocalReipctDetail } from '../actions';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import AdditionCreate from './additionCreate';
import AdditionList from './additionList';

class AdditionTableChange extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Ürün Ekle' },
        { key: 'second', title: 'Adisyonu Gör' },
      ],
      scene: {
        first: AdditionCreate,
        second: AdditionList,
      },

      loadTabView: false,
    };
  }

  componentDidMount() {
    this.tabViewUpdate();
  }

  selectIndex = async(index) => {
    const { selectedTableGroup, listReceiptDetail } = this.props;

    if(index == 1){
      listReceiptDetail.localLoad = true;

      if(selectedTableGroup.selectedReceipt != null){
        this.props.fetchReceiptDetail(selectedTableGroup.selectedReceipt);
        this.props.fetchReceipt(selectedTableGroup.selectedReceipt);
      } else {
        this.props.emptyReceipt();
      }
    } else {
      listReceiptDetail.localLoad = false;
    }

    this.setState({index: index});
  }

  tabViewUpdate = () => {
    this.setState({loadTabView: true});
  }

  render() {
    return (
      <View style={styles.formBack}>

      {
        this.state.loadTabView
        ?
        <TabView
          navigationState={this.state}
          renderScene={SceneMap(
            this.state.scene
          )}
          onIndexChange={(index) => this.selectIndex(index)}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props =>
              <TabBar
                  {...props}
                  style={styles.tab}
                  indicatorStyle={{ backgroundColor: '#000' }}
                  labelStyle={styles.noLabel}
              />
          }
          tabBarPosition={'top'}
        />
        :
        null
      }

      </View>
    );
  }
}
const styles = StyleSheet.create({
  formBack: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  formInBody: {
    width:'100%',
    marginTop:10,
  },
  formInBodyScroll: {
    width:'100%',
  },
  formOutBody: {
    alignItems: 'center',
    marginBottom: 75,
  },
  scene: {
    flex: 1,
  },
  noLabel: {
    color: '#000',
    fontSize: 12,
  },
  tab: {
    backgroundColor: '#ddd',
  },
});

const mapStateToProps = (state) => {
  return {
    selectedTableGroup: state.selectedTableGroup,
    listReceiptDetail: state.listReceiptDetail,
    selectedReceipt: state.selectedReceipt,
  }
}

export default connect(mapStateToProps, {fetchReceiptDetail, fetchReceipt, emptyReceipt, loadLocalReipctDetail})(AdditionTableChange);
