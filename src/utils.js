import axios from 'axios';


export const getData=async ({queryKey})=>{
    //console.log('axios kérés:',queryKey);
    const url=queryKey[1]
    console.log(url);
    
    const resp = await axios.get(url)
    return resp.data
}