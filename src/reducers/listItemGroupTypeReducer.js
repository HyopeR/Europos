import { FETCH_ITEM_GROUP_TYPE, ERROR_ITEM_GROUP_TYPE } from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: null,
  datasetMenu: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_ITEM_GROUP_TYPE:
      return { ...state, loading: true, dataset: action.payload.dataset, datasetMenu: action.payload.datasetMenu};

    case ERROR_ITEM_GROUP_TYPE:
      return { ...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
