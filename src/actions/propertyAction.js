import { Actions } from 'react-native-router-flux';
export const FETCH_PROPERTY = 'fetch_customer';
export const ERROR_PROPERTY = 'error_customer';

export const fetchProperty = (customerName) => {
  const url = 'http://192.168.1.190:35111/api/property';
  return async(dispatch) => {
    try {

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.length < 1){
        dispatch({
          type: ERROR_PROPERTY,
          payload: 'Data not found.',
        });
      } else {
        dispatch({
          type: FETCH_PROPERTY,
          payload: responseJson,
        });
      }

    } catch (error){
        console.error(error);
    }
  };
};
