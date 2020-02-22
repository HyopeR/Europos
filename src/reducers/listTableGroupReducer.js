import { FETCH_TABLE_GROUP, ERROR_TABLE_GROUP } from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_TABLE_GROUP:
      return { ...state, loading: true, dataset: action.payload};

    case ERROR_TABLE_GROUP:
      return { ...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
