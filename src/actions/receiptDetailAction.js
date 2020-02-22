import { Actions } from 'react-native-router-flux';
export const FETCH_RECEIPT_DETAIL = 'fetch_receipt_detail';
export const ERROR_RECEIPT_DETAIL = 'error_receipt_detail';

export const LOAD_LOCAL_RECIPT_DETAIL = 'load_local_receipt_detail';
export const EMPTY_LOCAL_RECEIPT_DETAIL = 'empty_local_receipt_detail';

export const fetchReceiptDetail = (receipt_id) => {
  const url = 'http://192.168.1.190:35111/api/receipt/detail/group/' + receipt_id;
  return async(dispatch) => {
    try {

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.length < 1){
        dispatch({
          type: ERROR_RECEIPT_DETAIL,
          payload: 'Data not found.',
        });
      } else {
        dispatch({
          type: FETCH_RECEIPT_DETAIL,
          payload: responseJson,
        });
      }

    } catch (error){
        console.error(error);
    }
  };
};

export const loadLocalReipctDetail = (dataset) => {
  return (dispatch) => {
    try {
      if (dataset.length < 1){
        dispatch({
          type: EMPTY_LOCAL_RECEIPT_DETAIL,
          payload: [],
        });
      } else {
        dispatch({
          type: LOAD_LOCAL_RECIPT_DETAIL,
          payload: dataset,
        });
      }

    } catch (error){
        console.error(error);
    }
  };
};
