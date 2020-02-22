import { Actions } from 'react-native-router-flux';
export const FETCH_DEPARTMENT = 'fetch_department';
export const ERROR_DEPARTMENT = 'error_department';

export const fetchDeparment = (id) => {
  const url = 'http://192.168.1.190:35111/api/departments/property/' + id;
  return async(dispatch) => {
    try {

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.length < 1){
        dispatch({
          type: ERROR_DEPARTMENT,
          payload: 'Data not found.',
        });
      } else {
        dispatch({
          type: FETCH_DEPARTMENT,
          payload: responseJson,
        });
      }

    } catch (error){
        console.error(error);
    }
  };
};
