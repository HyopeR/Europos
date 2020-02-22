import {SELECT_TABLE_GROUP } from "../actions";

const INITIAL_STATE = {
  sceneIndex: null,
  selectedTableGroup: null,
  selectedTable: null,
  selectedTableIndex: null,
  selectedReceipt: null,
  selectedItemGroup: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SELECT_TABLE_GROUP:
      return { ...state, sceneIndex: action.payload[0], selectedTableGroup: action.payload[1]};

    default:
      return state;
  }
}
