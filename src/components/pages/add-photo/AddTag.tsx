import styles from './addtag.module.css';

interface Props {
  props: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTag = ({ props, tags, setTags, setIsSearching }: Props) => {
  // api 호출 결과 data 예시 (떡국 검색 시)
  const searchResults = [
    '떡국',
    '두살 떡국',
    '세살 떡국',
    '네살 떡국',
    '다섯살 떡국',
    '그냥 떡국',
    '떡국은 맛있어',
    '세상에서 제일가는 떡국 입니다',
  ];

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
        <div style={{ overflow: 'auto' }}>
          {props ? (
            searchResults.map((result, index) => (
              <p
                key={index}
                onClick={(e) => addTag(e)}
                className='r-big'
                style={{ marginBottom: '5px' }}
              >
                {result.split(props)[0] !== '' && result.split(props)[0]}
                <span className={styles.searchtext}>{props}</span>
                {result.split(props)[1] !== '' && result.split(props)[1]}
              </p>
            ))
          ) : (
            <p
              className='r-medium'
              style={{ textAlign: 'center', marginTop: '60px' }}
            >
              검색 결과가 없습니다.
            </p>
          )}
        </div>
        <p
          className='r-medium'
          style={{
            color: 'var(--main-skyblue)',
            marginLeft: 'auto',
            marginTop: 'auto',
            paddingTop: '10px',
          }}
          onClick={() => setIsSearching(false)}
        >
          닫기
        </p>
      </div>
    </>
  );
};

// {searching && (
//   <div className={styles.resultbox}>
//     <div style={{ overflowY: 'auto' }}>
//       {searchResults ? (
//         searchResults.map((result: string, index) => (
//           <p
//             key={index}
//             className='r-medium'
//             style={{ marginBottom: '5px' }}
//             onClick={(e) => editName(e)}
//           >
//             {result.split(searchInput)[0] !== '' &&
//               result.split(searchInput)[0]}
//             <span
//               className='r-medium'
//               style={{ color: 'var(--main-blue)' }}
//             >
//               {searchInput}
//             </span>
//             {result.split(searchInput)[1] !== '' &&
//               result.split(searchInput)[1]}
//           </p>
//         ))
//       ) : (
//         <p
//           className='r-medium'
//           style={{ textAlign: 'center', marginTop: '60px' }}
//         >
//           검색 결과가 없습니다.
//         </p>
//       )}
//     </div>

//     <p
//       className='r-medium'
//       style={{
//         color: 'var(--main-skyblue)',
//         marginLeft: 'auto',
//         marginTop: 'auto',
//         paddingTop: '10px',
//       }}
//       onClick={() => setSearching(false)}
//     >
//       닫기
//     </p>
//   </div>
// )}

export default AddTag;
