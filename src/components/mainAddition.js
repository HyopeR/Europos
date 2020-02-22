import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableHighlight, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { fetchProperty, fetchDeparment, fetchTableGroup, fetchTable, selectTableGroup, fetchDeparmentItemGroup, fetchItemGroupType } from '../actions';
import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';
import { TriangleTop } from './common';

class MainAddition extends Component {

  constructor(props) {
    super(props);
    this.state = {
      controlLoop: true,
      controlSelectTwo: false,
      controlSelectThree: false,

      selectedProperty: false,
      selectedDepartment: false,
      selectedTableGroup: false,

      hotelName:'',
      departmentName:'',
      tableGroupName:'',

      asListProperty: [<Text style={styles.actionSheetCancel}>Cancel</Text>],
      asListDepartment: [],
      asListTableGroup: [],
    };
  }

  componentDidMount() {
    const { listTableGroup, listTable } = this.props;
    this.props.listTableGroup.loading = false;
    this.props.listTable.loading = false;
    this.props.fetchProperty();
  }

  switchProperty = async(index) => {
    if(index != 0) {
      const { listProperty } = this.props;
      let prop_id = listProperty.dataset[index - 1].prop_id;
      this.setState({
        asListDepartment: [<Text style={styles.actionSheetCancel}>Cancel</Text>],
        selectedProperty: true,
        controlSelectOne: false,
        controlSelectTwo: false,
        hotelName: listProperty.dataset[index - 1].prop_name,
        departmentName: '',
        tableGroupName: '',
      });
      await this.props.fetchDeparment(prop_id);
      await this.pushDataDepartment();
    } else {
      null
    }
  }

  switchDepartment = async(index) => {
    if(index != 0) {
      const { listDepartment, listTableGroup } = this.props;
      let dept_id = listDepartment.dataset[index - 1].dept_id;

      this.setState({
        asListTableGroup: [<Text style={styles.actionSheetCancel}>Cancel</Text>],
        departmentName: listDepartment.dataset[index - 1].dept_name,
        selectedDepartment: true,
        controlSelectTwo: false,
        tableGroupName: '',
      });
      listDepartment.selectedDepartment = dept_id;
      await this.props.fetchTableGroup(dept_id);
      await this.props.fetchDeparmentItemGroup(dept_id);
      await this.props.fetchItemGroupType();
      await this.pushDataTableGroup();
    } else {
      null
    }
  }

  switchTableGroup = async(index) => {
    if(index != 0) {
      const { listTableGroup } = this.props;
      let table_group_id = listTableGroup.dataset.mainData[index - 1].table_group_id;
      this.setState({
        tableGroupName: listTableGroup.dataset.mainData[index - 1].table_group_name,
        selectedTableGroup: true,
      });
      let array = [index - 1, table_group_id];
      await this.props.fetchTable(listTableGroup.dataset.mainData);
      await this.props.selectTableGroup(array);
      // this.props.selectedTableGroup.refreshTab = true;
    } else {
      null
    }
  }

  pushDataProperty = () => {
    const { listProperty } = this.props;

    if(listProperty.loading && this.state.controlLoop) {
      for (let i = 0; i < listProperty.dataset.length; i++) {
        this.state.asListProperty.push(
          <Text style={styles.actionSheetText}>{listProperty.dataset[i].prop_name}</Text>
        )
      }
      this.setState({controlLoop: false});
    } else {
      null
    }
  }

  pushDataDepartment = () => {
    const { listDepartment } = this.props;

      for (let i = 0; i < listDepartment.dataset.length; i++) {
        this.state.asListDepartment.push(
          <Text style={styles.actionSheetText}>{listDepartment.dataset[i].dept_name}</Text>
        )
      }
      this.setState({controlSelectOne: true});
  }

  pushDataTableGroup = () => {
    const { listTableGroup } = this.props;

      for (let i = 0; i < listTableGroup.dataset.mainData.length; i++) {
        this.state.asListTableGroup.push(
          <Text style={styles.actionSheetText}>{listTableGroup.dataset.mainData[i].table_group_name}</Text>
        )
      }
      this.setState({controlSelectTwo: true});
  }

  showActionSheetProperty = () => {
    this.ActionSheetProperty.show();
  }

  showActionSheetDepartment = () => {
    this.ActionSheetDepartment.show();
  }

  showActionSheetTableGroup = () => {
    this.ActionSheetTableGroup.show();
  }

  routePage = () => {
    if(this.state.selectedProperty){
      if(this.state.selectedDepartment){
        if(this.state.selectedTableGroup){
          Actions.push('additionTables');
          Actions.refresh ({key: Math.random()});
        } else {
          alert('Lütfen masa grubunu seçiniz.')
        }
      } else{
        alert('Lütfen departmanı seçiniz.')
      }
    } else {
      alert('Lütfen oteli seçiniz.')
    }
  }

  render() {
    if(this.state.controlLoop){
      this.pushDataProperty();
    }

    return (
      <View style={styles.formBack}>
        <StatusBar hidden />

        <View style={styles.formOutBody}>
          <ScrollView style={styles.formInBodyScroll}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.formInBody}>

        <View style={styles.buttonAsWrapper}>
          <TouchableHighlight style={styles.buttonAsTouch} underlayColor='#e94f2e' onPress={this.showActionSheetProperty}>
            <View style={styles.buttonInView}>
              <Text style={styles.buttonAsText}>Otel Seçiniz</Text>
            </View>
          </TouchableHighlight>
        </View>

          <ActionSheet
            ref={o => this.ActionSheetProperty = o}
            title={
              <View style={styles.asTitleWrapper}>
                <Text style={{color: '#000', fontSize: 16}}>Oteller</Text>
                </View>
              }
            options={this.state.asListProperty}
            cancelButtonIndex={0}
            onPress={(index) => { this.switchProperty(index) }}
          />

          <View style={styles.hideView}>
            <View style={{width: '100%', alignItems: 'center'}}><TriangleTop /></View>
            <View style={styles.hideViewArea}>
              <Text style={styles.hideText}>{this.state.hotelName}</Text>
            </View>
          </View>

          {
            this.state.controlSelectOne
            ?
            <View style={{marginTop: 15}}>
            <View style={styles.buttonAsWrapper}>
              <TouchableHighlight style={styles.buttonAsTouch} underlayColor='#e94f2e' onPress={this.showActionSheetDepartment}>
                <View style={styles.buttonInView}>
                  <Text style={styles.buttonAsText}>Departman Seçimi</Text>
                </View>
              </TouchableHighlight>
            </View>

            <ActionSheet
              ref={o => this.ActionSheetDepartment = o}
              title={
                <View style={styles.asTitleWrapper}>
                  <Text style={{color: '#000', fontSize: 16}}>Departmanlar</Text>
                  </View>
                }
              options={this.state.asListDepartment}
              cancelButtonIndex={0}
              onPress={(index) => { this.switchDepartment(index) }}
            />

            <View style={styles.hideView}>
              <View style={{width: '100%', alignItems: 'center'}}><TriangleTop /></View>
              <View style={styles.hideViewArea}>
                <Text style={styles.hideText}>{this.state.departmentName}</Text>
              </View>
            </View>
            </View>
            :
            null
          }

          {
            this.state.controlSelectTwo
            ?
            <View style={{marginTop: 15}}>
            <View style={styles.buttonAsWrapper}>
              <TouchableHighlight style={styles.buttonAsTouch} underlayColor='#e94f2e' onPress={this.showActionSheetTableGroup}>
                <View style={styles.buttonInView}>
                  <Text style={styles.buttonAsText}>Masa Düzeni Seçimi</Text>
                </View>
              </TouchableHighlight>
            </View>

            <ActionSheet
              ref={o => this.ActionSheetTableGroup = o}
              title={
                <View style={styles.asTitleWrapper}>
                  <Text style={{color: '#000', fontSize: 16}}>Masa Düzenleri</Text>
                  </View>
                }
              options={this.state.asListTableGroup}
              cancelButtonIndex={0}
              onPress={(index) => { this.switchTableGroup(index) }}
            />

            <View style={styles.hideView}>
              <View style={{width: '100%', alignItems: 'center'}}><TriangleTop /></View>
              <View style={styles.hideViewArea}>
                <Text style={styles.hideText}>{this.state.tableGroupName}</Text>
              </View>
            </View>
            </View>
            :
            null
          }

          <View style={styles.buttonClasicWrapper}>
            <TouchableHighlight style={styles.buttonClasicTouch} underlayColor="#e65d41" onPress={ () => this.routePage() } >
              <View style={styles.buttonClasicIn}>
                <Icon name='add'/>
                <Text style={styles.buttonClasicText}>Adisyon Girişine Başla</Text>
              </View>
            </TouchableHighlight>
          </View>

              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  formBack: {
    flex: 1,
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
  },
  buttonAsWrapper: {
    width: '100%',
    height: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonAsTouch: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonInView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonAsText: {
    fontSize: 16,
  },
  asTitleWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    position: 'absolute',
    width: '100%',
    height: 60,
    backgroundColor:'#e94f2e',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: '#e5e5e5',
  },
  actionSheetText: {
    color: '#000',
    fontSize: 14,
  },
  actionSheetCancel: {
    color: '#e94f2e',
    fontSize: 16,
  },
  buttonClasicWrapper: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginTop: 25,
    backgroundColor: '#e94f2e',
  },
  buttonClasicTouch: {
    width: '100%',
    borderRadius: 10,
  },
  buttonClasicIn: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonClasicText: {
    fontSize: 16,
    marginLeft: 5,
  },
  hideView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hideViewArea: {
    borderWidth: 1,
    borderColor: '#383838',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    borderRadius: 10,
  },
  hideText: {
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    listProperty: state.listProperty,
    listDepartment: state.listDepartment,
    listTableGroup: state.listTableGroup,
    listTable: state.listTable,
  }
}

export default connect(mapStateToProps, {fetchProperty, fetchDeparment, fetchTableGroup, fetchTable, selectTableGroup, fetchDeparmentItemGroup, fetchItemGroupType})(MainAddition);
