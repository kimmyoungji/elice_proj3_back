import InputCommon from "@components/UI/InputCommon";
import styles from "./recordeditdetail.module.css";
import ButtonCommon from "@components/UI/ButtonCommon";
import { useState } from "react";

interface Nutrition {
  name : string,
  gram : string 
}

const RecordEditDetail = () => {
  const [searchInput, setSearchInput] = useState("");

  let amount = 1;

  const nutrients = [
    { name: "탄수화물", gram: "0g" },
    { name: "단백질", gram: "0g" },
    { name: "지방", gram: "0g" },
    { name: "식이섬유", gram: "0g" },
  ];

  return (
    <div className={styles.container}>

      <div className={styles.titlebox}>
        <p className="s-large">음식명</p>
        <p className="r-super" style={{marginLeft:"auto"}}>0Kcal</p>
      </div>

      <div className={styles.nutrientbox}>
        {nutrients.map((nutrition: Nutrition, index) => (
          <div key={index} className={styles.circle}>
            <p className="s-regular">{nutrition.name}</p>
            <p className="b-small" style={{color: "var(--main-blue)"}}>{nutrition.gram}</p>
          </div>
        ))}
      </div>

      <div className={styles.searchbox}>
        <p className="r-medium" style={{ color: "var(--main-skyblue)", textAlign: "left", marginBottom: "9px"}}>
          음식을 수정하려면 검색하세요!
        </p>
        <div className={styles.searchform}>
          <InputCommon
            size="medium"
            variant="default"
            value={searchInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchInput(e.target.value)}
          />
          <ButtonCommon size="small" variant="default-active">
            수정
          </ButtonCommon>
        </div>
      </div>

      <div className={styles.calbox}>
        <div className={styles.caltext}>
          <p className="r-large">얼마나 먹었나요?</p>
          <p className="r-super">{amount}g</p>
        </div>
        <div className={styles.calinput}>
          <img className={styles.calbtn} src="/icons/minusicon.png" alt="-" />
          <p className="s-big">{amount}</p>
          <img className={styles.calbtn} src="/icons/plusicon.png" alt="+" />
        </div>
      </div>

      <div className={styles.btnbox}>
        <ButtonCommon size="medium" variant="default" disabled={true}>취소</ButtonCommon>
        <ButtonCommon size="medium" variant="default-active" >수정 완료</ButtonCommon>
      </div>
    </div>
  )

}

export default RecordEditDetail; 