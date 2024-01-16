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
  const [data, setData] = useState(userData);
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

  const findKeyByValue = (msg, value) => {
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

  const updateDataAndCalories = (updatedData) => {
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

  const editHeight = () => {
    setIsEditingData(!isEditingData);
    setPrevHeight(data.height);
  };
  const editWeight = () => {
    setIsEditingData(!isEditingData);
    setPrevWeight(data.weight);
  };

  const updateProfileData = () => {
    const updatedData = {
      ...data,
      height: Number(prevHeight),
      weight: Number(prevWeight),
    };
    console.log(updatedData);
    updateDataAndCalories(updatedData);
    setIsEditingData(false);
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
      <div className={style.settingTitle}>설정</div>
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
            style={{ position: 'absolute', left: '75%' }}
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
                value={prevHeight}
                onChange={(e) => setPrevHeight(e.target.value)}
              />
              <input
                type='number'
                value={prevWeight}
                onChange={(e) => setPrevWeight(e.target.value)}
              />
              <button onClick={updateProfileData}> 저장 </button>
            </>
          ) : (
            <>
              <div onClick={editHeight} className={style.goalDetail}>
                {' '}
                {data.height}kg
              </div>
              <div onClick={editWeight} className={style.goalDetail}>
                {' '}
                {data.weight}kg
              </div>
            </>
          )}
          {/* {data.height}cm / {data.weight}kg */}
        </div>
      </div>

      <div className={style.activityAccountArea}>
        <div className={style.infoTitle}>활동량</div>
        <MyPageDropdown
          style={{ position: 'absolute', left: '67%' }}
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
