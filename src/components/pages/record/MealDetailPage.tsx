import { useNavigate } from 'react-router-dom';
import MealImg from './MealImg';
import MealTag from './MealTag';
import NutritionAnalysis from './NutritionAnalysis';
import style from './mealdetailpage.module.css';
import { MealDetailProps } from './RecordTypes';

const MealDeatilPage = ({
  meal,
  date,
  data,
  selectedMealNumber,
}: MealDetailProps) => {
  const navigate = useNavigate();

  return (
    <>
      <MealImg
        meal={meal}
        className={style.imgBox}
        date={date}
        data={data}
        selectedMealNumber={selectedMealNumber}
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
      <MealTag
        meal={meal}
        data={data}
        selectedMealNumber={selectedMealNumber}
        className={style.mealTag}
      />
      <NutritionAnalysis
        meal={meal}
        data={data}
        selectedMealNumber={selectedMealNumber}
        className={style.nutritionBox}
      />
    </>
  );
};

export default MealDeatilPage;
