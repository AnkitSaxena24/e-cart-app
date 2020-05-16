import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../Redux/actions/index';
import Spinner from '../../Components/Spinner/Spinner';
import CompareTable from '../../Components/CompareTable/CompareTable';

class CompareProduct extends Component {

  componentDidMount() {
    this.props.fetchAllData();
  }
  
  render() {
    return (
      <div className="container-fluid p-0">
        {this.props.loading ? <Spinner /> :
        <CompareTable 
          featuresData={this.props.featuresListData}
          compareData={this.props.compareSummaryData}
        />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    compareSummaryData: state.GetData.compareSummaryData,
    featuresListData: state.GetData.featuresListData,
    loading: state.GetData.loading,
    error: state.GetData.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllData: () => dispatch(actionTypes.fetchAPIData())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CompareProduct);
