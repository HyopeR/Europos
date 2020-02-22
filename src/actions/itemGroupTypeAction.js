export const FETCH_ITEM_GROUP_TYPE = 'fetch_item_group_type';
export const ERROR_ITEM_GROUP_TYPE = 'error_item_group_type';

export const fetchItemGroupType = (customerName) => {
  const url = 'http://192.168.1.190:35111/api/item/grouptype';
  return async(dispatch) => {
    try {

      const response = await fetch(url);
      const responseJson = await response.json();

      const specialArray = [];
      specialArray['dataset'] = responseJson;

      let array = [{value: 'ig-all', displayValue: 'Hepsi', index: 0}];
      for (var i = 0; i < responseJson.length; i++) {
        array.push(
          {value: 'ig-'+responseJson[i].item_group_type_id, displayValue: responseJson[i].item_group_type_name, index: i+1}
        )
      }
      specialArray['datasetMenu'] = array;

      dispatch({
        type: FETCH_ITEM_GROUP_TYPE,
        payload: specialArray,
      });

    } catch (error){
        console.error(error);
    }
  };
};
