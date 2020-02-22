import { FETCH_DEPARTMENT, ERROR_DEPARTMENT } from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: null,
  selectedDepartment: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_DEPARTMENT:
      return { ...state, loading: true, dataset: action.payload};

    case ERROR_DEPARTMENT:
      return { ...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
