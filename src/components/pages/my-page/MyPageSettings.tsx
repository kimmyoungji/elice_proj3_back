import { useLocation, useNavigate } from 'react-router-dom';
import { gendertoMsg } from './mapMsg';
import style from './mypagesettings.module.css';
import { useState } from 'react';
import useApi from '@hooks/useApi';
import { Modal } from './MyPageModal';

const MyPageSettings = () => {
  const location = useLocation();
  const { nickname, gender } = location.state;
  const [isEditing, setisEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalSelect, setModalSelect] = useState(false);

  const { trigger, result } = useApi({});
  const navigate = useNavigate();
  const handleEditName = () => {
    setisEditing(!isEditing);
    trigger({ path: '/이름 편집 요청 api', method: 'put' });
  };

  const handleLogOut = () => {
    setShowModal(true);
    setModalSelect(true);
  };

  const handleConfirmLogout = () => {
    trigger({ path: '/auth/logout' });
    navigate('/');
  };
  const handleWithdrawal = () => {
    setShowModal(true);
    setModalSelect(false);
  };

  const handleConfirmWithdrawal = () => {
    trigger({ path: '/auth/withdrawal' });
    // navigate('/');
  };

  return (
    <>
      {showModal && (
        <Modal
          modalSelect={modalSelect}
          onClose={() => setShowModal(false)}
          onConfirm={
            modalSelect ? handleConfirmLogout : handleConfirmWithdrawal
          }
        />
      )}
      <div className={style.container}>
        <div className={style.accountWrapper}>
          <div className={style.detailContainer}>
            <div className={style.nickName}> 닉네임 </div>
            <div className={style.editContainer}>
              {isEditing ? (
                <input value={nickname} />
              ) : (
                <div className={style.showNickName}>{nickname}</div>
              )}
              <button className={style.editButton} onClick={handleEditName}>
                편집
              </button>
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
          <div>
            <img
              className={style.rightButton}
              onClick={handleLogOut}
              src='/icons/right-arrow-icon.png'
              alt='계정 설정 화살표'
              // onClick={handleSettingNavigate}
            />
          </div>
        </div>

        <div className={style.detailContainer}>
          <div> 탈퇴하기 </div>
          <div>
            <img
              className={style.rightButton}
              onClick={handleWithdrawal}
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
