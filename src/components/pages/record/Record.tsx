import { useNavigate } from 'react-router-dom';
import record from '../../../styles/record/record.module.css';

interface MealList {
  mealTime: string;
}

interface mealData {
  cal: number;
  img: "string";
}

const Record = () => {
  const navigate = useNavigate();
  const mealList = [
    { mealTime : "아침"},
    { mealTime : "점심" },
    { mealTime : "저녁" },
    { mealTime : "간식" },
  ]
  const mealData = [
    {
      cal : 500, img : "/images//9gram_logo_box.png"
    },
    {
      cal : 300, img : "/images//9gram_logo_box.png"
    },
    {
      cal : 200, img : "/images//9gram_logo_box.png"
    },
    {
      cal : 900, img : "/images//9gram_logo_box.png"
    }
  ]
 

  return (
    <>
      <div className={record.header}>하루식단</div>
        <div className={record.meal_container}>
         <div className={record.meal_header}> 오늘 날짜 </div>
          {mealList.map((meal: MealList, index) => (
          <div key={index} className={record.meal_content} onClick={()=> navigate(`/${meal.mealTime}`)}>
              <div className={record.meal_info}>
                <img src= {mealData[index].img} alt='하루 식단 이미지' />
                <div className={record.meal_time}>{meal.mealTime}</div>
                <div className={record.meal_calories}> {mealData[index].cal} kcal </div>
              </div>
              <img className={record.meal_deleteButton} src="/icons/meal_delete.png" alt='식단 삭제 버튼' />
              
          </div>
          ))}
         </div>
    </> 
  )
};

export default Record;
