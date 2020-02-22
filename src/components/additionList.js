import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableHighlight, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchTable } from '../actions';
import { Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import AdditionListItem from './additionListItem';

class AdditionList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,

      defaultSeeTotalPrice: 0,
      defaultTotalPrice: 0,
      defaultDate: '',
      defaultClock: '',

      startLocalLength: 0,
      controlLocalData: false,
    };
  }

  componentDidMount() {
    const { selectedReceipt, selectedTableGroup, listReceiptDetail } = this.props;

    let that = this;

    if(selectedTableGroup.selectedReceipt != null){
      that.setState({
        defaultTotalPrice: selectedTableGroup.selectedTable.receipt_values.total_price,
        defaultSeeTotalPrice: selectedTableGroup.selectedTable.receipt_values.total_price,
      });
    }
  }

  getClock = () => {
    let clock = new Date();
    var hour = this.addZero(clock.getHours());
    var minute = this.addZero(clock.getMinutes());

    clock = hour + ":" + minute;
    return clock;
  }

  getDate = () => {
    let thisDate;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    thisDate = year + "-" + month + "-" + date;
    return thisDate;
  }

  addZero = (i) => {
    if (i < 10) { i = "0" + i; }
    return i;
  }

  closeReceipt = () => {
    const { selectedReceipt, selectedTableGroup } = this.props;

    if(selectedTableGroup.selectedReceipt != null){

    let receiptEnd = this.getClock();

      fetch('http://192.168.1.190:35111/api/receipt/update/' + selectedTableGroup.selectedReceipt, {
          method: 'PUT',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rec_date: selectedReceipt.dataset.rec_date,
            rec_no: selectedReceipt.dataset.rec_no,
            table_id: selectedReceipt.dataset.table_id,
            rec_pax: selectedReceipt.dataset.rec_pax,
            waiter_id: selectedReceipt.dataset.waiter_id,
            start_time: selectedReceipt.dataset.start_time,
            end_time: receiptEnd,
            dept_id: selectedReceipt.dataset.dept_id,
            total_price: selectedReceipt.dataset.total_price,
            rec_printed: selectedReceipt.dataset.rec_printed,
            rec_closed: true,
            eod_id: selectedReceipt.dataset.eod_id,
            disc_id: selectedReceipt.dataset.disc_id,
            disc_rate: selectedReceipt.dataset.disc_rate,
            disc_total: selectedReceipt.dataset.disc_total,
            service_id: selectedReceipt.dataset.service_id,
            service_rate: selectedReceipt.dataset.service_rate,
            service_total: selectedReceipt.dataset.service_total,
            receipt_type_id: selectedReceipt.dataset.receipt_type_id,
            shift_id: selectedReceipt.dataset.shift_id,
            rec_note: selectedReceipt.dataset.rec_note,
            rec_addtxt: selectedReceipt.dataset.rec_addtxt,
            rec_addnum: selectedReceipt.dataset.rec_addnum,
            okc_status: selectedReceipt.dataset.okc_status
            })
        })
        .then((response) => response.json())
          .then(async(responseJson) => {
            console.log(responseJson);
            await this.props.fetchTable(this.props.listTableGroup.dataset.mainData);
            this.load();
          })
          .catch((error) => {
            console.error(error);
          });
    } else {
      alert("Adisyon bulunmamaktadır.")
    }
  }

  sendOrder = async() => {
    const { selectedReceipt, selectedTableGroup, listReceiptDetail, listDepartment } = this.props;

    if(listReceiptDetail.localDataset.length > 0){
      let method;
      let url;

      if (selectedTableGroup.selectedReceipt == null){
        method = 'POST';
        url = 'http://192.168.1.190:35111/api/receipt/add';
        await this.setState({defaultClock: this.getClock(), defaultDate: this.getDate(), defaultTotalPrice: listReceiptDetail.localTotalPrice});
      } else {
        method = 'PUT';
        url = 'http://192.168.1.190:35111/api/receipt/update/' + selectedTableGroup.selectedReceipt;
        await this.setState({defaultClock: selectedReceipt.dataset.start_time, defaultDate: selectedReceipt.dataset.rec_date, defaultTotalPrice: selectedReceipt.dataset.total_price + listReceiptDetail.localTotalPrice});
      }

      const { defaultTotalPrice, defaultClock, defaultDate } = await this.state;
      const table_id = this.props.selectedTableGroup.selectedTable.table_id;
      const dept_id = this.props.listDepartment.selectedDepartment;

        await fetch(url, {
            method: method,
            header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rec_date: defaultDate,
              rec_no: "",
              table_id: table_id,
              rec_pax: null,
              waiter_id: null,
              start_time: defaultClock,
              end_time: "",
              dept_id: dept_id,
              total_price: defaultTotalPrice,
              rec_printed: 0,
              rec_closed: false,
              eod_id: null,
              disc_id: null,
              disc_rate: null,
              disc_total: null,
              service_id: null,
              service_rate: null,
              service_total: null,
              receipt_type_id: 1,
              shift_id: null,
              rec_note: "",
              rec_addtxt: "",
              rec_addnum: 0,
              okc_status: "0"
              })
          })
          .then((response) => response.json())
            .then(async(responseJson) => {
                if(this.props.selectedTableGroup.selectedReceipt == null){
                  let res = responseJson.split(':');
                  let rec_id = res[1];
                  this.props.selectedTableGroup.selectedReceipt = parseInt(rec_id);
                  this.props.selectedTableGroup.selectedTable.receipt_values = {};
                  this.props.selectedTableGroup.selectedTable.receipt_values.start_time = defaultClock;
                  this.props.selectedTableGroup.selectedTable.receipt_values.total_price = listReceiptDetail.localTotalPrice;
                }

                for (var i = 0; i < listReceiptDetail.localDataset.length; i++) {
                  this.addReceiptItem(i);
                }

                await this.props.fetchTable(this.props.listTableGroup.dataset.mainData);
                this.load();
                })
              .catch((error) => {
                console.error(error);
              });
    } else {
      alert('Adisyona yeni bir ürün eklemesi yapılmamıştır.')
    }
  }

  addReceiptItem = async(i) => {
    const { selectedTableGroup, listReceiptDetail } = this.props;

    let rec_id = selectedTableGroup.selectedReceipt;
    let amount = listReceiptDetail.localDataset[i].amount;
    let price = listReceiptDetail.localDataset[i].price;
    let order_time = listReceiptDetail.localDataset[i].order_time;
    let item_id = listReceiptDetail.localDataset[i].item_values.item_id;

    fetch('http://192.168.1.190:35111/api/receipt/detail/add', {
        method: 'POST',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rec_id: rec_id,
          item_id: item_id,
          amount: amount,
          price: price,
          disc_id: null,
          disc_rate: null,
          curr_id: 1,
          curr_price: price,
          cust_note_id: null,
          is_ordered: 3,
          order_time: order_time,
          is_printed: 0,
          print_time: "",
          tempFloat: null,
          specfor_recdetailid: 0,
          })
      })
      .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          })
        .catch((error) => {
          console.error(error);
        });
  }

  load(){
    const { selectedReceipt, selectedTableGroup, listReceiptDetail } = this.props;
    this.setState({loading: true});
    setTimeout(this.trade, 350);
    selectedTableGroup.selectedReceipt = null;
    selectedReceipt.dataset = null;
    selectedReceipt.loading = false;
  }

  trade() {
    Actions.popTo('additionTables');
    Actions.refresh ({key: Math.random()})
  }

  renderItem({item}) {
    return (
      <AdditionListItem additionListItem={item} />
    )
  }

  render() {
    const { listReceiptDetail, selectedTableGroup } = this.props;

    if(listReceiptDetail.localDataset.length != this.state.startLocalLength){
      this.props.listReceiptDetail.localLoad = false;
      this.setState({startLocalLength: listReceiptDetail.localDataset.length})
    } else {
      this.props.listReceiptDetail.localLoad = true;
    }

    return (
      <View style={styles.formBack}>
      <View style={{flex: 1, padding: 5}}>
        <View style={styles.pageTop}>

        <View style={{width: '100%', flexDirection: 'row', borderBottomWidth: 2, borderColor: '#000', marginTop: 10, marginBottom: 10, paddingTop: 3, paddingBottom: 3, paddingLeft: 3}}>
          <Text style = {{width: '60%', fontWeight: 'bold'}}>Ürün İsmi</Text>
          <Text style = {{width: '20%', fontWeight: 'bold'}}>Adet</Text>
          <Text style = {{width: '20%', fontWeight: 'bold'}}>Tutar</Text>
        </View>

        {
          selectedTableGroup.selectedReceipt == null
          ?
            listReceiptDetail.localDataset.length > 0
            ?
              listReceiptDetail.localLoad
              ?
              <FlatList
                data = {listReceiptDetail.localDataset}
                renderItem = { this.renderItem }
                keyExtractor = {(item) => 'lrd-' + item.random_id}
              />
              :
              listReceiptDetail.localLoad = true
            :
            <Text>Adisyona henüz ekleme yapılmamış.</Text>
          :
            listReceiptDetail.localDataset.length > 0
            ?
            <ScrollView>
                <FlatList
                  data = {listReceiptDetail.dataset}
                  renderItem = { this.renderItem }
                  keyExtractor = {(item) => 'rd-' + item.rec_detail_id}
                />
              {
                listReceiptDetail.localLoad
                ?
                <FlatList
                  data = {listReceiptDetail.localDataset}
                  renderItem = { this.renderItem }
                  keyExtractor = {(item) => 'lrd-' + item.random_id}
                />
                :
                listReceiptDetail.localLoad = true
              }
            </ScrollView>
            :
            <FlatList
              data = {listReceiptDetail.dataset}
              renderItem = { this.renderItem }
              keyExtractor = {(item) => 'rd-' + item.rec_detail_id}
            />
        }
        </View>

        <View style={styles.pageBottom}>

          <View style={styles.wrapperDetail}>
            <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'flex-start'}}>
              <View style={{width: '48%', marginLeft: '1%', marginRight: '1%', flexDirection: 'column', backgroundColor: '#ddd', borderRadius: 10, height: 30, justifyContent: 'center'}}>
                <Text style={{paddingLeft: 5}}>Masa: {selectedTableGroup.selectedTable.table_name}</Text>
              </View>

              <View style={{width: '48%', marginLeft: '1%', marginRight: '1%',flexDirection: 'column', backgroundColor: '#ddd', borderRadius: 10, height: 30, justifyContent: 'center'}}>
                <Text style={{paddingLeft: 5}}>Toplam Tutar: {this.state.defaultSeeTotalPrice + listReceiptDetail.localTotalPrice }</Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
          <View style={styles.additionButtonWrapper}>
            <TouchableHighlight
              style={styles.additionButtonTouch}
              onPress={() => this.sendOrder() }
              underlayColor="transparent"
              >
              <View style={styles.additionIn}>
                <Text style={styles.additionText}>Sipariş Ver</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.additionButtonWrapper}>
            <TouchableHighlight
              style={styles.additionButtonTouch}
              onPress={() => this.closeReceipt() }
              underlayColor="transparent"
              >
              <View style={styles.additionIn}>
                <Text style={styles.additionText}>Adisyonu Kapat</Text>
              </View>
            </TouchableHighlight>
          </View>
          </View>

        </View>
        </View>

        {
          this.state.loading
          ?
          <View style={styles.hiddenLoadPage}>
            <View style={{flexDirection: 'column'}}>
              <Spinner color="#e94f2e" />
              <Text style={{color: '#fff', fontSize: 18}}>İşleminiz yapılıyor...</Text>
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
    flexDirection: 'column',
    position: 'relative',
  },
  hiddenLoadPage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTop: {
    flex: 5,
  },
  pageBottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  additionButtonWrapper: {
    marginTop: 10,
    width: '48%',
    marginLeft: '1%',
    marginRight: '1%',
    height: 40,
    backgroundColor: '#e94f2e',
    borderRadius: 10,
  },
  additionButtonTouch: {
    height: 40,
    width: '100%',
    borderRadius: 10,
  },
  additionIn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    padding: 2,
  },
  additionText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
  wrapperDetail: {
    width: '100%',
    justifyContent: 'center'
  },
});

const mapStateToProps = (state) => {
  return {
    selectedTableGroup: state.selectedTableGroup,
    listReceiptDetail: state.listReceiptDetail,
    selectedReceipt: state.selectedReceipt,
    listTableGroup: state.listTableGroup,
    listDepartment: state.listDepartment,
  }
}

export default connect(mapStateToProps, {fetchTable})(AdditionList);
