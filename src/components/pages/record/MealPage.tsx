import { useNavigate } from 'react-router-dom';
import style from '@styles/record/mealPage.module.css';
import MealImg from './MealImg';
import MealTag from './MealTag';
import NutritionAnalysis from './NutritionAnalysis';
import ButtonCommon from '@components/UI/ButtonCommon';



const MealPage = () => {
//   const navigate = useNavigate();

    return (
    <>
      <div className={style.header}>AI 식단기록</div>
      <div> 
        20xx.xx.xx(요일)
        <ButtonCommon className= 'button default-active tiny b-tiny'> 수정 </ButtonCommon>
        <ButtonCommon className= 'button default-active tiny b-tiny'> 삭제 </ButtonCommon>
      </div>
      <MealImg />
      <img className={style.bannerBackground} src="/images/recommendation_banner.png"  alt="AI 식단 분석 서비스 이동 배너" />
      <div className={style.bannerFont}> AI가 말아주는 오늘의 한 끼 추천이 궁금하다면? </div>
      <MealTag />
      <NutritionAnalysis />

      
      
    </>)
  };
  
  export default MealPage;
  