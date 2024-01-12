interface RecordData {
    [key: string]: {
      totalCalories: number;
      img: string | undefined;
    };
  }



const recordData : RecordData = {

    "아침" : {
        totalCalories : 1400,
        img : "/images/record_example.png"
    },
    
    "점심" : {
        totalCalories : 2500,
        img : undefined
    },

    "저녁" : {
        totalCalories : 5100,
        img : "/images/record_example.png"
    },

    "간식" : {
        totalCalories : 0,
        img : undefined
    },

} 


export {recordData}