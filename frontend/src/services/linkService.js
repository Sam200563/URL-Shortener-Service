
import axios from "axios";

const AUTH_URL='/api/links/'

export const getUserlinks = async(token)=>{
    const config ={
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }

    try {
        const response = await axios.get(AUTH_URL+'my-links',config)
        return response.data
    } catch (error) {
        console.error("API error:",error);
        if(error.response && error.response.data){
            throw error.response.data
        }else{
            throw new Error('Failed to fetch the links')
        }
    }
}