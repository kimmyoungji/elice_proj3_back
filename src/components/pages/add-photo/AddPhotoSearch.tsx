import ButtonCommon from '@components/UI/ButtonCommon';
import InputCommon from '../../UI/InputCommon';
import styles from './addphotosearch.module.css';
import { useState } from 'react';
import AddTag from './AddTag';
import DeleteTag from './DeleteTag';
import { useNavigate, useParams } from 'react-router-dom';

const AddPhotoSearch = () => {
  const navigate = useNavigate();
  const params = useParams();
  const date = params.date;
  const mealTime = params.mealTime;

  const [searchInput, setSearchInput] = useState('');
  const [clicked, setClicked] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const handleClick = () => {
    setClicked(true);
    //api 호출 로직 작성 예정 (로직 완료 시, setClicked false)
  };

  const tagsArr:object[] = [];
  tags.map((tag) => (
    tagsArr.push(
      {
        foodName: tag,
        foodImage: '/images/9gram_logo.png',
        XYCoordinate: [],
      },
    )
  ));

  const addMeal = () => {
    navigate(`/record/${date}/${mealTime}/edit`, { state: tagsArr });
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchbox}>
        <InputCommon
          size='medium'
          variant='default'
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
        />
        <ButtonCommon
          size='small'
          variant='default-active'
          onClickBtn={handleClick}
        >
          검색
        </ButtonCommon>
      </div>
      <div className={styles.resultbox}>
        {clicked && (
          <AddTag props={searchInput} tags={tags} setTags={setTags} />
        )}
      </div>
      <div className={styles.tagbox}>
        {tags && <DeleteTag tags={tags} setTags={setTags} />}
      </div>
      <div className={styles.btnbox}>
        {tags.length ? (
          <ButtonCommon size='big' variant='default-active' onClickBtn={addMeal}>
            식단 추가하기
          </ButtonCommon>
        ) : (
          <ButtonCommon size='big' variant='default' disabled={true}>
            식단 추가하기
          </ButtonCommon>
        )}
      </div>
    </div>
  );
};

export default AddPhotoSearch;
