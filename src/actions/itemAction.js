export const FETCH_ITEM = 'fetch_item';
export const ERROR_ITEM = 'error_item';
export const SELECT_ITEM = 'select_item';

export const fetchItem = (dataset) => {
  const url = 'http://192.168.1.190:35111/api/item/special/' + dataset[0] + '/' + dataset[1];
  return async(dispatch) => {
    try {

      const response = await fetch(url);
      const responseJson = await response.json();

      const specialArray = [];
      specialArray['dataset'] = responseJson;

      let array = [];
      for (var i = 0; i < responseJson.length; i++) {
        array.push(
          {value: 'item-'+ responseJson[i].item_id, displayValue: responseJson[i].item_name}
        )
      }
      specialArray['datasetMenu'] = array;

      dispatch({
        type: FETCH_ITEM,
        payload: specialArray,
      });

    } catch (error){
        console.error(error);
    }
  };
};

export const selectItem = (itemId) => {
  const url = 'http://192.168.1.190:35111/api/item/' + itemId;

  return async(dispatch) => {
    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      dispatch({
        type: SELECT_ITEM,
        payload: responseJson,
      });
    } catch (error){
        console.error(error);
    }
  };
};
