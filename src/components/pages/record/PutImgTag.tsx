import { PutImgTagProps } from './RecordTypes';
import { getTags } from './TageUtils';

const PutImgTag: React.FC<PutImgTagProps> = ({
  mealType,
  imgUrl,
  className,
  data,
  selectedMealNumber,
}) => {
  const tagData = data[selectedMealNumber].food;

  return (
    <div style={{ position: 'relative' }}>
      {imgUrl && <img className={className} src={imgUrl} alt='식단 이미지' />}
      {getTags(tagData)}
    </div>
  );
};

export default PutImgTag;
