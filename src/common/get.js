import axios from 'axios';
import {PORSCHE_API_TOKEN} from './LocalstorageKey';
import {PORSCHE_HOST} from './host';
import LocalStore from './localStore';

export function post(url,params){
  let result =  axios({
    method: 'get',
    url: PORSCHE_HOST+url,
    params:params,
    contentType: false,
    processData: false,
    headers: {
      "AccessToken":LocalStore.getItem(PORSCHE_API_TOKEN),
    },
  });
  return result;
}
