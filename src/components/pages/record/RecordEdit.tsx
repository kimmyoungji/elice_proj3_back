import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './recordedit.module.css';
import RecordEditDetail from './RecordEditDetail';
import { useEffect, useRef, useState } from 'react';
import ButtonCommon from '@components/UI/ButtonCommon';
import { MergingTags } from './MergingTags';

interface Food {
  foodName: string;
  XYCoordinate: number[];
  counts: number;
  foodInfoId: string;
  calories?: number;
  carbohydrates?: number;
  dietaryFiber?: number;
  fats?: number;
  proteins?: number;
  totalCapacity?: number;
}

interface MealTime {
  [key: string]: string;
}

const RecordEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const params = useParams();
  const date = params.date;
  const mealTime = params.mealTime;
  const dateSplit = date?.split('-');
  const mealTimetoStr: MealTime = {
    '1': '아침',
    '2': '점심',
    '3': '저녁',
    '4': '간식',
  };

  const [foods, setFoods] = useState([
    {
      foodName: '',
      XYCoordinate: [0, 0, 0, 0],
      counts: 1,
      foodInfoId: '',
    },
  ]);
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (state) {
      setFoods(state.foods);
      setImgUrl(state.imgUrl);
    }
  }, []);

  const [focus, setFocus] = useState<number|undefined>();

  const handleFocus = (
    e: React.MouseEvent<HTMLCanvasElement | HTMLDivElement, MouseEvent>
  ) => {
    setFocus(foods.findIndex((food)=>food.foodName===e.currentTarget.id));
  };

  const addFood = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    foods[0] && foods[0].foodName === '음식명'
      ? alert('음식 상세 정보를 추가해주세요!')
      : setFoods([
          {
            foodName: '음식명',
            XYCoordinate: [],
            counts: 1,
            foodInfoId: '',
          },
          ...foods,
        ]);
    e.currentTarget.nextElementSibling?.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  };

  const deletefood = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (foods.length > 1) {
      const delete_target = e.currentTarget.id;
      setFoods(foods.filter((food) => food.foodName !== delete_target));
    } else {
      alert('음식은 1개 이상 등록되어야 합니다!');
    }
  };

  const scrollDiv = useRef<HTMLDivElement | null>(null);
  const scrollConvert = (e: React.WheelEvent<HTMLDivElement>) => {
    const { deltaY } = e;
    const el: any = scrollDiv.current;

    el.scrollTo({
      left: el.scrollLeft + deltaY,
      behavior: 'smooth',
    });
  };

  const handleEnter = () => {
    const main = document.querySelector('.main') as HTMLElement;
    main.style.overflow = 'hidden';
  };

  const handleLeave = () => {
    const main = document.querySelector('.main') as HTMLElement;
    main.style.overflow = 'scroll';
  };

  const canvasRef = useRef<null[] | HTMLCanvasElement[]>([]);

  const createCanvas = (food: Food, index: number) => {
    const canvas = canvasRef.current[index];
    const context = canvas?.getContext('2d');

    const image = new Image();
    image.src = imgUrl;

    const cropX = food.XYCoordinate[0] * image.width - 45;
    const cropY = food.XYCoordinate[1] * image.height - 45;

    image.onload = () => {
      context?.drawImage(image, cropX, cropY, 90, 90, 0, 0, 90, 90);
    };
  };

  useEffect(() => {
    foods.map((food, index) => {
      return createCanvas(food, index);
    });
  }, [foods]);

  const editDone = () => {
    //수정완료 된 foodDate api
    navigate(`/record/${date}/${mealTime}`);
  };

  return (
    <>
      <div className={styles.datebox}>
        {dateSplit && mealTime && (
          <p className='b-small'>
            {dateSplit[0]}. {dateSplit[1]}. {dateSplit[2]}{' '}
            {mealTimetoStr[mealTime]}
          </p>
        )}
      </div>

      <div className={styles.imgbox} style={{ position: 'relative' }}>
        <MergingTags tagData={foods} />
        <img
          className={styles.mealimg}
          src={imgUrl || '/images/9gram_logo.png'}
          alt='식단이미지'
        />
      </div>

      <div className={styles.photobox}>
        <button className={styles.addphotobtn} onClick={(e) => addFood(e)}>
          <img
            className={styles.btnicon}
            src='/icons/plusicon.png'
            alt='음식추가버튼'
          />
          <p className={styles.btntext}>
            음식
            <br />
            추가
          </p>
        </button>
        <div
          className={styles.tagbox}
          ref={scrollDiv}
          onWheel={(e) => scrollConvert(e)}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {foods &&
            foods.map((food: Food, index: number) => (
              <div key={index} className={styles.tagitem}>
                <div className={styles.tagimgwrap}>
                  {food.XYCoordinate.length === 0 ? (
                    <img
                      className={`${styles.tagimg} ${
                        (focus === index) && styles.focusimg
                      }`}
                      id={food.foodName}
                      src='/images/9gram_logo.png'
                      alt={food.foodName}
                      onClick={(e) => handleFocus(e)}
                    />
                  ) : (
                    <canvas
                      className={`${styles.tagimg} ${
                        (focus === index) && styles.focusimg
                      }`}
                      id={food.foodName}
                      ref={(element) => {
                        canvasRef.current[index] = element;
                      }}
                      width={90}
                      height={90}
                      onClick={(e) => handleFocus(e)}
                    />
                  )}

                  <img
                    className={styles.tagdeleteicon}
                    id={food.foodName}
                    src='/icons/deleteicon.png'
                    alt='태그삭제'
                    onClick={(e) => deletefood(e)}
                  />
                </div>
                <p
                  className={`${
                    focus === index ? styles.focustxt : styles.tagtxt
                  }`}
                >
                  {food.foodName}
                </p>
              </div>
            ))}
        </div>
      </div>
      {focus !== undefined && (
        <RecordEditDetail
          focus={focus}
          foods={foods}
          setFoods={setFoods}
          setFocus={setFocus}
        />
      )}

      <div className={styles.btnbox}>
        {focus === undefined ? (
          <ButtonCommon
            size='medium'
            variant='disabled'
            onClick={() => navigate(-1)}
          >
            취소
          </ButtonCommon>
        ) : (
          <ButtonCommon
            size='medium'
            variant='disabled'
            onClick={() => setFocus(undefined)}
          >
            취소
          </ButtonCommon>
        )}

        <ButtonCommon
          size='medium'
          variant='default-active'
          onClickBtn={editDone}
        >
          수정 완료
        </ButtonCommon>
      </div>
    </>
  );
};

export default RecordEdit;
