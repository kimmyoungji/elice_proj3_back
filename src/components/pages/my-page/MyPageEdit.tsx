import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './mypageedit.module.css';
import MyPageDropdown from './MyPageDropdwon';
import getImgPreview from '@utils/getImgPreview';
import getNutritionStandard from '@utils/getNutritionStandard';
import { mapGoaltoMsg, mapActivitytoMsg, findKeyByValue } from './mapMsg';
import ButtonCommon from '@components/UI/ButtonCommon';
import {
  // calAge,
  calBMR,
  calBMRCalories,
  adjustCaloriesByGoal,
} from './calUserData';

// import { userData } from './DummyUserData';
import { UserData, HealthInfoProps, MyPageEditProps } from './MypageTypes';

const goalTypes = ['근육증량', '체중감량', '체중유지', '체중증량'];
const activityType = ['비활동적', '약간 활동적', '활동적', '매우 활동적'];

const MyPageEdit = () => {
  const location = useLocation();
  const { userData, goalMsg, activityMsg } = location.state;
  const [data, setData] = useState(userData);
  const [healthData, setHealthData] = useState(data.healthInfo);
  // const age = calAge({ data });
  // const goalMsg = mapGoaltoMsg[data.goal];
  // const activityMsg = mapActivitytoMsg[data.activity];
  const age = data.age;

  const [profileImage, setProfileImage] = useState<string | undefined>(
    data.profileImage
  );
  const [file, setFile] = useState<File | null>(null);
  const [bmr, setBmr] = useState(calBMR({ data, age }));
  const [bmrCalories, setBmrCalories] = useState(calBMRCalories({ bmr, data }));
  const [goalCalories, setGoalCalories] = useState(
    Math.round(adjustCaloriesByGoal({ data, bmrCalories }))
  );
  const [isEditingData, setIsEditingData] = useState(false);
  const [prevWeight, setPrevWeight] = useState(healthData.weight);
  const [prevHeight, setPrevHeight] = useState(healthData.weight);
  const [selectedGoal, setSelectedGoal] = useState(goalMsg);
  const [selectedActity, setSelectedActity] = useState(activityMsg);
  const [isActivityDropdownVisible, setActivityDropdownVisible] =
    useState(false);
  const [isGoalDropdownVisible, setGoalDropdownVisible] = useState(false);

  const navigate = useNavigate();

  const imgInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    imgInputRef.current?.click();
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = event.target.files?.[0];
    if (imgFile) {
      getImgPreview(imgFile, setFile, setProfileImage);
    }
  };

  const toggleGoalDropdown = () => {
    setGoalDropdownVisible(!isGoalDropdownVisible);
    setActivityDropdownVisible(false);
  };

  const toggleActivityDropdown = () => {
    setActivityDropdownVisible(!isActivityDropdownVisible);
    setGoalDropdownVisible(false);
  };

  const updateDataAndCalories = (updatedData: UserData) => {
    // const updateUserData: UserData = {
    //   ...data,
    //   ...updatedData,
    // };
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

  const handleSelect = (type: 'goal' | 'activity', value: string) => {
    const newGoalValue = findKeyByValue(mapGoaltoMsg, value);
    if (type === 'goal' && newGoalValue) {
      const newGoal = parseInt(newGoalValue, 10);
      if ([1, 2, 3, 4].includes(newGoal)) {
        const updatedHealthData = {
          ...data.healthInfo,
          goal: newGoal as 1 | 2 | 3 | 4,
        };

        const updatedData = {
          ...data,
          healthInfo: updatedHealthData,
        };
        updateDataAndCalories(updatedData);
        setSelectedGoal(value);
      }
      setGoalDropdownVisible(false);
    } else if (type === 'activity') {
      const newActivityValue = findKeyByValue(mapActivitytoMsg, value);
      if (newActivityValue) {
        const newActivity = parseInt(newActivityValue, 10);
        if ([1, 2, 3, 4].includes(newActivity)) {
          const updatedHealthData = {
            ...data.healthInfo,
            activityAmount: newActivity as 1 | 2 | 3 | 4,
          };
          const updatedData = {
            ...data,
            healthInfo: updatedHealthData,
          };
          updateDataAndCalories(updatedData);
          setSelectedActity(value);
        }
      }
      setActivityDropdownVisible(false);
    }
  };

  const editHeightAndWeight = () => {
    setIsEditingData(!isEditingData);
    setPrevHeight(healthData.height);
    setPrevWeight(healthData.weight);
  };

  const updateProfileData = async () => {
    try {
      const updatedHealthData = {
        ...healthData,
        height: Number(prevHeight),
        weight: Number(prevWeight),
      };
      setHealthData(updatedHealthData);
      const updatedData = {
        ...data,
        profileImage: profileImage,
        healthInfo: updatedHealthData,
      };
      // 데이터 업데이트
      updateDataAndCalories(updatedData);
    } catch (error) {
      console.log('profile data updating error', error);
    }
  };

  const saveAndNavigate = () => {
    const updatedNutrients = getNutritionStandard(data);
    const updatedGoalCalories = Math.round(
      adjustCaloriesByGoal({ data, bmrCalories })
    );

    const updatedData = {
      ...data,
      healthInfo: {
        ...healthData,
        height: Number(prevHeight),
        weight: Number(prevWeight),
        targetNutrients: updatedNutrients,
        targetCalories: updatedGoalCalories,
      },
    };

    updateDataAndCalories(data);
    // store에 저장하는 로직 추가해야함
    navigate('/my-page', { state: { updatedData } });
  };

  return (
    <>
      <div className={style.userProfileArea}>
        <div className={style.userProfileContainer}>
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            ref={imgInputRef}
            onChange={handleImageSelect}
          />
          {profileImage ? (
            <>
              <img
                className={style.userProfile}
                src={profileImage}
                alt='사용자 프로필'
                onClick={handleImageClick}
              />
              <span className={style.imgButton}>+</span>
            </>
          ) : (
            <>
              <div
                className={style.defaultProfile}
                onClick={handleImageClick}
              ></div>
              <span className={style.imgButton}>+</span>
            </>
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
            onSelectItem={(value) => handleSelect('goal', value)}
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
        <div className={style.infoTitle}>신체 데이터</div>
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
                {healthData.height} cm{' '}
                <span style={{ color: 'black' }}> / </span>
                {healthData.weight} kg
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
          onSelectItem={(value) => handleSelect('activity', value)}
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
