import { useNavigate } from 'react-router-dom';
import style from './mealImg.module.css';
import { mealTimeData } from './mealTimeData';


interface MealImgProps {
  meal : string;
  className: string;
}

const MealImg =  ({meal, className}: MealImgProps) => {
    const imgUrl = mealTimeData[meal].imgurl
    const navigate = useNavigate();

    return (
    <>
        <div className={className}>
          { imgUrl ? (
           <img src={imgUrl} className={className} alt='식단 전체 이미지' />
           ) : ( 
            <div onClick={()=> {navigate( `/add-photo` )
          }}>
            <div className={style.uploadButton}> + </div> 
            <div className={style.uploadText}> 오늘의 식단을 <br/> 추가해주세요 </div>
            </div>
           )}

          
        </div>
      
    </>
    )
  }
  

export default MealImg;
  