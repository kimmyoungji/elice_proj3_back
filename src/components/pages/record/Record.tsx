import { Link } from 'react-router-dom';
import style from '@styles/record/record.module.css';

interface MealList {
  mealTime: string;
}

interface MealData {
  cal: number | null;
  img: string | undefined ;
}


const Record = () => {

  const mealList = [
    { mealTime : "아침"},
    { mealTime : "점심" },
    { mealTime : "저녁" },
    { mealTime : "간식" },
  ]
  const mealData = [
    {
      cal : 500, img : ""
    },
    {
      cal : null, img : undefined
    },
    {
      cal : 200, img : "/images/record_example.png"
    },
    {
      cal : 900, img : "/images/record_example.png"
    }
  ]

  const mealLogo = "/images/9gram_logo_box.png"

  const today = new Date()
  const date = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <div>
      <div className={style.header}>하루식단</div>
        <div className={style.meal_container}>
         <div className={style.meal_header}> {date} </div>
          {mealList.map((meal: MealList, index) => (
          <Link to={`/record/${date}/${meal.mealTime}`} key={index} className={style.meal_content}>
            <div className={style.meal_info}>
            { mealData[index].cal && mealData[index].img !==  null 
                  ? (
                    <>
                      <img className={style.meal_contentBackground} src={mealData[index].img || mealLogo }  alt="하루 식단 이미지" />
                      <div className={style.meal_time}>{meal.mealTime}</div>
                      <div className={style.meal_calories}> {mealData[index].cal ?? 0} kcal </div>
                      </>
                    ) : (
                      <>
                      <div className={`${style.defaultBackground}`}></div> 
                      <div className={style.default_time}>{meal.mealTime}</div>
                      <div className={style.default_calories}> 0 kcal </div>
                      </>
                    )
                }
                </div>
              { mealData[index].cal && mealData[index].img !==  null  
              ? <img className={style.meal_button} src="/icons/meal_delete.png" alt='식단 삭제 버튼' />
              : <img className={style.meal_button} src="/icons/meal_plus_button.png" alt='식단 추가 버튼' />}
          </Link>
          ))}
        </div>
      </div>

  )
};

export default Record;
