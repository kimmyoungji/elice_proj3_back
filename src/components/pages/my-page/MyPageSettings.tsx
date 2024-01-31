import { useLocation, useNavigate } from 'react-router-dom';
import style from './mypagesettings.module.css';
import { useEffect, useState } from 'react';
import useApi from '@hooks/useApi';
import { Modal } from './MyPageModal';
import MyPageDropdown from './MyPageDropdwon';
import { findKeyByValue, gendertoMsg } from './mapMsg';
import { loginUser } from '@components/store/userLoginRouter';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@components/store/userLoginRouter';
import { RootState } from '@components/store';

const MyPageSettings = () => {
  const location = useLocation();
  const { nickname, gender } = location.state;
  const [isEditing, setisEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalSelect, setModalSelect] = useState(false);
  const [genderSelect, setGenderSelect] = useState(gendertoMsg[gender]);
  const [isGenderDropdwonVisible, setGenderDropdownVisible] = useState(false);
  const [newNickname, setNewNickName] = useState(nickname);
  const genderArr = ['남성', '여성', '기타'];
  const { trigger, result } = useApi<Nickname>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userInfo);

  type Nickname =
    | {
        data?: { isAvailable: boolean };
      }
    | undefined;

  const handleEditName = () => {
    setisEditing(!isEditing);
    if (isEditing) {
      trigger({ path: `/user/username/${newNickname}`, method: 'get' });
    }
  };

  useEffect(() => {
    if (result?.data?.isAvailable) {
      const updateData = {
        ...userData,
        username: newNickname,
      };

      setNewNickName(newNickname);
      console.log(updateData);
      trigger({
        path: '/user',
        method: 'put',
        data: { username: newNickname },
      });
      dispatch(loginUser(updateData));
    }
  }, [result?.data, userData.username]);

  const editNickName = () => {
    setisEditing(!isEditing);
  };

  const handleSelect = (value: string) => {
    const newGenderValue = Number(findKeyByValue(gendertoMsg, value));
    if (newGenderValue) {
      const updateData = {
        ...userData,
        gender: newGenderValue,
      };
      console.log();
      setGenderSelect(gendertoMsg[newGenderValue]);
      dispatch(loginUser(updateData));
      trigger({
        path: '/user',
        method: 'put',
        data: { gender: newGenderValue },
      });
    }
    setGenderDropdownVisible(false);
  };

  useEffect(() => {
    if (userData.gender) {
      setGenderSelect(gendertoMsg[Number(userData.gender)]);
    }
  }, [genderSelect, userData.gender]);

  const handleLogOut = () => {
    setShowModal(true);
    setModalSelect(true);
  };

  const handleConfirmLogout = () => {
    trigger({ path: '/auth/logout' });
    //에러 분기처리 할 부분?
    dispatch(logoutUser());
  };
  const handleWithdrawal = () => {
    setShowModal(true);
    setModalSelect(false);
  };

  const handleConfirmWithdrawal = () => {
    trigger({ path: '/auth/withdrawal' });
    //에러 분기처리 할 부분?
    navigate('/');
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
            <div className={style.accountSettings}> 닉네임 </div>
            <div className={style.editContainer}>
              {isEditing ? (
                <>
                  <input
                    placeholder={newNickname}
                    onChange={(e) => setNewNickName(e.target.value)}
                  />
                  <button className={style.editButton} onClick={handleEditName}>
                    완료
                  </button>
                </>
              ) : (
                <>
                  <div className={style.showNickName}>{newNickname}</div>
                  <button className={style.editButton} onClick={editNickName}>
                    편집
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={style.detailContainer}>
            <div className={style.accountSettings}> 성별 </div>
            <div className={style.selectGender}>
              <MyPageDropdown
                items={genderArr}
                selectedItem={genderSelect}
                onSelectItem={handleSelect}
                toggleDropdown={() =>
                  setGenderDropdownVisible(!isGenderDropdwonVisible)
                }
                isDropdownVisible={isGenderDropdwonVisible}
              />
            </div>
          </div>
          <div className={style.detailContainer}>
            <div className={style.accountSettings}> 등급 </div>
            <div className={style.accountFontStyle}> [유료] 새싹밀 </div>
          </div>
        </div>
        <div className={style.detailContainer}>
          <div className={style.accountSettings}>
            {' '}
            약관 및 개인정보 처리 동의{' '}
          </div>
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
          <div className={style.accountSettings}> 앱 버전 </div>
          <div className={style.accountFontStyle}> 최신 버전 </div>
        </div>
        <div className={style.detailContainer}>
          <div className={style.accountSettings}> 로그아웃 </div>
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
          <div className={style.accountSettings}> 탈퇴하기 </div>
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
