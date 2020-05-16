import * as actionTypes from '../actions/actionTypes';

const initialState = {
  compareSummaryData: null,
  featuresListData: null,
  loading: false,
  error: false
}

const getData = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_DATA_START:
      return {
        ...state, 
        loading: true
      }
    case actionTypes.GET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        compareSummaryData: action.compareSummaryData,
        featuresListData: action.featuresListData
      }
    case actionTypes.GET_DATA_FAILED:
      return {
        ...state,
        loading: false, 
        error: true
      }
    default:
      return state;
  }
};

export default getData;