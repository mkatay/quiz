import axios from 'axios';


export const getData=async ({queryKey})=>{
    //console.log('axios kérés:',queryKey);
    const url=queryKey[1]
    console.log(url);
    
    const resp = await axios.get(url)
    return resp.data
}

export const single_choice=(obj,userAnswer)=>{
    return obj.answer==userAnswer
}

export const multiple_choice = (obj, userAnswer) => {
    return obj.answer.every(value => userAnswer.includes(value));
  };
  
  export const matching = (obj, userAnswer) => {
    console.log(obj.answer,userAnswer);
    
    for (let i = 0; i < obj.answer.length; i++) {
        if (obj.answer[i] != userAnswer[i]) {
          return false;
        }
      }
      return true;
  };

  export const order = (obj, userAnswer) => {
    return obj.answer.every((answerIndex, idx) => answerIndex === userAnswer[idx]);
  };
          