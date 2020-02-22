import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Icon, Spinner } from 'native-base';

class AdditionTableItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadData: false,
    };
  }

  componentDidMount() {
    this.renderControl();
  }

  renderControl = () => {
    this.setState({loadData: true});
  }

  onPressed(thisArray) {
    this[0].props.selectedTableGroup.selectedTable = this[1];
    this[0].props.selectedTableGroup.selectedTableIndex = this[2];
    this[0].props.listReceiptDetail.localLoad = false;
    this[0].props.listReceiptDetail.localTotalPrice = 0;
    if(this[1].receipt_values == null) {
      this[0].props.selectedTableGroup.selectedReceipt = null;
    }else {
      this[0].props.selectedTableGroup.selectedReceipt = this[1].receipt_values.rec_id;
    }
    Actions.push('additionTableChange');
    Actions.refresh ({key: Math.random()});
  }

  render() {
    const { selectedTableGroup, listTable, selectedList } = this.props;
    let dictName = selectedTableGroup.selectedTableGroup;
    let array = [];
    try {
        for (let i = 0; i < selectedList.length; i++) {

          let item = selectedList[i].table_id;

          let controller = selectedList[i].receipt_values != null;
          controller
          ? controller = controller != selectedList[i].receipt_values.rec_closed
          : controller = false

          if(controller){
            array.push(
              <View style={styles.tableWrapperFull} key={selectedList[i].table_id}>
                <TouchableHighlight style={styles.tableTouch} underlayColor='#bdbdbd' onPress={this.onPressed.bind([this, selectedList[i], i])}>
                <View style={styles.tableIn}>
                  <View style={styles.tableInRow}><Text style={styles.tableText}>{selectedList[i].table_name}</Text></View>
                  <View style={styles.tableInRow}><Icon style={styles.tableIcon} name='cash'/><Text style={styles.tableText}>{selectedList[i].receipt_values.total_price}</Text></View>
                  <View style={styles.tableInRow}><Icon style={styles.tableIcon} name='time'/><Text style={styles.tableText}>{selectedList[i].receipt_values.start_time}</Text></View>
                </View>
                </TouchableHighlight>
              </View>
            );
          } else {
            array.push(
              <View style={styles.tableWrapperEmpty} key={selectedList[i].table_id}>
                <TouchableHighlight style={styles.tableTouch} underlayColor='#bdbdbd' onPress={this.onPressed.bind([this, selectedList[i], i])}>
                <View style={styles.tableIn}>
                  <View style={styles.tableInRow}><Text style={styles.tableText}>{selectedList[i].table_name}</Text></View>
                  <View style={styles.tableInRow}><Icon style={styles.tableIcon} name='cash'/></View>
                  <View style={styles.tableInRow}><Icon style={styles.tableIcon} name='time'/></View>
                </View>
                </TouchableHighlight>
              </View>
            );
        }
      }

    } catch (e) {

      console.log(e);

    }

    return (
      <View style={styles.formBack}>
        <ScrollView>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
          {
            this.state.loadData
            ? array
            : <Spinner color='#e94f2e' />
          }
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  formBack: {
    flex: 1,
  },
  tableWrapperFull: {
    width: '18%',
    height: 65,
    backgroundColor: '#ff6e50',
    borderRadius: 10,
    margin: '1%',
  },
  tableWrapperEmpty: {
    width: '18%',
    height: 65,
    backgroundColor: '#ddd',
    borderRadius: 10,
    margin: '1%',
  },
  tableTouch: {
    width: '100%',
    height: 65,
    borderRadius: 10,
  },
  tableIn: {
    padding: 5,
    flexDirection: 'column',
  },
  tableInRow: {
    flexDirection: 'row',
  },
  tableIcon: {
    fontSize: 16,
  },
  tableText: {
    fontSize: 12,
    marginLeft: 1,
  },
  itemRow: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
  }
});

const mapStateToProps = (state) => {
  let selectedList = state.listTable.dataset[state.selectedTableGroup.selectedTableGroup];
  return {
    selectedTableGroup: state.selectedTableGroup,
    listTable: state.listTable,
    listReceiptDetail: state.listReceiptDetail,
    selectedList,
  }
}

export default connect(mapStateToProps, {})(AdditionTableItem);
