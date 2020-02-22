import { FETCH_TABLE, ERROR_TABLE } from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_TABLE:
      return { ...state, loading: true, dataset: action.payload};

    case ERROR_TABLE:
      return { ...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
