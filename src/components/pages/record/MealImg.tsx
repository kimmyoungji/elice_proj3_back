import { useNavigate } from 'react-router-dom';
import style from './mealImg.module.css';
import { mealDetailData } from './mealDetailData';
import PutImgTag from './PutImgTag';

interface MealImgProps {
  meal: string;
  className: string;
}

const MealImg = ({ meal, className }: MealImgProps) => {
  const imgUrl = mealDetailData[meal].imgurl;
  const navigate = useNavigate();

  return (
    <>
      <div className={className}>
        {imgUrl || mealDetailData[meal].food.length > 0 ? (
          <PutImgTag
            mealType={meal}
            imgUrl={imgUrl || '/images/9gram_logo.png'}
            className={className}
          />
        ) : (
          <div
            onClick={() => {
              navigate(`/add-photo`);
            }}
          >
            <div className={style.uploadButton}> + </div>
            <div className={style.uploadText}>
              {' '}
              오늘의 식단을 <br /> 추가해주세요{' '}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MealImg;
