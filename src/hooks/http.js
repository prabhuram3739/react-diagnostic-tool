import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from './api';
toast.configure();

export const HTTP_CALL = async (method, type, params ,body) => {
    return new Promise(async function (resolve, reject) {
      const url = BASE_URL + method;
      return axios({
        method: type,
        url: url,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
         },
        data: body,
        params: params
      })
        .then(response => {
          if (response.status === 200) {
            return resolve(response);
          } else if (response.status === 201) {
            return resolve(response);
          }
          throw Error(response);
        })
        .catch(err => {
          return reject(err.response);
        });
    });
  };
  
  export const HANDLE_SUCCESS = successRes => {
    if (successRes) {
      toast.success(successRes);
    }
  };
  
  export const CUSTOM_ERROR_MSG = (msg) => {
    if (msg) {
      toast.error(msg);
    }
  };
  
  
  export const HANDLE_ERROR = errorRes => {
    if(errorRes){
      toast.error((errorRes.statusText) ? errorRes.statusText: "Something went wrong");
    }
  };