import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { loadLocalReipctDetail } from '../actions';

import { Icon } from 'native-base';
import { Card } from './common';
import SwipeView from 'react-native-swipeview';

class AdditionListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getClock = () => {
    let clock = new Date();
    var hour = this.addZero(clock.getHours());
    var minute = this.addZero(clock.getMinutes());

    return hour + ":" + minute;
  }

  addZero = (i) => {
    if (i < 10) { i = "0" + i; }
    return i;
  }

  swipeItemUpdate(itemSet) {
    let array_index = this[0].props.listReceiptDetail.localDataset.length;
    let amount = this[1].amount * -1;
    let price = this[1].price * -1;
    let order_time = this[0].getClock();
    let item_id = this[1].item_values.item_id;
    let item_name = this[1].item_values.item_name;

    let puppet = {
      random_id: Math.random(),
      spesific: 'local',
      amount: amount,
      price: price,
      order_time: order_time,
      item_values: {item_id: item_id, item_name: item_name}
    };

    this[0].props.listReceiptDetail.localTotalPrice += price;
    this[0].props.listReceiptDetail.localDataset.push(puppet);
    this[0].props.loadLocalReipctDetail(this[0].props.listReceiptDetail.localDataset);
  }

  swipeItemDelete(itemSet) {
    let random_id = this[1].random_id;
    let filterArray = this[0].props.listReceiptDetail.localDataset.filter((item) => item.random_id != random_id);
    this[0].props.listReceiptDetail.localTotalPrice -= this[1].price;
    this[0].props.loadLocalReipctDetail(filterArray);
  }

  render() {
    const { additionListItem } = this.props;

    return (
      <SwipeView renderVisibleContent={() =>
        <Card>
          <View style={{flex: 1, flexDirection: 'column'}}>

            <View style={{width: '100%', flexDirection: 'row'}}>

              {
              additionListItem.spesific != undefined
              ? <Icon name='radio-button-on' style={{width: '5%', color: '#2ECC71', fontSize: 18}}/>
              : <Icon name='radio-button-on' style={{width: '5%', color: '#A93226', fontSize: 18}}/>
              }

              <Text style = {{width: '55%'}}>
              {
                additionListItem.item_values.item_name.length < 25
                ? `${additionListItem.item_values.item_name}`
                : `${additionListItem.item_values.item_name.substring(0, 22)}...`
              }
              </Text>

              <Text style = {{width: '20%'}}>{additionListItem.amount}</Text>

              <Text style = {{width: '20%'}}>{additionListItem.price}</Text>
            </View>
          </View>
        </Card>
      }
        onSwipedLeft={
          additionListItem.spesific != undefined
          ? this.swipeItemDelete.bind([this, additionListItem])
          : this.swipeItemUpdate.bind([this, additionListItem])
        }
        disableSwipeToRight={true}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listReceiptDetail: state.listReceiptDetail
  }
}

export default connect(mapStateToProps, {loadLocalReipctDetail})(AdditionListItem);
