import React, { createContext, Component } from "react";
import axios from 'axios';
import { accountApiEndPoint } from './environment';

const accountViewDataLayerContext = createContext();

export class DataProvider extends Component {
  state = {
    data: [],
    count: 0,
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      this.getAccountViewData();
    });
  }

  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component. Notice we are calling
      'clearTimeout()` here rather than `clearInterval()` as
      in the previous example.
    */
    //clearTimeout(this.intervalID);
  }

  getAccountViewData = () => {
    var self = this;
    axios
    .get(accountApiEndPoint + "/api/account/", {
        "Content-Type": "application/json; charset=utf-8"
     })
    .then(function(response) {
        self.setState((state, props) => ({ loading: false, data: response.data, count: Object.keys(response.data).length }));
        //self.intervalID = setTimeout(self.getSearchViewData.bind(this), 60000);
    })
    .catch(function(error) {
        console.log(error);
    });

  }

  render() {
    const {data, count, loading} = this.state || {};
    const {componentDidMount} = this;
    return(
      <accountViewDataLayerContext.Provider value = {{ data, count, loading, componentDidMount }} > { this.props.children } 
      </accountViewDataLayerContext.Provider>
    )
  }
}

export default accountViewDataLayerContext;