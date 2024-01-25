import { useNavigate, useParams } from 'react-router-dom';
import style from './record.module.css';
import getDates from '@utils/getDates';
import { useState, useEffect } from 'react';
import { mapSelectMealToMsg } from './recordMappingConstant';
import useApi, { TriggerType } from '@hooks/useApi';
import { RecordProps } from './RecordTypes';
const mealLogo = '/images/9gram_logo_box.png';

// ✅ path = '/record/:selectedDate' url의 date를 가져와서 요청
// ✅ date 값이 없으면 오늘 날짜로 보여주기
// ✅ api 요청으로 선택한 날짜의 아점저간 total 칼로리만 가져옴
// ✅ /cumulative-record/meal?date=2024-01-03
// ✅ 특정 meal 선택시 MealPage로 이동

const Record = () => {
  const params = useParams();
  const selectedDate = params.selectedDate;
  const { thisYear, thisMonth, thisDay } = getDates();
  const todayDate = `${thisYear}-${thisMonth}-${thisDay}`;
  const dateSplit = selectedDate
    ? selectedDate.split('-')
    : todayDate.split('-');

  const [foodData, setFoodData] = useState<RecordProps | null>(null);

  const {
    trigger,
    result: data,
  }: {
    trigger: TriggerType;
    result: { data: RecordProps };
  } = useApi({
    path: `/cumulative-record/meal?date=${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`,
  });

  useEffect(() => {
    trigger({
      applyResult: true,
      isShowBoundary: true,
    });
  }, []);

  useEffect(() => {
    if (data && data.data) {
      setFoodData(data.data);
    }
  }, [data]);

  // 가져온 날짜로 api 통신 data 가져오기
  const formatDate =
    dateSplit.length === 3
      ? `${dateSplit[0]}.${dateSplit[1]}.${dateSplit[2]}`
      : `${thisYear}.${thisMonth}.${thisDay}`;

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
        {foodData &&
          foodData.dateArr.map((mealData, index) => (
            <div
              onClick={() => handleMealClick(mealData[0])}
              key={index}
              className={style.meal_content}
            >
              <div className={style.meal_info}>
                {mealData[1] || mealData[2] ? (
                  <>
                    <img
                      className={style.meal_contentBackground}
                      src={mealData[2] || mealLogo}
                      alt='하루 식단 이미지'
                    />
                    <div className={style.meal_time}>
                      {mapSelectMealToMsg[mealData[0]]}
                    </div>
                    <div className={style.meal_calories}>
                      {' '}
                      {mealData[1] ?? 0} kcal{' '}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={style.defaultBackground}></div>
                    <div className={style.default_time}>
                      {mapSelectMealToMsg[mealData[0]]}
                    </div>
                    <div className={style.default_calories}> 0 kcal </div>
                  </>
                )}
              </div>
              <img
                className={style.meal_button}
                src={
                  !mealData[1] && !mealData[2]
                    ? '/icons/meal_plus_button.png'
                    : '/icons/meal_delete.png'
                }
                alt={
                  !mealData[1] && !mealData[2]
                    ? '하루 식단 추가 버튼'
                    : '하루 식단 삭제 버튼'
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Record;
