import axios from 'axios'

export default class Request {
    /**
     * @param {axios} axios
     */
    constructor(axios) {
        this.axios = axios;
        this.axios.interceptors.response.use(function (response) {
            // Do something with response data
            //console.log("response",response.data)
            return response.data;
        }, function (error) {
            console.log("Request error",  error)
            // Do something with response error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.hea);ders
                return Promise.reject(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                return Promise.reject(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                return Promise.reject(error);
            }
        });
    }
    get(...args) {
        return this.axios.get(...args)
    }
    post(...args) {
        return this.axios.post(...args)
    }
    put(...args) {
        return this.axios.put(...args)
    }
    head(...args) {
        return this.axios.head(...args)
    }
    delete(...args) {
        return this.axios.delete(...args)
    }
    /* param(obj) {
        var temp = [];
        for (i in obj){
            var value=obj[i];
            if(value instanceof Array){
                value.forEach((item)=>{
                    temp.push(`${i}[]=${item}`);
                })
            }
            else{
                temp.push(`${i}=${value}`);
            }
        }
        return encodeURI(temp.join('&'));
    } */
    /**
     * @param {string} url The address to upload the file
     * @param {string} key The parameter for the file upload
     * @param {File}   file The file to upload
     */
    async uploadFile(uri,key,file){
        let formData = new FormData();
        formData.append(key, file);
        let result=await this.post(uri,formData)
        return {url:result.url,thumb:this.getThumbUrl(result.url)};
    }
    getThumbUrl(url){
		let urlArr=url.split('/');
		let filename=urlArr.pop();
		let baseUrl=urlArr.join('/');
		return `${baseUrl}/thumb_${filename}`;
		//let storageRef = this.firebaseApp.storage().ref(`${this.basePath}/${fname}`);
		//return <Promise<string>>storageRef.getDownloadURL();
	}
}