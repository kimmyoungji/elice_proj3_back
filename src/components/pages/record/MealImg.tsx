import { useNavigate } from 'react-router-dom';
import style from './mealImg.module.css';
import ImgTagContent from './ImgTagContent';
import { MealImgProps } from './RecordTypes';

const MealImg = ({
  className,
  date,
  data,
  selectedMealNumber,
}: MealImgProps) => {
  const imgUrl = data[selectedMealNumber].imgurl;
  const navigate = useNavigate();

  return (
    <>
      <div className={className}>
        {imgUrl || data[selectedMealNumber].food.length > 0 ? (
          <ImgTagContent
            data={data}
            selectedMealNumber={selectedMealNumber}
            imgUrl={imgUrl || '/images/9gram_logo.png'}
            className={className}
          />
        ) : (
          <div
            onClick={() => {
              navigate(`/add-photo/${date}/${selectedMealNumber}`);
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
