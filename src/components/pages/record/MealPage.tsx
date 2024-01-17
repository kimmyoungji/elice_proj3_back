import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './mealpage.module.css';
import ButtonCommon from '@components/UI/ButtonCommon';
import getDates from '@utils/getDates';
import MealDeatilPage from './MealDetailPage';

// ✅ MealPage : 날짜, 특정 meal로 MealPage를 그려주기
// ✅ 토글로 다른 meal을 선택하면 MealTime만 다시 받아와서 그려주기
// ✅ meal data가 있으면 그려주고 없으면 default 그리기

interface MealPageProps {
  selectedMeal: string;
  date: string;
}

const MealPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { thisYear, thisMonth, thisDay } = getDates();
  const todayDate = `${thisYear}-${thisMonth}-${thisDay}`;
  const date = params.date || todayDate;
  const selectedMealTime = params.mealTime || 1; // 받아온 아점저간
  const dateSplit = date.split('-');
  const formatDate = `${dateSplit[0]}년 ${dateSplit[1]}월 ${dateSplit[2]}일`;

  const mapSelectMealToMsg: { [key: string]: string } = {
    1: '아침',
    2: '점심',
    3: '저녁',
    4: '간식',
  };

  const findMealNumber = (meal: string) => {
    const mealNumber = Object.keys(mapSelectMealToMsg).find(
      (key) => mapSelectMealToMsg[key] === meal
    );
    return mealNumber || 1;
  };

  const mealMsg = mapSelectMealToMsg[selectedMealTime];
  const [selectedMeal, setSelectedMeal] = useState(mealMsg);
  const [selectedMealNumber, setSelectedMealNumber] = useState(
    findMealNumber(selectedMeal)
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const mealTypes = ['아침', '점심', '저녁', '간식'];

  useEffect(() => {
    if (selectedMealNumber) {
      navigate(`/record/${date}/${selectedMealNumber}`);
    }
  }, [selectedMealNumber, date, navigate]);

  const handleMealSelect = (mealType: string) => {
    setSelectedMeal(mealType);
    const newMealNumber = findMealNumber(mealType);
    setSelectedMealNumber(newMealNumber);
    setDropdownVisible(false);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.pageTitle}>
          <div>{formatDate}</div>
          <div className={style.mealToggle}>
            <div onClick={() => setDropdownVisible(!isDropdownVisible)}>
              {selectedMeal} ▼
            </div>
            {isDropdownVisible && (
              <div className={style.dropdown}>
                {mealTypes.map((mealType) => (
                  <div
                    key={mealType}
                    onClick={() => handleMealSelect(mealType)}
                    className={selectedMeal === mealType ? style.active : ''}
                  >
                    {mealType}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={style.headerButton}>
            <ButtonCommon
              variant='default-active'
              size='tiny'
              onClick={() =>
                navigate(`/record/${date}/${selectedMealTime}/edit`, {
                  state: { selectedMealTime, date },
                })
              }
            >
              <> 수정 </>
            </ButtonCommon>
            <ButtonCommon variant='default-active' size='tiny'>
              <> 삭제 </>
            </ButtonCommon>
          </div>
        </div>
        <MealDeatilPage meal={selectedMeal} />
      </div>
    </>
  );
};

export default MealPage;
