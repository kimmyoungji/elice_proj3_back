import { useNavigate } from 'react-router-dom';
import MealImg from './MealImg';
import MealTag from './MealTag';
import NutritionAnalysis from './NutritionAnalysis';
import style from './mealdetailpage.module.css';

const MealDeatilPage = ({ meal, key, date, selectedMealNumber }: any) => {
  const navigate = useNavigate();

  return (
    <>
      <MealImg
        meal={meal}
        className={style.imgBox}
        props={{ date, selectedMealNumber }}
      />
      <div
        className={style.banner}
        onClick={() => {
          navigate(`/ai-analyze`);
        }}
      >
        <img
          className={style.bannerBackground}
          src='/images/recommendation_banner.png'
          alt='AI 식단 분석 서비스 이동 배너'
        />
        <div className={style.bannerFont}>
          {' '}
          AI가 말아주는 오늘의 한 끼 추천이 궁금하다면?{' '}
        </div>
      </div>
      <MealTag meal={meal} className={style.mealTag} />
      <NutritionAnalysis meal={meal} className={style.nutritionBox} />
    </>
  );
};

export default MealDeatilPage;
