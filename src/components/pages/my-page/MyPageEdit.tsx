import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './mypageedit.module.css';
import MyPageDropdwon from './MyPageDropdwon';
import ButtonCommon from '@components/UI/ButtonCommon';

const userData = {
  email: 'elice@gmail.com',
  username: 'elice',
  password: 'Elice1234@!',
  birthday: '2005-02-03',
  gender: '남자',
  weight: 90,
  height: 190,
  goal: 2,
  targetWeight: 80,
  targetCalories: 1200,
  activity: 4,
  img: undefined,
};

const MyPageEdit = () => {
  const navigate = useNavigate();

  const stringfyGoal =
    userData.goal === 1
      ? '근육증량'
      : userData.goal === 2
        ? '체중감량'
        : userData.goal === 3
          ? '체중유지'
          : userData.goal === 4
            ? '체중증량'
            : '목표 설정';

  const stringfyActivity =
    userData.activity === 1
      ? '비활동적'
      : userData.activity === 2
        ? '약간 활동적'
        : userData.activity === 3
          ? '활동적'
          : userData.activity === 4
            ? '매우 활동적'
            : '활동량 설정';

  const [selectedGoal, setSelectedGoal] = useState(stringfyGoal);
  const [selectedActity, setSelectedActity] = useState(stringfyActivity);
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

  const handleGoalSelect = (goalType: string) => {
    setSelectedGoal(goalType);
    setGoalDropdownVisible(false);
  };

  const handleActivitySelect = (activityType: string) => {
    setSelectedActity(activityType);
    setActivityDropdownVisible(false);
  };

  return (
    <>
      <div className={style.userProfileArea}>
        <div className={style.userProfileContainer}>
          {userData.img ? (
            <img
              className={style.userProfile}
              src={userData.img}
              alt='사용자 프로필'
            />
          ) : (
            <div className={style.defaultProfile}></div>
          )}

          <div className={style.userName}>{userData.username}</div>
        </div>
      </div>

      <div className={style.goalInfoArea}>
        <div className={style.goalInfoTitle}>
          <div className={style.infoTitle}>목표</div>
          <MyPageDropdwon
            style={{ position: 'absolute', left: '75%' }}
            items={goalTypes}
            selectedItem={selectedGoal}
            onSelectItem={handleGoalSelect}
            toggleDropdown={toggleGoalDropdown}
            isDropdownVisible={isGoalDropdownVisible}
          />
        </div>
        <div className={style.goaltInfo}>
          <div className={style.goalTitle}>목표 몸무게</div>
          <div className={style.goalDetail}> {userData.weight}kg</div>
        </div>
        <div className={style.goaltInfo}>
          <div className={style.goalTitle}>목표 칼로리</div>
          <div className={style.goalDetail}>{userData.targetCalories}kcal</div>
        </div>
      </div>

      <div className={style.infoArea}>
        <div className={style.infoTitle}>현재 몸상태</div>
        <div className={style.infoContent}>
          {userData.height}cm / {userData.weight}kg
        </div>
      </div>

      <div className={style.activityAccountArea}>
        <div className={style.infoTitle}>활동량</div>
        <MyPageDropdwon
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
          onClick={() => {
            navigate(`/my-page`);
          }}
        >
          수정 완료
        </ButtonCommon>
      </div>
    </>
  );
};

export default MyPageEdit;
