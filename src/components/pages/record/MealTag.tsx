import style from '@styles/record/mealTag.module.css';

interface MealTagProps {
  className?: string;
}

const mealTagDetails = [
  { mealDetail : ["떡국", "부", "간장", "만두", "나물","떡국", "부침개", "간장", "만두", "나물","떡국", "부침개", "간장", "만두", "나물"] },
]

const MealTag: React.FC<MealTagProps> = ({className}) => {


    return (
      <div className={className}>
        <div className={style.containerName}> 먹은 음식 </div>
        {mealTagDetails[0].mealDetail.length > 0 ? (
        <div className={style.tagContainer}>
          {mealTagDetails[0].mealDetail.map((food, index) => (
            <span key={index} className={style.tagStyle}>{food}</span>
          ))}
        </div>
      ) : (
        <div className={style.guideComment}>오늘의 식단을 업로드 해주세요.</div>
      )}
    </div>
  );
};
  
  export default MealTag;
  

