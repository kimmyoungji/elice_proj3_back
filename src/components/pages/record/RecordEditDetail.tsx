import InputCommon from '@components/UI/InputCommon';
import styles from './recordeditdetail.module.css';
import ButtonCommon from '@components/UI/ButtonCommon';
import { useState } from 'react';

interface Nutrition {
  name: string;
  gram: string;
}

interface Props {
  focus: string;
  foods: {
    foodName: string;
    foodImage: string;
    XYCoordinate: number[];
  }[];
  setFoods: React.Dispatch<
    React.SetStateAction<
      {
        foodName: string;
        foodImage: string;
        XYCoordinate: number[];
      }[]
    >
  >;
  setFocus: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

const RecordEditDetail = ({ focus, foods, setFoods, setFocus }: Props) => {
  const [searchInput, setSearchInput] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    setSearching(true);
    //api 호출 코드
    //특정항목 선택 시 setSearching(false)
  };

  const editName = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    if (foods.some((food) => food.foodName === e.currentTarget.textContent)) {
      alert('이미 등록된 음식입니다!');
    } else {
      const newArr = [...foods];
      const find = foods.findIndex((i) => i.foodName === focus);
      newArr[find].foodName = `${e.currentTarget.textContent}`;
      setFoods(newArr);
      setSearching(false);
      setFocus(e.currentTarget.textContent);
    }
  };

  const [amount, setAmount] = useState(1);
  const increment = () => {
    setAmount(amount + 0.25);
  };
  const decrement = () => {
    if (amount === 0.25) {
      alert('더 이상 양을 줄일 수 없습니다!');
    } else {
      setAmount(amount - 0.25);
    }
  };

  const searchResults = [
    '떡국',
    '두살 떡국',
    '1등 떡국 최고',
    '세살 떡국',
    '네살 떡국',
    '다섯살 떡국',
    '좋은 떡국',
    '나쁜 떡국',
    '해맑은 떡국',
  ];
  // const searchResults:any= undefined;

  const nutrients = [
    { name: '탄수화물', gram: '0g' },
    { name: '단백질', gram: '0g' },
    { name: '지방', gram: '0g' },
    { name: '식이섬유', gram: '0g' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.titlebox}>
        <p className='s-large'>{focus}</p>
        <p className='r-super' style={{ marginLeft: 'auto' }}>
          0Kcal
        </p>
      </div>

      <div className={styles.nutrientbox}>
        {nutrients.map((nutrition: Nutrition, index) => (
          <div key={index} className={styles.circle}>
            <p className='s-regular'>{nutrition.name}</p>
            <p className='b-small' style={{ color: 'var(--main-blue)' }}>
              {nutrition.gram}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.searchbox}>
        <p
          className='r-medium'
          style={{
            color: 'var(--main-skyblue)',
            textAlign: 'left',
            marginBottom: '9px',
          }}
        >
          음식을 수정하려면 검색하세요!
        </p>
        <div className={styles.searchform}>
          <InputCommon
            size='medium'
            variant='default'
            value={searchInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchInput(e.target.value);
              setSearching(false);
            }
              
            }
          />
          <ButtonCommon
            size='small'
            variant='default-active'
            onClickBtn={handleSearch}
          >
            검색
          </ButtonCommon>
          {searching && (
            <div className={styles.resultbox}>
              <div style={{ overflowY: 'auto' }}>
                {searchResults ? (
                  searchResults.map((result: string, index) => (
                    <p
                      key={index}
                      className='r-medium'
                      style={{ marginBottom: '5px' }}
                      onClick={(e) => editName(e)}
                    >
                      {result.split(searchInput)[0] !== '' &&
                        result.split(searchInput)[0]}
                      <span
                        className='r-medium'
                        style={{ color: 'var(--main-blue)' }}
                      >
                        {searchInput}
                      </span>
                      {result.split(searchInput)[1] !== '' &&
                        result.split(searchInput)[1]}
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
                onClick={() => setSearching(false)}
              >
                닫기
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className={styles.caltext}>
          <p className='r-large'>얼마나 먹었나요?</p>
          <p className='r-super'>{amount}g</p>
        </div>
        <div className={styles.calinput}>
          <img
            className={styles.calbtn}
            src='/icons/minusicon.png'
            alt='-'
            onClick={decrement}
          />
          <p className='s-big'>{amount}</p>
          <img
            className={styles.calbtn}
            src='/icons/plusicon.png'
            alt='+'
            onClick={increment}
          />
        </div>
      </div>
    </div>
  );
};

export default RecordEditDetail;
