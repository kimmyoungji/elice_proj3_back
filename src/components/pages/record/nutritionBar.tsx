import style from '@styles/record/mealImg.module.css';


interface MealImgProps {
  className?: string;
}

const MealImg: React.FC<MealImgProps> =  ({className}) => {

    return (
    <>
        <div className={className}>
          <div className={style.uploadButton}> + </div> 
          <div className={style.uploadText}> 오늘의 식단을 <br/> 추가해주세요 </div>
        </div>
      
    </>
    )
  }
  

export default MealImg;
  