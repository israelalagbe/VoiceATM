import { observable, autorun,action,computed,decorate} from 'mobx';
import Request from './Request'
import LocalStorage from './LocalStorage'
class AuthStore{
    username=""
    confirm_password=""
    password=""
    name=""
    email=""
    phoneNumber=""
    address=""
    accountType=""
    image=null
    thumb=null
    imageUri
    loading=false
    authenticated=false
    user=null

    /**
     * 
     * @param {Request} request 
     * @param {LocalStorage} localStorage 
     * @param {string} baseUrl
     */
    constructor(request,localStorage,baseUrl){
        this.request=request;
        this.baseUrl=baseUrl
        this.localStorage=localStorage
        this.localStorage.getRaw('username').then((username)=>{
            console.log("Username is loaded", username)
            username&&this.setUsername(username);
        })
        this.localStorage.get('user').then((user)=>{
            if(user){
                this.setAuthenticated(true);
                this.setUser(user)
            }
        })
     
        
    }
    get detailsValid(){
        return !Boolean(this.name&&this.email&&this.username&&this.password&&this.password===this.confirm_password);
    }
    get isBusinessAccount(){
        //console.log("Is business account",typeof this.user.is_business,this.user.is_business,this.user.is_business?true:false)
        return this.user.is_business?true:false
    }
    async isAuthenticated(){
        if(this.authenticated)
            return true
        let user=await this.localStorage.get('user')

        if(user)
            return true
        return false
    }
    async saveUser(user){
        await this.localStorage.set('user',user);
        this.setUser(user)
    }
    setImageUri(uri){
        this.imageUri=uri;
    }
    setAccountType(type){
       
        if(type)
            this.accountType=type
    }
    setUser(user){
        this.user=user;
    }
    setUsername(username){
        this.username=username;
    }
    setPassword(password){
        this.password=password;
    }
    setConfirmPassword(confirm_password){
        this.confirm_password=confirm_password;
    }
    setEmail(email){
        this.email=email;
    }
    setName(name){
        this.name=name;
    }
    setAddress(address){
        this.address=address
    }
    setPhoneNumber(phone){
        this.phoneNumber=phone
    }
    setLoading(loading){
        this.loading=loading;
    }
    setAuthenticated(authenticated){
        this.authenticated=authenticated;
    }
    get registrationComplete(){
        if(this.user.is_business&&!this.user.business)
           return false;
        return true;
        //console.log("is_business",this.user.is_business,"the business",this.user.business)
    }
    // async uploadProfilePicture(){
    //     const uri=this.imageUri;
    //     let uriParts = uri.split('.');
    //     let fileType = uriParts[uriParts.length - 1];
      
    //     let formData = new FormData();
    //     formData.append('file', {
    //       uri,
    //       name: `photo.${fileType}`,
    //       type: `image/${fileType}`,
    //     });
    //     let result=await this.request.post(this.baseUrl+"/files",formData)
    //     this.image=result.data.url;
    //     this.thumb=this.getThumbUrl(this.image);
    // }
    async uploadProfilePicture(){
        //.${fileType}
        /* const uri=this.imageUri;
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1]; */

        let result=await this.request.uploadFile(`${this.baseUrl}/files`,'file',this.imageUri);
        this.image=result.url;
        this.thumb=result.thumb;
    }
    resetForm(){
        this.username=""
        this.password=""
        this.email=""
        this.name=""
        this.phoneNumber=""
        this.address=""
        this.accountType=""
        this.image=null
        this.thumb=null
        this.setImageUri(null)
    }
    handleResponse(e){
        this.setLoading(false)
        if(e&&e.data&&e.data.message)
            return Promise.reject(new Error(e.data.message))
        else if(e.message)
            return Promise.reject(e);
        else
            return Promise.reject(e);
    }
    async handleAuthenticated(data){
        //console.log(data)
        let user=data.user;
        user.is_business=Number( user.is_business)
        user.is_customer=Number( user.is_customer)
        this.authenticated=true
        console.log("success logging in",user)
        await this.localStorage.set('user',user);
        this.setUser(user)
        this.localStorage.setRaw('username',this.username);
        this.setLoading(false)
    }
    async login(){
        this.setLoading(true)
        console.log("Logging in to it")
        return this.request.post(this.baseUrl+"/users/login",{
            username:this.username,
            password:this.password
        }).then(this.handleAuthenticated.bind(this)).catch(this.handleResponse);
        
        // return new Promise((resolve,reject)=>{
        //     setTimeout(()=>{
        //         this.setAuthenticated(true)
        //         if(this.username==="user"&&this.password==="pass")
        //             resolve(true)
        //         else
        //             reject(new Error("Username or password incorrect!"))
        //             this.setLoading(false)
        //     },2000)
            
        // });
    }
    async register(){
        this.setLoading(true)
        try{
            await this.uploadProfilePicture()
        }
        catch(e){
            this.setLoading(false)
            console.warn(e)
            return Promise.reject("Error uploading profile image")
        }
        let result=await this.request.post(this.baseUrl+"/users/register",{
            "name":this.name,
            "email":this.email,
            "username":this.username,
            "password":this.password,
            "image":this.image,
            "thumb":this.thumb
            /* "address":this.address,
            "phone_number":this.phoneNumber,
            "image":this.image,
            "thumb":this.thumb,
            "is_business":this.accountType==="seller"?true:false,
            "is_customer":this.accountType==="buyer"?true:false */
        }).catch(this.handleResponse);
        await this.handleAuthenticated(result);
        return result;
        // return new Promise((resolve,reject)=>{
        //     setTimeout(()=>{
        //         this.setAuthenticated(true)
        //         if(this.username==="user"&&this.password==="pass")
        //             resolve(true)
        //         else
        //             reject(new Error("Username or password incorrect!"))
        //             this.setLoading(false)
        //     },2000)
            
        // });
    }
    logout(){
        this.authenticated=false;
        this.localStorage.remove('user')
        //this.localStorage.remove('username')
    }
    // getUsername(){
    //     return this.username;
    // }
}
/* 
 username=""
    password=""
    name=""
    email=""
    phoneNumber=""
    address=""
    accountType=""
    image=null
    thumb=null
    imageUri
    loading=false
    authenticated=false
    user=null
 */
export default  decorate(AuthStore,{
    username:observable,
    password:observable,
    confirm_password:observable,
    setConfirmPassword:action,
    name:observable,
    email:observable,
    phoneNumber:observable,
    address:observable,
    accountType:observable,
    imageUri:observable,
    loading:observable,
    authenticated:observable,
    user:observable,
    setImageUri:action,
    setAccountType:action,
    setUser:action,
    setUsername:action,
    setPassword:action,
    setEmail:action,
    setName:action,

    setAddress:action,
    setPhoneNumber:action,
    setLoading:action,
    setAuthenticated:action,
    detailsValid:computed,
    registrationComplete:computed,
    resetForm:action,
    handleResponse:action.bound,
    handleAuthenticated:action.bound,
    login:action,
    logout:action

});