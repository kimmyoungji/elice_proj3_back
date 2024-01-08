const getDates = () => {
  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonthNum = date.getMonth() + 1;
  const thisMonthwithzero = thisMonthNum >= 10 ? thisMonthNum : `0${thisMonthNum}`;
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const thisDay = date.getDay();
  const thisDayText = dayOfWeek[thisDay];
  const thisHour = date.getHours();

  const getNowMealText = () => {
    if (thisHour >= 5 && thisHour < 11) {
      return '아침';
    } else if (thisHour >= 11 && thisHour < 17) {
      return '점심';
    } else if (thisHour >= 17 && thisHour < 23) {
      return '저녁';
    } else {
      return '간식';
    }
  };

  return { thisYear, thisMonth: thisMonthwithzero, thisDay, thisDayText, getNowMealText };
};
export default getDates;
