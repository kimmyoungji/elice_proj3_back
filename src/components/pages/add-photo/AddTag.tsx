import styles from './addtag.module.css';

interface Props {
  props: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddTag = ({ props, tags, setTags }: Props) => {
  // api 호출 결과 data 예시 (떡국 검색 시)
  const searchResults = ['떡국', '두살 떡국', '세살 떡국', '네살 떡국', '다섯살 떡국'];

  const addTag = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    if (!e.currentTarget.textContent) {
      throw new Error('지정할 태그 내용이 없습니다!');
    }
    tags.includes(e.currentTarget.textContent)
      ? alert('이미 추가된 태그입니다!')
      : setTags([...tags, e.currentTarget.textContent]);
  };

  return (
    <>
      <div className={styles.result}>
        {props &&
          searchResults.map((result, index) => (
            <p key={index} onClick={(e) => addTag(e)}>
              {result.split(props)[0] !== '' && result.split(props)[0]}
              <span className={styles.searchtext}>{props}</span>
              {result.split(props)[1] !== '' && result.split(props)[1]}
            </p>
          ))}
      </div>
    </>
  );
};

export default AddTag;
