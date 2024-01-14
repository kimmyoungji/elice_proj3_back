import { useNavigate } from 'react-router-dom';
import style from './mypage.module.css';

const userData = {
  email: 'elice@gmail.com',
  username: 'elice',
  password: 'Elice1234@!',
  birthday: '2005-02-03',
  gender: '남자',
  weight: 90,
  height: 190,
  goal: '체중감량',
  targetWeight: 80,
  targetCalories: 1200,
  activity: 4,
  img: undefined,
};

const MyPage = () => {
  const navigate = useNavigate();
  const userActivity = userData.activity;

  let activity;

  if (userActivity === 1) {
    activity = '비활동적';
  } else if (userActivity === 2) {
    activity = '약간 활동적';
  } else if (userActivity === 3) {
    activity = '활동적';
  } else if (userActivity === 4) {
    activity = '매우 활동적';
  }

  return (
    <>
      <div className={style.settingTitle}>설정</div>
      <div className={style.userProfileArea}>
        <div className={style.userProfileContainer}>
          {userData.img ? (
            <img className={style.userProfile} src={userData.img} alt='사용자 프로필' />
          ) : (
            <div className={style.defaultProfile}></div>
          )}

          <div className={style.userName}>{userData.username}</div>
        </div>
        <div className={style.editUserProfile}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='15px'
            height='15px'
            onClick={() => {
              navigate(`/my-page/edit`);
            }}
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
            />
          </svg>
          <div className={style.editText}> 편집 </div>
        </div>
      </div>

      <div className={style.infoArea}>
        <div className={style.infoTitle}>목표</div>
        <div className={style.infoContent}>{userData.goal}</div>
      </div>

      <div className={style.infoArea}>
        <div className={style.infoTitle}>현재 몸상태</div>
        <div className={style.infoContent}>
          {userData.height}cm / {userData.weight}kg
        </div>
      </div>

      <div className={style.activityAccountArea}>
        <div className={style.infoTitle}>활동량</div>
        <div className={style.infoContent}>{activity}</div>
      </div>

      <div className={style.activityAccountArea}>
        <div className={style.infoTitle}>계정</div>
        <img className={style.rightButton} src='/icons/right-arrow-icon.png' alt='계정 설정 화살표' />
      </div>
    </>
  );
};

export default MyPage;
