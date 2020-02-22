import React, { Component } from 'react';
import AdditionTableItem from '../components/additionTableItem';
export const FETCH_TABLE_GROUP = 'fetch_table_group';
export const ERROR_TABLE_GROUP = 'error_table_group';
export const SELECT_TABLE_GROUP = 'select_table_group';

let TableScene = () => (
   <AdditionTableItem />
);

export const fetchTableGroup = (id) => {

  const url = 'http://192.168.1.190:35111/api/table/group/department/' + id;
  let specialArray = [];

  const fetchLoop = async(id) => {

    try {

      const response = await fetch(url);
      const responseJson = await response.json();

      specialArray['mainData'] = responseJson;

      let tabViewArray = [];
      let tabViewScene = {};
      for (var i = 0; i < responseJson.length; i++) {
        tabViewArray.push(
          {key: responseJson[i].table_group_id, title: responseJson[i].table_group_name},
        );
        tabViewScene[responseJson[i].table_group_id] = TableScene;
      }
      specialArray['twDataSet'] = tabViewArray;
      specialArray['twSceneSet'] = tabViewScene;

    } catch (error){
        console.error(error);
    }
  }
  fetchLoop(id);

  return async(dispatch) => {
    try {
      dispatch({
        type: FETCH_TABLE_GROUP,
        payload: specialArray,
      });

    } catch (error){
        console.error(error);
    }
  };
};

export const selectTableGroup = (tableSet) => {
  return {
    type: SELECT_TABLE_GROUP,
    payload: tableSet
  }
}
