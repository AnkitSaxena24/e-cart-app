import * as actionTypes from './actionTypes';
import axios from 'axios';

// Data is successfully fetched 
export const getDataSuccess = data => {
  return {
    type: actionTypes.GET_DATA_SUCCESS,
    compareSummaryData: data.products.compareSummary, 
    featuresListData: data.products.featuresList
  }
}

// Data fetching failed
export const getDataFailed = () => {
  return {
    type: actionTypes.GET_DATA_FAILED
  }
}

// Awaiting data
export const getDataStart = () => {
  return {
    type: actionTypes.GET_DATA_START
  }
}

// Making API call to get data
export const fetchAPIData = () => {
  return dispatch => {
    dispatch(getDataStart());
    axios.get(`http://www.mocky.io/v2/5e9ebdaa2d00007800cb7697`).then(response => {
      if(response && response.data && response.data.products) {
        dispatch(getDataSuccess(response.data));
      }
    }).catch(error => {
      dispatch(getDataStart());
      dispatch(getDataFailed());
    })
  }
};