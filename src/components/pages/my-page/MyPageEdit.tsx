import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './mypageedit.module.css';
import MyPageDropdown from './MyPageDropdwon';
import ButtonCommon from '@components/UI/ButtonCommon';
import {
  calAge,
  calBMR,
  calBMRCalories,
  adjustCaloriesByGoal,
} from './calUserData';

type UserData = {
  email: string;
  username: string;
  password: string;
  birthday: string;
  gender: number;
  weight: number;
  height: number;
  goal: number;
  targetWeight: number;
  targetCalories: number;
  activity: number;
  img: string | undefined;
};

const userData = {
  email: 'elice@gmail.com',
  username: 'elice',
  password: 'Elice1234@!',
  birthday: '2005-02-03',
  gender: 1,
  weight: 90,
  height: 190,
  goal: 2,
  targetWeight: 80,
  targetCalories: 1200,
  activity: 4,
  img: undefined,
};

const MyPageEdit = () => {
  const [data, setData] = useState<UserData>(userData);
  const navigate = useNavigate();
  const age = calAge({ data });
  const [bmr, setBmr] = useState(calBMR({ data, age }));
  const [bmrCalories, setBmrCalories] = useState(calBMRCalories({ bmr, data }));
  const [goalCalories, setGoalCalories] = useState(
    Math.round(adjustCaloriesByGoal({ data, bmrCalories }))
  );
  const [isEditingData, setIsEditingData] = useState(false);
  const [prevWeight, setPrevWeight] = useState(data.weight);
  const [prevHeight, setPrevHeight] = useState(data.weight);

  const findKeyByValue = (
    msg: { [key: string]: string },
    value: string
  ): string | undefined => {
    for (let [key, val] of Object.entries(msg)) {
      if (val === value) {
        return key;
      }
    }
  };

  const mapGoaltoMsg: { [key: string]: string } = {
    '1': '근육증량',
    '2': '체중감량',
    '3': '체중유지',
    '4': '체중증량',
  };

  const mapActivitytoMsg: { [key: string]: string } = {
    '1': '비활동적',
    '2': '약간 활동적',
    '3': '활동적',
    '4': '매우 활동적',
  };

  const goalMsg = mapGoaltoMsg[data.goal.toString()];
  const activityMsg = mapActivitytoMsg[data.activity.toString()];

  const [selectedGoal, setSelectedGoal] = useState(goalMsg);
  const [selectedActity, setSelectedActity] = useState(activityMsg);
  const [isActivityDropdownVisible, setActivityDropdownVisible] =
    useState(false);
  const [isGoalDropdownVisible, setGoalDropdownVisible] = useState(false);
  const goalTypes = ['근육증량', '체중감량', '체중유지', '체중증량'];
  const activityType = ['비활동적', '약간 활동적', '활동적', '매우 활동적'];

  const toggleGoalDropdown = () => {
    setGoalDropdownVisible(!isGoalDropdownVisible);
    setActivityDropdownVisible(false);
  };

  const toggleActivityDropdown = () => {
    setActivityDropdownVisible(!isActivityDropdownVisible);
    setGoalDropdownVisible(false);
  };

  const updateDataAndCalories = (updatedData: UserData) => {
    const updatedBmr = calBMR({ data: updatedData, age });
    const updatedBmrCalories = calBMRCalories({
      bmr: updatedBmr,
      data: updatedData,
    });
    const updatedGoalCalories = Math.round(
      adjustCaloriesByGoal({
        data: updatedData,
        bmrCalories: updatedBmrCalories,
      })
    );

    setData(updatedData);
    setBmr(updatedBmr);
    setBmrCalories(updatedBmrCalories);
    setGoalCalories(updatedGoalCalories);
  };

  const handleGoalSelect = (goalType: string) => {
    const newGoal = Number(findKeyByValue(mapGoaltoMsg, goalType));
    const updatedData = { ...data, goal: newGoal };
    updateDataAndCalories(updatedData);
    setSelectedGoal(goalType);
    setGoalDropdownVisible(false);
  };

  const handleActivitySelect = (activityType: string) => {
    const newActivity = Number(findKeyByValue(mapActivitytoMsg, activityType));
    const updatedData = { ...data, activity: newActivity };
    updateDataAndCalories(updatedData);
    setSelectedActity(activityType);
    setActivityDropdownVisible(false);
  };

  const editHeightAndWeight = () => {
    setIsEditingData(!isEditingData);
    setPrevHeight(data.height);
    setPrevWeight(data.weight);
  };

  const updateProfileData = () => {
    const updatedData = {
      ...data,
      height: Number(prevHeight),
      weight: Number(prevWeight),
    };
    updateDataAndCalories(updatedData);
  };

  const saveAndNavigate = () => {
    const updatedData = {
      ...data,
      height: Number(prevHeight),
      weight: Number(prevWeight),
    };
    setData(updatedData);
    navigate('/my-page', { state: { updatedData } });
  };

  return (
    <>
      <div className={style.userProfileArea}>
        <div className={style.userProfileContainer}>
          {data.img ? (
            <img
              className={style.userProfile}
              src={data.img}
              alt='사용자 프로필'
            />
          ) : (
            <div className={style.defaultProfile}></div>
          )}

          <div className={style.userName}>{data.username}</div>
        </div>
      </div>

      <div className={style.goalInfoArea}>
        <div className={style.goalInfoTitle}>
          <div className={style.infoTitle}>목표</div>
          <MyPageDropdown
            items={goalTypes}
            selectedItem={selectedGoal}
            onSelectItem={handleGoalSelect}
            toggleDropdown={toggleGoalDropdown}
            isDropdownVisible={isGoalDropdownVisible}
          />
        </div>
        <div className={style.goaltInfo}>
          <div className={style.goalTitle}>목표 칼로리</div>
          <div className={style.goalDetail}>{goalCalories}kcal</div>
        </div>
      </div>

      <div className={style.infoArea}>
        <div className={style.infoTitle}>현재 몸상태</div>
        <div className={style.infoContent}>
          {isEditingData ? (
            <>
              <input
                type='number'
                className={style.inputStyle}
                value={prevHeight}
                onChange={(e) => setPrevHeight(Number(e.target.value))}
                onBlur={updateProfileData}
              />
              <span style={{ color: '#346dff' }}> cm </span>
              <span style={{ color: 'black' }}> / </span>
              <input
                type='number'
                className={style.inputStyle}
                value={prevWeight}
                onChange={(e) => setPrevWeight(Number(e.target.value))}
                onBlur={updateProfileData}
              />
              <span style={{ color: '#346dff' }}> kg </span>
            </>
          ) : (
            <>
              <div
                onClick={editHeightAndWeight}
                className={style.userDataDetail}
              >
                {data.height} cm <span style={{ color: 'black' }}> / </span>
                {data.weight} kg
              </div>
            </>
          )}
        </div>
      </div>

      <div className={style.activityAccountArea}>
        <div className={style.infoTitle}>활동량</div>
        <MyPageDropdown
          items={activityType}
          selectedItem={selectedActity}
          onSelectItem={handleActivitySelect}
          toggleDropdown={toggleActivityDropdown}
          isDropdownVisible={isActivityDropdownVisible}
        />
      </div>

      <div className={style.editButton}>
        <ButtonCommon
          variant='default-active'
          size='big'
          onClick={saveAndNavigate}
        >
          수정 완료
        </ButtonCommon>
      </div>
    </>
  );
};

export default MyPageEdit;
