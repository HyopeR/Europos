import { Actions } from 'react-native-router-flux';
export const FETCH_DEPARTMENT_ITEM_GROUP = 'fetch_department_item_group';
export const ERROR_DEPARTMENT_ITEM_GROUP = 'error_department_item_group';

export const fetchDeparmentItemGroup = (element) => {
  let url = '';
  const route = typeof(element) === 'number';
  if(route){
    url = 'http://192.168.1.190:35111/api/department/item/group/special/' + element;
  }else {
    url = 'http://192.168.1.190:35111/api/department/item/group/query/' + element[0] + '/' + element[1];
  }

  return async(dispatch) => {
    try {

      const response = await fetch(url);
      const responseJson = await response.json();

      const specialArray = [];
      specialArray['dataset'] = responseJson;

      let array = [];
      for (var i = 0; i < responseJson.length; i++) {
        array.push(
          {value: 'dig-'+responseJson[i].item_group_id, displayValue: responseJson[i].item_group_values.item_group_name}
        )
      }
      specialArray['datasetMenu'] = array;

      dispatch({
        type: FETCH_DEPARTMENT_ITEM_GROUP,
        payload: specialArray,
      });

    } catch (error){
        console.error(error);
    }
  };
};
