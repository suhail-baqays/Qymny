import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_url = `${BASE_URL}/api/analyze`
const Feed_Back_url = `${BASE_URL}/api/feedback`

export const analyze_Resume = async(File , Description , lang)=>{
    const Form_Data = new FormData()
    Form_Data.append("resume" , File)
    Form_Data.append("Job_Description" , Description)      // gathering All data into one form 
    Form_Data.append('language', lang);
    

    try{
        const response = await axios.post(API_url,Form_Data , {
            headers:{
                "Content-Type":"multipart/form-data"      //send the data to router class
            }
        })
        return response.data
    }catch(error){
        console.error("Error sending resume :", error);
        throw error;
    }
}
export const Feed_Back = async(name , comment , rating)=>{

    try{
        const feedback= {name, comment , rating}
        const response = await axios.post(Feed_Back_url, feedback);
        return response.data;
    }catch(error){
        console.error("Error sending feed back :", error);
        throw error;
    }
    
}