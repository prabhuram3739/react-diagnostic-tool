import React, { createContext, Component } from "react";
import axios from 'axios';
import { authEndpoint } from './environment';

const DefaultViewDataLayerContext = createContext();

export class DefaultViewDataProvider extends Component {
  state = {
    data: [],
    count: 0,
    loading: true,
    refresh: false,
    refreshStatus: false,
    timeInterval: 3000,
    intervalID: null
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      this.getDefaultViewData(this.props.imsi, this.state.refresh, this.state.refreshStatus, this.state.timeInterval);
    });
}

componentWillUnmount() {
  /*
    stop getData() from continuing to run even
    after unmounting this component. Notice we are calling
    'clearTimeout()` here rather than `clearInterval()` as
    in the previous example.
  */
  clearTimeout(this.intervalID);
}

static getDerivedStateFromProps(nextProps, prevState) {
  if(nextProps.refreshStatus !== prevState.refreshStatus) {
    return {refresh: nextProps.refresh, refreshStatus: nextProps.refreshStatus, timeInterval: nextProps.timeInterval};
  } else { 
   return null 
  }
}

componentDidUpdate(prevProps, prevState) {
  console.log(this.props);
 if(prevProps.refreshStatus !== this.props.refreshStatus) {
   //Perform some operation here
   this.setState({refresh: prevProps.refresh, refreshStatus: prevState.refreshStatus, timeInterval: prevState.timeInterval});
   if(this.state.refreshStatus === false) {
    this.getDefaultViewData(this.props.imsi, prevProps.refresh, prevState.refreshStatus, this.props.timeInterval);
  } else {
    this.getDefaultViewData(this.props.imsi, this.state.refresh, this.state.refreshStatus, this.state.timeInterval);
  }
 }
}

/*componentWillMount() {
  const id = this.getDefaultViewData(this.props.imsi, this.state.refresh, this.state.refreshStatus, this.state.timeInterval);
  this.setState({intervalId: id});
}*/

getDefaultViewData = (imsi, refresh, status, timeInterval) => {
  var self = this;
  imsi ="234500010400205";
  refresh = this.state.refresh;
  status = this.state.refreshStatus;
  timeInterval = this.props.timeInterval;
  console.log("Time Interval Selected:", timeInterval);
  axios
    .get(authEndpoint + "/api/diagnosticData/defaultView/" + imsi, {
        "Content-Type": "application/xml; charset=utf-8"
     })
    .then(function(response) {
        self.setState((state, props) => ({ loading: false, data: response.data, count: Object.keys(response.data).length, refresh: refresh, refreshStatus: status }));
        if(status === true && refresh === true) {
            self.intervalID = setTimeout(self.getDefaultViewData.bind(this), timeInterval);
        }
    })
    .catch(function(error) {
        console.log(error);
    });
  }

  render() {
    const {data, count, loading, refresh, refreshStatus, timeInterval} = this.state || {};
    const {componentDidMount} = this;
    return(
      <DefaultViewDataLayerContext.Provider value = {{ data, count, loading, refresh, refreshStatus, timeInterval, componentDidMount }} > { this.props.children } 
      </DefaultViewDataLayerContext.Provider>
    )
  }
}

export default DefaultViewDataLayerContext;