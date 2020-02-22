import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableHighlight, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { fetchItemGroupType, fetchDeparmentItemGroup, fetchItem, selectItem, fetchTable, selectTableGroup, loadLocalReipctDetail } from '../actions';
import { Actions } from 'react-native-router-flux';
import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';
import { SelectMultipleGroupButton } from 'react-native-selectmultiple-button';

class AdditionCreate extends Component {

  constructor(props) {
    super(props);
    const { listDepartment } = this.props;

    this.state = {
      arrIGT: [],
      arrDIG: [],
      arrItem: [],

      firstFetchIGT: true,
      firstFetchDIG: true,
      firstFetchItem: false,

      selectedItem: false,
      hiddenView: false,

      defaultPiece: 1,
      totalPrice: 0,
      receiptItemClock: '',

      tableGroupName: '',
      loadListItem: false,
    };
  }

  componentDidMount() {
    const { selectedTableGroup, listTableGroup, listReceiptDetail } = this.props;
    this.props.loadLocalReipctDetail([]);

    let that = this;
    if(selectedTableGroup.selectedTable.receipt_values != null){
      selectedTableGroup.selectedReceipt = selectedTableGroup.selectedTable.receipt_values.rec_id;
    }

    that.setState({tableGroupName: listTableGroup.dataset.mainData[this.props.selectedTableGroup.sceneIndex].table_group_name});
  }

  addZero = (i) => {
    if (i < 10) { i = "0" + i; }
    return i;
  }

  getClock = () => {
    let clock = new Date();
    var hour = this.addZero(clock.getHours());
    var minute = this.addZero(clock.getMinutes());

    this.setState({receiptItemClock: hour + ":" + minute});
  }

  selectItemGroupType = async(data) => {
    this.setState({arrDIG: [], arrItem: []});
    if (data != 'ig-all'){
      let res = data.split('-');
      this.props.selectedTableGroup.selectedItemGroup = parseInt(res[1]);
      await this.props.fetchDeparmentItemGroup([this.props.listDepartment.selectedDepartment, parseInt(res[1])]);
    }else{
      this.props.selectedTableGroup.selectedItemGroup = 0;
      await this.props.fetchDeparmentItemGroup(this.props.listDepartment.selectedDepartment);
    }

    this.setState({firstFetchDIG: true, defaultPiece: 1, totalPrice: 0, loadListItem: false});
  }

  selectDeparmentItemGroup = async(data) => {
    this.setState({arrItem: []});
    let res = data.split('-');
    await this.props.fetchItem([this.props.listDepartment.selectedDepartment, res[1]]);
    this.setState({firstFetchItem: true, defaultPiece: 1, totalPrice: 0, loadListItem: true});
  }

  selectItem = async(data) => {
    const { listItem } = this.props;

    let res = data.split('-');
    await this.props.selectItem(res[1]);
    this.setState({defaultPiece: 1, selectedItem: true, hiddenView: true, totalPrice: this.props.listItem.selectedItem.item_STDprice});
  }

  createItemGroupType = () => {
    const { listItemGroupType } = this.props;

    if(this.props.listItemGroupType.loading && this.state.firstFetchIGT){
      this.state.arrIGT.push(
        <SelectMultipleGroupButton
          key={'smgb-1'}
          multiple={false}
          group={this.props.listItemGroupType.datasetMenu}
          defaultSelectedIndexes={[parseInt(this.props.selectedTableGroup.selectedItemGroup)]}
          singleTap={value => { this.selectItemGroupType(value); }}
          textStyle={{fontSize: 11}}
          containerViewStyle={{flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start'}}
          buttonViewStyle={{width: '25%', borderRadius: 0, height: 60, margin: 0}}
          highLightStyle={{
            borderColor: 'transparent',
            textColor: '#000',
            backgroundColor: 'transparent',
            borderTintColor: '#ddd',
            textTintColor: '#000',
            backgroundTintColor: '#ddd',
          }}
        />
      );
      this.setState({firstFetchIGT: false});
    }
  }


  createDepartmentItemGroup = () => {
    const { listDepartmentItemGroup } = this.props;

    if(this.props.listDepartmentItemGroup.loading && this.state.firstFetchDIG){
      this.state.arrDIG.push(
        <SelectMultipleGroupButton
          key={'smgb-2'}
          multiple={false}
          group={this.props.listDepartmentItemGroup.datasetMenu}
          defaultSelectedIndexes={[]}
          singleTap={value => { this.selectDeparmentItemGroup(value); }}
          textStyle={{fontSize: 11}}
          containerViewStyle={{flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: '1%'}}
          buttonViewStyle={{width: '30%', borderRadius: 10, height: 60}}
          highLightStyle={{
            borderColor: 'transparent',
            textColor: '#000',
            backgroundColor: 'transparent',
            borderTintColor: '#ddd',
            textTintColor: '#000',
            backgroundTintColor: '#ddd',
          }}
        />
      );
      this.setState({firstFetchDIG: false});
    }
  }

  createItem = () => {
    const { listItem } = this.props;

    if(this.props.listItem.loading && this.state.firstFetchItem){
      this.state.arrItem.push(
        <SelectMultipleGroupButton
          key={'smgb-3'}
          multiple={false}
          group={this.props.listItem.datasetMenu}
          defaultSelectedIndexes={[]}
          singleTap={value => { this.selectItem(value); }}
          textStyle={{fontSize: 11}}
          containerViewStyle={{flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: '1%'}}
          buttonViewStyle={{width: '30%', borderRadius: 10, height: 60}}
          highLightStyle={{
            borderColor: 'transparent',
            textColor: '#000',
            backgroundColor: 'transparent',
            borderTintColor: '#ddd',
            textTintColor: '#000',
            backgroundTintColor: '#ddd',
          }}
        />
      );
      this.setState({firstFetchItem: false});
    }
  }

  createAdditionList = async() => {
    const { listReceiptDetail } = this.props;
      await this.getClock();

      const { totalPrice } = this.state;
      const { defaultPiece } = this.state;
      const { receiptItemClock } = this.state;
      const item_id = this.props.listItem.selectedItem.item_id;
      const item_name = this.props.listItem.selectedItem.item_name;

      listReceiptDetail.localTotalPrice = totalPrice + listReceiptDetail.localTotalPrice;

      let array = listReceiptDetail.localDataset;
      array.push({
        random_id: Math.random(),
        spesific: 'local',
        amount: defaultPiece,
        price: totalPrice,
        order_time: receiptItemClock,
        item_values: {item_id: item_id, item_name: item_name}
      });
      await this.props.loadLocalReipctDetail(array);
      this.setState({hiddenView: false});
  }

  render() {
    const { listItemGroupType, selectedTableGroup, listTableGroup, listDepartmentItemGroup, listItem } = this.props;
    let itemIGT;
    if(this.state.firstFetchIGT){this.createItemGroupType();}
    if(this.state.firstFetchDIG){this.createDepartmentItemGroup();}
    if(this.state.firstFetchItem){this.createItem();}

    return (
      <View style={styles.formBack}>

        <View style={styles.formOutBody}>
          <ScrollView style={styles.formInBodyScroll}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.formInBody}>

              <View style={{justifyContent: 'center', flexDirection: 'row', padding: 5}}>

                <View style={{width: '50%', flexDirection: 'row'}}>
                  <Icon name="arrow-dropright" style={{fontSize: 20}}/>
                  <Text style={{textAlign: 'left', marginLeft: 5}}>{this.state.tableGroupName}</Text>
                </View>
                <View style={{width: '50%', flexDirection: 'row', justifyContent: 'flex-end'}}>
                  {
                    selectedTableGroup.selectedReceipt != null
                    ?<Icon name="people" style={{fontSize: 20, color: '#2ECC71', marginRight: 5}}/>
                    :<Icon name="people" style={{fontSize: 20, color: '#A93226', marginRight: 5}}/>
                  }
                  <Text style={{textAlign: 'right'}}>{this.props.selectedTableGroup.selectedTable.table_name}</Text>
                  {
                    selectedTableGroup.selectedReceipt != null
                    ?<Text style={{}}> / {this.props.selectedTableGroup.selectedTable.receipt_values.start_time}</Text>
                    :null
                  }
                </View>

              </View>

              <View style={styles.lineWrap}>
              <View style={styles.lineHead}><Text style={styles.lineText}>Ürün Grupları</Text></View>
              <View>
              {
                this.props.listItemGroupType.loading
                ? this.state.arrIGT
                : <View style={{flex:1, alignItems: 'center'}}><Spinner color="#e94f2e" /></View>
              }
              </View>
              </View>

              <View style={styles.lineWrap}>
              <View style={styles.lineHead}><Text style={styles.lineText}>Alt Ürün Grupları</Text></View>
              <View style={{marginTop: 5, marginBottom: 5}}>
              {
                this.props.listDepartmentItemGroup.loading && this.props.listDepartmentItemGroup.dataset.length > 0
                ? this.state.arrDIG
                : <Text style={{textAlign: 'center', paddingTop: 3}}>Bu ürün grubuna ait alt ürün grubu yoktur.</Text>
              }
              </View>
              </View>

              <View style={styles.lineWrap}>
              <View style={styles.lineHead}><Text style={styles.lineText}>Ürünler</Text></View>
              <View style={{marginTop: 5, marginBottom: 5}}>
              {
                this.props.listItem.loading && this.state.loadListItem && this.props.listItem.dataset.length > 0
                ? this.state.arrItem
                : <Text style={{textAlign: 'center', paddingTop: 3}}>Seçim yapılmadı yada ürün bulunmamakta.</Text>
              }
              </View>
              </View>

              </View>
            </View>
          </ScrollView>
        </View>

        {
          this.state.hiddenView
          ?
          <View style={styles.hiddenViewWrapper}>
            <View style={styles.hiddenViewInAbsolute}>
            <View style={{width: '100%', flexDirection: 'row'}}>

            <View style={{width: '85%', flexDirection: 'column', padding: 5}}>
              <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, height: 30}}>
                <Text style={{width: '95%', fontWeight: 'bold', fontSize: 13, color: '#e94f2e'}}>Seçilen Ürün Hakkında: </Text>
              </View>

              <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, height: 25}}>
                <Text style={{width: '30%', fontSize: 12}}>Seçilen Ürün: </Text>
                <Text style={{width: '65%', fontSize: 11}}>{this.props.listItem.selectedItem.item_name}</Text>
              </View>

              <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, height: 30}}>
                <Text style={{width: '30%', fontSize: 12}}>Adet Seçiniz: </Text>
                <View style={{width: '65%', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Icon name='remove' onPress={() =>
                    this.state.defaultPiece > 1
                    ? this.setState({defaultPiece: this.state.defaultPiece - 1, totalPrice: this.props.listItem.selectedItem.item_STDprice * (this.state.defaultPiece - 1)})
                    : null
                  }/>

                  <Text style={{fontSize: 11}}>{this.state.defaultPiece}</Text>

                  <Icon name='add' onPress={() =>
                    this.setState({defaultPiece: this.state.defaultPiece + 1, totalPrice: this.props.listItem.selectedItem.item_STDprice * (this.state.defaultPiece + 1)})
                  }/>
                </View>
              </View>

              <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, height: 25}}>
                <Text style={{width: '30%', fontSize: 12}}>Toplam Tutar: </Text>
                <Text style={{width: '65%', fontSize: 11}}>{this.state.totalPrice}</Text>
              </View>

            </View>

              <View style={{width: '15%', flexDirection: 'row', justifyContent: 'flex-end'}}>
                <View style={styles.hiddenViewCloseWrapper}>
                  <TouchableHighlight
                  style={styles.hiddenViewCloseTouch}
                  onPress={() => this.setState({hiddenView: false}) }
                  underlayColor='transparent'>
                    <View style={styles.hiddenViewCloseIn}>
                      <Icon name='close'/>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>

            </View>

            <View style={styles.hiddenViewAdditionButtonWrapper}>
              <TouchableHighlight
              style={styles.additionButtonTouch}
              onPress={() => this.createAdditionList() }
              underlayColor='transparent'>
                <View style={styles.additionIn}>
                  <Text style={styles.additionText}>Adisyona İşle</Text>
                </View>
              </TouchableHighlight>
            </View>

            </View>
          </View>
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
    position: 'relative',
  },
  formInBody: {
    flexDirection: 'column',
    width:'90%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  formInBodyScroll: {
    width:'100%',
    flex: 1,
  },
  formOutBody: {
    alignItems: 'center',
    flex: 1,
  },

  lineWrap: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#e9e9ef',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  lineHead: {
    width: '100%',
    height: 40,
    borderBottomWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lineText: {
    fontWeight: 'bold',
    color: '#e94f2e',
  },

  additionButtonWrapper: {
    marginTop: 10,
    width: '100%',
    height: 40,
    backgroundColor: '#e94f2e',
    borderRadius: 10,
  },
  hiddenViewAdditionButtonWrapper: {
    marginTop: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#e94f2e',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  additionButtonTouch: {
    height: 50,
    width: '100%',
    borderRadius: 10,
  },
  additionIn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    padding: 2,
  },
  additionText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
  },
  hiddenViewWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    paddingBottom: '25%',
  },
  hiddenViewInAbsolute: {
    flexDirection: 'column',
    height: 220,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: '#e9e9ef',
    borderRadius: 10,
  },
  hiddenViewCloseWrapper: {
    width: 40,
    height: 40,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#e94f2e',
  },
  hiddenViewCloseTouch: {
    width: '100%',
    height: 40,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  hiddenViewCloseIn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    padding: 2,
  },
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    listTable: state.listTable,
    listItem: state.listItem,
    listDepartment: state.listDepartment,
    listDepartmentItemGroup: state.listDepartmentItemGroup,
    listItemGroupType: state.listItemGroupType,
    listTableGroup: state.listTableGroup,
    selectedTableGroup: state.selectedTableGroup,
    listReceiptDetail: state.listReceiptDetail,
  }
}

export default connect(mapStateToProps, {fetchItemGroupType, fetchDeparmentItemGroup, fetchItem, selectItem, fetchTable, selectTableGroup, loadLocalReipctDetail})(AdditionCreate);
