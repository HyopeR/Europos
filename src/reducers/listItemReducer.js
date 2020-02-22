import { FETCH_ITEM, ERROR_ITEM, SELECT_ITEM } from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: null,
  datasetMenu: null,
  selectedItem: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_ITEM:
      return { ...state, loading: true, dataset: action.payload.dataset, datasetMenu: action.payload.datasetMenu};

    case ERROR_ITEM:
      return { ...state, loading: false, error: action.payload};

    case SELECT_ITEM:
      return { ...state, selectedItem: action.payload[0]};

    default:
      return state;
  }
};
