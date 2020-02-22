import { FETCH_RECEIPT_DETAIL, ERROR_RECEIPT_DETAIL, LOAD_LOCAL_RECIPT_DETAIL, EMPTY_LOCAL_RECEIPT_DETAIL } from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: null,
  localDataset: [],
  localLoad: false,
  localTotalPrice: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_RECEIPT_DETAIL:
      return { ...state, loading: true, dataset: action.payload};

    case ERROR_RECEIPT_DETAIL:
      return { ...state, loading: false, error: action.payload};

    case LOAD_LOCAL_RECIPT_DETAIL:
      return { ...state, localDataset: action.payload};

    case EMPTY_LOCAL_RECEIPT_DETAIL:
      return { ...state, localDataset: action.payload};

    default:
      return state;
  }
};
