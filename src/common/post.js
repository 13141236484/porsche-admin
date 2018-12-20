import axios from 'axios';
import {PORSCHE_API_TOKEN} from './LocalstorageKey';
import {PORSCHE_HOST} from './host';
import LocalStore from './localStore';

export function post(url,params){
  let result =  axios({
    method: 'post',
    url: PORSCHE_HOST+url,
    data:params,
    contentType: false,
    processData: false,
    headers: {
      "AccessToken":LocalStore.getItem(PORSCHE_API_TOKEN),
    },
  });
  return result;
}
