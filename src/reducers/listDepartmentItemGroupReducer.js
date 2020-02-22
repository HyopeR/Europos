import { FETCH_DEPARTMENT_ITEM_GROUP, ERROR_DEPARTMENT_ITEM_GROUP } from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  dataset: null,
  datasetMenu: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_DEPARTMENT_ITEM_GROUP:
      return { ...state, loading: true, dataset: action.payload.dataset, datasetMenu: action.payload.datasetMenu};

    case ERROR_DEPARTMENT_ITEM_GROUP:
      return { ...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
