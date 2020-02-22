import { Actions } from 'react-native-router-flux';
export const FETCH_TABLE = 'fetch_table';
export const ERROR_TABLE = 'error_table';

export const fetchTable = (dataset) => {
  let allTables = {};

  const fetchLoop = async(dict) => {

    try {
      const response = await fetch(dict["url"]);
      const responseJson = await response.json();
      allTables[dict["tg_id"]] = responseJson;

    } catch (error){
        console.error(error);
    }
  }

  for (var i = 0; i < dataset.length; i++) {
    let dict = {url: null, tg_id: null};
    const url = 'http://192.168.1.190:35111/api/table/special/' + dataset[i].table_group_id;
    let table_group_id = dataset[i].table_group_id;

    dict["url"] = url;
    dict["tg_id"] = table_group_id;

    fetchLoop(dict);
  }
    return (dispatch) => {
      try {

        if (allTables.length < 1){
          dispatch({
            type: ERROR_TABLE,
            payload: 'Data not found.',
          });
        } else {
          dispatch({
            type: FETCH_TABLE,
            payload: allTables,
          });
        }

      } catch (error){
          console.error(error);
      }
    };
};
