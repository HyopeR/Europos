import { SELECT_RECEIPT, ERROR_RECEIPT, EMPTY_RECEIPT } from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case SELECT_RECEIPT:
      return { ...state, loading: true, dataset: action.payload};

    case EMPTY_RECEIPT:
      return { ...state, loading: false, dataset: action.payload};

    case ERROR_RECEIPT:
      return { ...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
