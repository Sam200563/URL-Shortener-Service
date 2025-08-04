import axios from "axios";

const AUTH_URL = '/api/auth/'

export const registerUser = async(userdata)=>{
    try {
        const response = await axios.post(AUTH_URL+'register' , userdata);

        return response.data;
    } catch (error) {
        console.error('API error:',error);

        if(error.response && error.response.data){
            throw error.response.data
        }else{
            throw new Error('An unexpected error is coming')
        }
    }
}

export const loginUser = async(logindata)=>{
    try {
        const response = await axios.post(AUTH_URL+'login',logindata)

        return response.data
    } catch (error) {
        console.error("API error:",error)

        if(error.response && error.response.data){
            throw error.response.data
        }else{
            throw new Error('An unexpected error is coming')
        }
    }
}