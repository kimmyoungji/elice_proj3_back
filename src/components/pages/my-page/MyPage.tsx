import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './mypage.module.css';
import { PencilIcon } from '@assets/PencilIcon';
import { mapGoaltoMsg, mapActivitytoMsg, findKeyByValue } from './mapMsg';
// import { userData } from './DummyUserData';
import { useSelector } from 'react-redux';
import { RootState } from '@components/store';
import { storeUserInfo } from '@components/store/userLoginRouter';

const MyPage = () => {
  // 스토어에서 값 받아오기
  const userData = useSelector((state: RootState) => state.user.userInfo);
  const [data, setData] = useState(userData);
  const [healthData, setHealthData] = useState(userData.healthInfo);
  const goalMsg = mapGoaltoMsg[healthData.goal];
  const activityMsg = mapActivitytoMsg[healthData.activityAmount];
  const navigate = useNavigate();

  useEffect(() => {
    setData(userData);
    setHealthData(userData.healthInfo);
  }, [userData]);

  const handleIconClick = () => {
    navigate(`/my-page/edit`, {
      state: { userData: data, healthData, goalMsg, activityMsg },
    });
  };

  const mypageInfo = [
    {
      title: '신체 데이터',
      content: (
        <>
          {healthData.height} cm <span style={{ color: 'black' }}>/</span>{' '}
          {healthData.weight} kg
        </>
      ),
      titleClass: style.infoTitle,
      contentClass: style.infoContent,
    },
    {
      title: '활동량',
      content: activityMsg,
      titleClass: style.infoTitle,
      contentClass: style.infoContent,
    },
  ];

  return (
    <>
      <div className={style.userProfileArea}>
        <div className={style.userProfileContainer}>
          {data.profileImage ? (
            <img
              className={style.userProfile}
              src={data.profileImage}
              alt='사용자 프로필'
            />
          ) : (
            <div className={style.defaultProfile}></div>
          )}

          <div className={style.userName}>{data.username}</div>
        </div>
        <div className={style.editUserProfile} onClick={handleIconClick}>
          <PencilIcon width='15px' height='15px' strokeWidth={2} />
          <div className={style.editText}> 편집 </div>
        </div>
      </div>

      <div className={style.goalInfoArea}>
        <div className={style.goalInfoTitle}>
          <div className={style.infoTitle}>목표</div>
          <div className={style.infoContent}>{goalMsg}</div>
        </div>
        <div className={style.goaltInfo}>
          <div className={style.goalTitle}>목표 칼로리</div>
          <div className={style.goalDetail}>
            {healthData.targetCalories}kcal
          </div>
        </div>
      </div>

      {mypageInfo.map((info, idx) => (
        <div key={idx} className={style.infoArea}>
          <div className={info.titleClass}>{info.title}</div>
          <div className={info.contentClass}>{info.content}</div>
        </div>
      ))}

      <div className={style.activityAccountArea}>
        <div className={style.infoTitle}>계정 설정</div>
        <img
          className={style.rightButton}
          src='/icons/right-arrow-icon.png'
          alt='계정 설정 화살표'
        />
      </div>
    </>
  );
};

export default MyPage;
