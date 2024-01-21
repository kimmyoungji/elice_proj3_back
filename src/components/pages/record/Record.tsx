import { useNavigate, useParams } from 'react-router-dom';
import style from './record.module.css';
import getDates from '@utils/getDates';
import { recordData } from './RecordData';
import { useState } from 'react';
import { mapSelectMealToMsg } from './recordMappingConstant';
const mealLogo = '/images/9gram_logo_box.png';

// ✅ path = '/record/:selectedDate' url의 date를 가져와서 요청
// ✅ date 값이 없으면 오늘 날짜로 보여주기
// ✅ api 요청으로 선택한 날짜의 아점저간 total 칼로리만 가져옴
// ✅ 특정 meal 선택시 MealPage로 이동

const Record = () => {
  const [foodData, setFoodData] = useState(recordData.food);
  const params = useParams();
  const selectedDate = params.selectedDate;
  // 가져온 날짜로 api 통신 data 가져오기
  const { thisYear, thisMonth, thisDay } = getDates();
  const todayDate = `${thisYear}-${thisMonth}-${thisDay}`;
  const dateSplit = selectedDate
    ? selectedDate.split('-')
    : todayDate.split('-');
  const formatDate =
    dateSplit.length === 3
      ? `${dateSplit[0]}년 ${dateSplit[1]}월 ${dateSplit[2]}일`
      : `${thisYear}년 ${thisMonth}월 ${thisDay}일`;

  const headerDate = formatDate || `${thisYear}.${thisMonth}.${thisDay}`;

  const navigate = useNavigate();

  const handleMealClick = (meal: number) => {
    // /record/2024-01-01/1 형태로 넘어감
    navigate(`/record/${selectedDate || todayDate}/${meal}`);
  };

  return (
    <div>
      <div className={style.meal_container}>
        <div className={style.meal_header}> {headerDate} </div>
        {Object.entries(foodData).map(([key, mealData], index) => (
          <div
            onClick={() => handleMealClick(Number(key))}
            key={index}
            className={style.meal_content}
          >
            <div className={style.meal_info}>
              {mealData.mealCalories && mealData.img !== null ? (
                <>
                  <img
                    className={style.meal_contentBackground}
                    src={mealData.img || mealLogo}
                    alt='하루 식단 이미지'
                  />
                  <div className={style.meal_time}>
                    {mapSelectMealToMsg[Number(key)]}
                  </div>
                  <div className={style.meal_calories}>
                    {' '}
                    {mealData.mealCalories ?? 0} kcal{' '}
                  </div>
                </>
              ) : (
                <>
                  <div className={style.defaultBackground}></div>
                  <div className={style.default_time}>
                    {mapSelectMealToMsg[Number(key)]}
                  </div>
                  <div className={style.default_calories}> 0 kcal </div>
                </>
              )}
            </div>
            {mealData.mealCalories && mealData.img !== null ? (
              <img
                className={style.meal_button}
                src='/icons/meal_delete.png'
                alt='식단 삭제 버튼'
              />
            ) : (
              <img
                className={style.meal_button}
                src='/icons/meal_plus_button.png'
                alt='식단 추가 버튼'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Record;
