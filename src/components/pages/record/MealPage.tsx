import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './mealpage.module.css';
import ButtonCommon from '@components/UI/ButtonCommon';
import getDates from '@utils/getDates';
import MealDeatilPage from './MealDetailPage';

// ✅ MealPage : 날짜, 특정 meal로 MealPage를 그려주기
// ✅ 토글로 다른 meal을 선택하면 MealTime만 다시 받아와서 그려주기
// ✅ meal data가 있으면 그려주고 없으면 default 그리기

const MealPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { thisYear, thisMonth, thisDay } = getDates();
  const todayDate = `${thisYear}-${thisMonth}-${thisDay}`;
  const date = params.date || todayDate;
  const selectedMealTime = params.mealTime; // 받아온 아점저간
  const dateSplit = date.split('-');
  const formatDate = `${dateSplit[0]}년 ${dateSplit[1]}월 ${dateSplit[2]}일`;
  let stringfyMeal;

  if (selectedMealTime === '1') stringfyMeal = '아침';
  else if (selectedMealTime === '2') stringfyMeal = '점심';
  else if (selectedMealTime === '3') stringfyMeal = '저녁';
  else if (selectedMealTime === '4') stringfyMeal = '간식';
  else stringfyMeal = '아침';

  const [selectedMeal, setSelectedMeal] = useState(stringfyMeal);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const mealTypes = ['아침', '점심', '저녁', '간식'];

  const handleMealSelect = (mealType: string) => {
    setSelectedMeal(mealType);
    // 선택한 mealType로 api 요청해서 data 뿌려주기
    setDropdownVisible(false);
  };

  return (
    <>
      <div className={style.header}>AI 식단기록</div>
      <div className={style.container}>
        <div className={style.pageTitle}>
          <div>{formatDate}</div>
          <div className={style.mealToggle}>
            <div onClick={() => setDropdownVisible(!isDropdownVisible)}>{selectedMeal} ▼</div>
            {isDropdownVisible && (
              <div className={style.dropdown}>
                {mealTypes.map((mealType) => (
                  <div
                    key={mealType}
                    onClick={() => handleMealSelect(mealType)}
                    className={selectedMeal === mealType ? style.active : ''}
                  >
                    {mealType.charAt(0) + mealType.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={style.headerButton}>
            <ButtonCommon variant='default-active' size='tiny' onClick={() => navigate(`/record/edit`)}>
              {' '}
              수정{' '}
            </ButtonCommon>
            <ButtonCommon variant='default-active' size='tiny'>
              {' '}
              삭제{' '}
            </ButtonCommon>
          </div>
        </div>
        <MealDeatilPage meal={selectedMeal} />
      </div>
    </>
  );
};

export default MealPage;
