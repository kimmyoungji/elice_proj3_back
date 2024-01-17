import { useNavigate, useParams } from 'react-router-dom';
import style from './record.module.css';
import getDates from '@utils/getDates';
import { recordData } from './RecordData';
import TopBar from '@components/layout/TopBar';

const mealTimeKeys = Object.keys(recordData);

// record
// ✅ path = '/record/:selectedDate' url의 date를 가져와서 요청
// ✅ date 값이 없으면 오늘 날짜로 보여주기
// ✅ api 요청으로 선택한 날짜의 아점저간 total 칼로리만 가져옴
// ✅ 특정 meal 선택시 MealPage로 이동

const Record = () => {
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

  const navigate = useNavigate();
  const mealLogo = '/images/9gram_logo_box.png';

  const headerDate = formatDate || `${thisYear}.${thisMonth}.${thisDay}`;

  const handleMealClick = (meal: string) => {
    let mealTime;
    if (meal === '아침') mealTime = '1';
    else if (meal === '점심') mealTime = '2';
    else if (meal === '저녁') mealTime = '3';
    else if (meal === '간식') mealTime = '4';

    // /record/2024-01-01/1 형태로 넘어감
    navigate(`/record/${selectedDate || todayDate}/${mealTime}`);
  };

  return (
    <div>
      <div className={style.meal_container}>
        <div className={style.meal_header}> {headerDate} </div>
        {mealTimeKeys.map((meal, index) => (
          <div
            onClick={() => handleMealClick(meal)}
            key={index}
            className={style.meal_content}
          >
            <div className={style.meal_info}>
              {recordData[meal].totalCalories &&
                recordData[meal].img !== null ? (
                <>
                  <img
                    className={style.meal_contentBackground}
                    src={recordData[meal].img || mealLogo}
                    alt='하루 식단 이미지'
                  />
                  <div className={style.meal_time}>{meal}</div>
                  <div className={style.meal_calories}>
                    {' '}
                    {recordData[meal].totalCalories ?? 0} kcal{' '}
                  </div>
                </>
              ) : (
                <>
                  <div className={`${style.defaultBackground}`}></div>
                  <div className={style.default_time}>{meal}</div>
                  <div className={style.default_calories}> 0 kcal </div>
                </>
              )}
            </div>
            {recordData[meal].totalCalories && recordData[meal].img !== null ? (
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
