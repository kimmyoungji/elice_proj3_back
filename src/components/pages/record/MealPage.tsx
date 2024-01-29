import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './mealpage.module.css';
import ButtonCommon from '@components/UI/ButtonCommon';
import getDates from '@utils/getDates';
import MealDetail from './MealDetail';
import { MealDetailData } from './RecordTypes';
import useApi from '@hooks/useApi';

import { mapSelectMealToMsg } from './recordMappingConstant';
import { mealTypes, findMealNumber } from './recordMappingConstant';

// ✅ MealPage : 날짜, 특정 meal로 MealPage를 그려주기
// ✅ 토글로 다른 meal을 선택하면 MealTime만 다시 받아와서 그려주기
// ✅ meal data가 있으면 그려주고 없으면 default 그리기

const MealPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { thisYear, thisMonth, thisDay } = getDates();
  const todayDate = `${thisYear}-${thisMonth}-${thisDay}`;
  const date = params.date || todayDate;
  // console.log(params.mealTime);
  const selectedMealTime = params.mealTime || '1'; // 받아온 아점저간
  const dateSplit = date.split('-');
  const formatDate = `${dateSplit[0]}.${dateSplit[1]}.${dateSplit[2]}`;

  const mealMsg = mapSelectMealToMsg[selectedMealTime];
  const [selectedMeal, setSelectedMeal] = useState(mealMsg);
  const [selectedMealNumber, setSelectedMealNumber] = useState(
    findMealNumber(selectedMeal).toString()
  );
  const [data, setData] = useState<MealDetailData>({});
  const [imgData, setImgData] = useState('');
  const [coordinate, setCoordinate] = useState({});
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const { trigger, result, error, loading } = useApi<MealDetailData>({
    path: `/records?date=${date}&userId=5c97c044-ea91-4e3e-bf76-eae150c317d1`,
  });

  useEffect(() => {
    trigger({});
  }, []);

  useEffect(() => {
    if (!result?.data) return;
    const mealData = result.data[selectedMealNumber as keyof MealDetailData];
    console.log(mealData);
    if (selectedMealNumber && mealData) {
      if (mealData.foods && mealData.imgUrl) {
        setData(result.data);
        setCoordinate(mealData.foods);
        setImgData(mealData.imgUrl || '');
      }
    } else {
      setData({});
      setCoordinate([]);
      setImgData('');
    }
  }, [result, selectedMealNumber]);

  useEffect(() => {
    if (selectedMealNumber) {
      navigate(`/record/${date}/${selectedMealNumber}`);
    }
  }, [selectedMealNumber, date]);

  const handleMealSelect = (mealType: string) => {
    setSelectedMeal(mealType);
    const newMealNumber = findMealNumber(mealType).toString();
    setSelectedMealNumber(newMealNumber);
    setDropdownVisible(false);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.pageTitle}>
          <div>{formatDate}</div>
          <div className={style.mealToggle}>
            <div onClick={() => setDropdownVisible(!isDropdownVisible)}>
              {selectedMeal} ▼
            </div>
            {isDropdownVisible && (
              <div className={style.dropdown}>
                {mealTypes.map((mealType) => (
                  <div
                    key={mealType}
                    onClick={() => handleMealSelect(mealType)}
                    className={selectedMeal === mealType ? style.active : ''}
                  >
                    {mealType}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={style.headerButton}>
            {data[selectedMealNumber] &&
              data[selectedMealNumber].foods.length > 0 && (
                <>
                  <ButtonCommon
                    variant='default-active'
                    size='tiny'
                    onClick={() => {
                      navigate(`/record/${date}/${selectedMealTime}/edit`, {
                        state: { foods: coordinate, imgUrl: imgData },
                      });
                    }}
                  >
                    <> 수정 </>
                  </ButtonCommon>
                  <ButtonCommon variant='default-active' size='tiny'>
                    <> 삭제 </>
                  </ButtonCommon>
                </>
              )}
          </div>
        </div>
        <MealDetail
          date={date}
          data={data}
          selectedMealNumber={selectedMealNumber}
        />
      </div>
    </>
  );
};

export default MealPage;
