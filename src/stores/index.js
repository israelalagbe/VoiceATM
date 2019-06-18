import LocalStorage from './LocalStorage'
 import Request from './Request'
import axios from 'axios'
import AuthStore from './AuthStore'
import {
    configure
} from 'mobx';

configure({
    enforceActions: true
});

//const baseUrl = "http://israel.megalfacademy.com/api"
//const baseUrl = "http://192.168.173.1/farm_market/public/api"
const baseUrl = "http://localhost/motivation_app/public/api"
let request = new Request(axios);
let storage = new LocalStorage(localStorage);
let authStore = new AuthStore(request, storage, baseUrl)





export default {
    authStore,
    axios,
    request,
    baseUrl,
    localStorage:storage
} ; 