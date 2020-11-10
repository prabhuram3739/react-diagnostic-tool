import React, { createContext, Component } from "react";
import axios from 'axios';
import { authEndpoint } from './environment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const circuitViewDataLayerContext = createContext();

export class CircuitDataProvider extends Component {
  state = {
    data: [],
    count: 0,
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      this.getCircuitViewData(this.props.imsi);
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

  getCircuitViewData = (imsi) => {
    var self = this;
    axios
    .get(authEndpoint + "/api/diagnosticData/searchView/" + imsi, {
        "Content-Type": "application/xml; charset=utf-8"
     })
    .then(function(response) {
        if(!response.data.circuitSwitch.iccId) {
            toast.error('Subscriber Not Found', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        self.setState((state, props) => ({ 
            loading: false, data: response.data, count: Object.keys(response.data).length 
        })
        );
        //self.intervalID = setTimeout(self.getSearchViewData.bind(this), 60000);
    })
    .catch(function(error) {
        console.log(error);
        toast.error('Error while getting subscriber.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    });

  }

  render() {
    const {data, count, loading} = this.state || {};
    const {componentDidMount} = this;
    return(
      <circuitViewDataLayerContext.Provider value = {{ data, count, loading, componentDidMount }} > { this.props.children } 
      </circuitViewDataLayerContext.Provider>
    )
  }
}

export default circuitViewDataLayerContext;
