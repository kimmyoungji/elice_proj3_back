import styles from "../../UI/headerCommon.module.css";
import style from "./addphoto.module.css";

const AddPhoto = () => {
  return (
    <>
      <div className={styles.header}>
        <img className={styles.arrow} src="icons/left_arrow.png" alt="뒤로가기" />
        <div className={styles.text}>AI 식단 카메라</div>
      </div>
      <div className={style.cam}>
        촬영 화면 들어갈 공간
      </div>
      <div className={style.addbox}>
        <div className={style.item}>
          <img className={style.icon} src="icons/album.png" alt="앨범" />
          <div className={style.text}>앨범</div>
        </div>
        <button className={style.shotbtn}></button>
        <div className={style.item}>
          <img className={style.icon} src="icons/self.png" alt="직접입력" />
          <div className={style.text}>직접입력</div>
        </div>
        
      </div>
    </>
  );
};

export default AddPhoto;
