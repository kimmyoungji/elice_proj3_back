import { useNavigate } from 'react-router-dom';
import header from '../../UI/headerCommon.module.css';
import styles from './addphoto.module.css';

const AddPhoto = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={header.header}>
        <img className={header.arrow} src='/icons/left_arrow.png' alt='뒤로가기' />
        <div className={header.text}>AI 식단 카메라</div>
      </div>
      <div className={styles.cam}>촬영 화면 들어갈 공간</div>
      <div className={styles.addbox}>
        <div className={styles.item}>
          <img className={styles.icon} src='/icons/album.png' alt='앨범' />
          <div className={styles.text}>앨범</div>
        </div>
        <button className={styles.shotbtn}></button>
        <div className={styles.item} onClick={() => navigate('/add-photo/search')}>
          <img className={styles.icon} src='/icons/self.png' alt='직접입력' />
          <div className={styles.text}>직접입력</div>
        </div>
      </div>
    </>
  );
};

export default AddPhoto;
