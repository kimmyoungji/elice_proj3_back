import React, { useState } from 'react';
import style from '@styles/record/mealPage.module.css';
import MealImg from './MealImg';
import MealTag from './MealTag';
import NutritionAnalysis from './NutritionAnalysis';
import ButtonCommon from '@components/UI/ButtonCommon';
import getDates  from '@utils/getDates';



const MealPage = () => {
    const { thisYear, thisMonth, thisDay, thisDayText} = getDates()
    const [selectedMeal, setSelectedMeal] = useState('점심');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const mealTypes = ['아침', '점심', '저녁', '간식'];


    const handleMealSelect = (mealType: string) => {
      setSelectedMeal(mealType);
      setDropdownVisible(false);
  };

    return (
    <>
      <div className={style.header}>AI 식단기록</div>
      <div className={style.container}>
      <div className={style.pageTitle}> 
        <div>
          {thisYear}년 {thisMonth}월 {thisDay}일 ({thisDayText})
        </div>
        <div className={style.mealToggle}>
          <div onClick={() => setDropdownVisible(!isDropdownVisible)}>
            {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)} ▼
              </div>
                {isDropdownVisible && (
                  <div className={style.dropdown}>
                  {mealTypes.map(mealType => (
                    <div key={mealType} onClick={() => handleMealSelect(mealType)}
                       className={selectedMeal === mealType ? style.active : ''}>
                        {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                    </div>
                  ))}
                </div>
             )}
        </div>
        <div className={style.headerButton}>
        <ButtonCommon className= 'button active tiny b-tiny '> 수정 </ButtonCommon>
        <ButtonCommon className= 'button active tiny b-tiny'> 삭제 </ButtonCommon>
        </div>
      </div>
      <MealImg className={style.imgBox}/>
      <div className={style.banner}>
      <img className={style.bannerBackground} src="/images/recommendation_banner.png"  alt="AI 식단 분석 서비스 이동 배너" />
      <div className={style.bannerFont}> AI가 말아주는 오늘의 한 끼 추천이 궁금하다면? </div>
      </div>
      <MealTag className={style.mealTag}/>
      <NutritionAnalysis className={style.nutritionBox} />

      </div>
      
    </>
    )
  };
  
  export default MealPage;
  