import { useLocation } from 'react-router-dom';
import { gendertoMsg } from './mapMsg';
import style from './mypagesettings.module.css';

const MyPageSettings = () => {
  const location = useLocation();
  const { nickname, gender } = location.state;
  const handleChangeName = () => {};
  return (
    <>
      <div className={style.container}>
        <div className={style.accountWrapper}>
          <div className={style.detailContainer}>
            <div className={style.nickName}> 닉네임 </div>
            <div className={style.editContainer}>
              <div className={style.showNickName}>{nickname}</div>

              <button className={style.editButton}>편집</button>
            </div>
          </div>

          <div className={style.detailContainer}>
            <div className={style.gender}> 성별 </div>
            <div className={style.selectGender}>
              {gendertoMsg[gender]} <span> ▼ </span>
            </div>
          </div>
          <div className={style.detailContainer}>
            <div className={style.rank}> 등급 </div>
            <div className={style.showRank}> [유료] 새싹밀 </div>
          </div>
        </div>
        <div className={style.detailContainer}>
          <div> 약관 및 개인정보 처리 동의 </div>
          <div>
            <img
              className={style.rightButton}
              src='/icons/right-arrow-icon.png'
              alt='계정 설정 화살표'
              // onClick={handleSettingNavigate}
            />
          </div>
        </div>
        <div className={style.detailContainer}>
          <div> 앱 버전 </div>
          <div> 최신 버전 </div>
        </div>
        <div className={style.detailContainer}>
          <div> 로그아웃 </div>
        </div>

        <div className={style.detailContainer}>
          <div> 탈퇴하기 </div>
          <div>
            <img
              className={style.rightButton}
              src='/icons/right-arrow-icon.png'
              alt='계정 설정 화살표'
              // onClick={handleSettingNavigate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPageSettings;
