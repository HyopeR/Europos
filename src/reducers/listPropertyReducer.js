import { FETCH_PROPERTY, ERROR_PROPERTY } from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_PROPERTY:
      return { ...state, loading: true, dataset: action.payload};

    case ERROR_PROPERTY:
      return { ...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
