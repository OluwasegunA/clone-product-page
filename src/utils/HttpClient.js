import axios from 'axios';

class HttpCall {
   constructor (url = "https://dummyjson.com/products"){
     this.url = url;
   }
   
   async makeGetApiCall(){
     const result = await axios.get(`${this.url}`);
     return result;
   }

   async makePostApiCall(body){
      const result = await axios.post(`${this.url}`, body);
      return result;
    }

    async fetchProducts(){
      const result = await axios.get(`${this.url}`);
      return result;
    }
 }

 export default HttpCall;