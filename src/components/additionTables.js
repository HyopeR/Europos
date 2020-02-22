import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableHighlight, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';
import { selectTableGroup, fetchTable } from '../actions';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import PTRView from 'react-native-pull-to-refresh';

class AdditionTables extends Component {

  constructor(props) {
    super(props);
    const { listTableGroup, selectedTableGroup } = this.props;
    this.state = {
      loadScene: true,
      index: selectedTableGroup.sceneIndex,
      routes: listTableGroup.dataset.twDataSet,
      scene: listTableGroup.dataset.twSceneSet,

      loadTabView: false,
    };
  }

  componentDidMount() {
    const { selectedTableGroup } = this.props;
    this.tabViewUpdate();
  }

  selectIndex = async(index) => {
    const { listTableGroup } = this.props;
    let table_group_id = listTableGroup.dataset.mainData[index].table_group_id;
    let array = [index, table_group_id];
    this.props.selectTableGroup(array);
    this.setState({index: index});
  }

  tabViewUpdate = () => {
    this.setState({loadTabView: true});
  }

  onPullRelease = async() => {
    this.props.fetchTable(this.props.listTableGroup.dataset.mainData);
    setTimeout(function()
      {
        Actions.refresh({key: Math.random()});
      }, 500);
  }

  render() {

    return (
      <PTRView style={styles.formBack} onRefresh={() => this.onPullRelease()} >

      <StatusBar hidden />

          {
            this.state.loadTabView
            ?
            <View style={{height: Dimensions.get('window').height - 60}}>
              <TabView
              key={"tw-1"}
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
              />
            </View>
            : null
          }

      </PTRView>
    );
  }
}
const styles = StyleSheet.create({
  formBack: {
    flex: 1,
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
    listTableGroup: state.listTableGroup,
    selectedTableGroup: state.selectedTableGroup,
    listTable: state.listTable,
  }
}

export default connect(mapStateToProps, {selectTableGroup, fetchTable})(AdditionTables);
