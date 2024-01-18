import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './mypage.module.css';
import { PencilIcon } from '@assets/PencilIcon';
import { mapGoaltoMsg, mapActivitytoMsg, findKeyByValue } from './mapMsg';
import { userData, UserData } from './DummyUserData';

const MyPage = () => {
  // 스토어에서 값 받아오기
  const [data, setData] = useState(userData);
  const goalMsg = mapGoaltoMsg[data.goal];
  const activityMsg = mapActivitytoMsg[data.activity];

  const navigate = useNavigate();
  const handleIconClick = () => {
    navigate(`/my-page/edit`);
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
          <div className={style.goalDetail}>{data.targetCalories}kcal</div>
        </div>
      </div>

      <div className={style.infoArea}>
        <div className={style.infoTitle}>현재 몸상태</div>
        <div className={style.infoContent}>
          {data.height} cm <span style={{ color: 'black' }}> / </span>{' '}
          {data.weight} kg
        </div>
      </div>

      <div className={style.activityAccountArea}>
        <div className={style.infoTitle}>활동량</div>
        <div className={style.infoContent}>{activityMsg}</div>
      </div>

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
