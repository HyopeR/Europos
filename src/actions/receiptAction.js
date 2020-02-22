import { Actions } from 'react-native-router-flux';
export const SELECT_RECEIPT = 'select_receipt';
export const ERROR_RECEIPT = 'error_receipt';
export const EMPTY_RECEIPT = 'empty_receipt';

export const fetchReceipt = (receipt_id) => {
  const url = 'http://192.168.1.190:35111/api/receipt/' + receipt_id;
  return async(dispatch) => {
    try {

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.length < 1){
        dispatch({
          type: ERROR_RECEIPT,
          payload: 'Data not found.',
        });
      } else {
        dispatch({
          type: SELECT_RECEIPT,
          payload: responseJson[0],
        });
      }

    } catch (error){
        console.error(error);
    }
  };
};

export const emptyReceipt = () => {
  return async(dispatch) => {
    try {
      dispatch({
        type: EMPTY_RECEIPT,
        payload: null,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
