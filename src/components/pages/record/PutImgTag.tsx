import { PutImgTagProps } from './RecordTypes';
import { MergeOverlappingTags } from './MergeOverlappingTags';

const PutImgTag: React.FC<PutImgTagProps> = ({
  imgUrl,
  className,
  data,
  selectedMealNumber,
}) => {
  const tagData = data[selectedMealNumber].food;

  return (
    <div style={{ position: 'relative' }}>
      {imgUrl && <img className={className} src={imgUrl} alt='식단 이미지' />}
      <MergeOverlappingTags tagData={tagData} />
    </div>
  );
};

export default PutImgTag;
