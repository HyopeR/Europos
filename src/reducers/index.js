import  { combineReducers } from "redux";

import ListPropertyReducer from './listPropertyReducer';

import ListDepartmentReducer from './listDepartmentReducer';

import ListTableGroupReducer from './listTableGroupReducer';
import SelectTableGroupReducer from './selectTableGroupReducer';

import ListTableReducer from './listTableReducer';

import ListItemGroupTypeReducer from './listItemGroupTypeReducer';

import ListDepartmentItemGroupReducer from './listDepartmentItemGroupReducer';

import ListItemReducer from './listItemReducer';

import ListReceiptDetailReducer from './listReceiptDetailReducer';

import SelectedReceiptReducer from './selectReceiptReducer';

export default combineReducers({
  listProperty: ListPropertyReducer,

  listDepartment: ListDepartmentReducer,

  listTableGroup: ListTableGroupReducer,
  selectedTableGroup: SelectTableGroupReducer,

  listTable: ListTableReducer,

  listItemGroupType: ListItemGroupTypeReducer,

  listDepartmentItemGroup: ListDepartmentItemGroupReducer,

  listItem: ListItemReducer,

  listReceiptDetail: ListReceiptDetailReducer,

  selectedReceipt: SelectedReceiptReducer,
});
