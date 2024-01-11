import { useNavigate } from "react-router-dom";
import header from "../../UI/headerCommon.module.css";
import styles from "./recordedit.module.css";
import RecordEditDetail from "./RecordEditDetail";

const RecordEdit = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={header.header}>
        <img className={header.arrow} src="/icons/left_arrow.png" alt="뒤로가기" onClick={()=>navigate(-1)}/>
        <div className={header.text}>AI 식단 확인</div>
      </div>
      <div className={styles.datebox}>
        <p className="b-small">2024.01.02 (화) 점심</p>
      </div>
      <div className={styles.imgbox}>
        <img className={styles.mealimg} src="https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg" alt="식단이미지"/>
      </div>
      <div className={styles.tagbox}>
        <button className={styles.addphotobtn}>
          <img className={styles.btnicon} src="/icons/plusicon.png" alt="음식추가버튼"/>
          <p className={styles.btntext}>음식<br/>추가</p>
        </button>
        <div className={styles.tagitem}>
          <div className={styles.tagimgwrap}>
            <img className={styles.tagimg} src="/icons/tagimg_default.png" alt="태그기본이미지"/>
            <img className={styles.tagdeleteicon} src="/icons/deleteicon.png" alt="태그삭제"/>
          </div>
          <p className="r-big">음식명</p>
        </div>
        <div className={styles.tagitem}>
          <div className={styles.tagimgwrap}>
            <img className={styles.tagimg} style={{border: "3px solid var(--main-blue)"}} src="/icons/tagimg_default.png" alt="태그기본이미지"/>
            <img className={styles.tagdeleteicon} src="/icons/deleteicon.png" alt="태그삭제" />
          </div>
          <p className="s-medium" style={{color: "var(--main-blue)"}}>음식명</p>
        </div>
      </div>
      <div>
        <RecordEditDetail/>
      </div>
    </>
  );
};

export default RecordEdit;