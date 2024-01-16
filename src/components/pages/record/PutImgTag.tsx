import { mealDetailData } from './mealDetailData';

interface PutImgTagProps {
  mealType: string;
  imgUrl: string;
  className: string;
}

const PutImgTag: React.FC<PutImgTagProps> = ({
  mealType,
  imgUrl,
  className,
}) => {
  const tagData = mealDetailData[mealType].food;

  const getTags = () => {
    return tagData.map((food, index) => {
      const tageStyle: React.CSSProperties = {
        position: 'absolute',
        // x 좌표로 받을 값
        left: `${food.XYCoordinate[0]}px`,
        // y 좌표로 받을 값
        top: `${food.XYCoordinate[1]}px`,
        background: 'rgba(43, 43, 43, 0.6)',
        color: 'white',
        borderRadius: 15,
        padding: '4px 9px',
      };
      return (
        food.XYCoordinate.length > 0 && (
          <p key={index} style={tageStyle} className='b-tiny'>
            {food.foodName}
          </p>
        )
      );
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      {imgUrl && <img className={className} src={imgUrl} alt='식단 이미지' />}
      {getTags()}
    </div>
  );
};

export default PutImgTag;
