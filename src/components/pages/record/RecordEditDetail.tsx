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
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    setSearching(true);
    //api 호출 코드 
    //특정항목 선택 시 setSearching(false)
  }

  let amount = 1;
  const searchResults = ["떡국", "두살 떡국","1등 떡국 최고" ,"세살 떡국", "네살 떡국", "다섯살 떡국","좋은 떡국","나쁜 떡국","해맑은 떡국"]; 
  // const searchResults:any= undefined;

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
          <ButtonCommon size="small" variant="default-active" onClickBtn={handleSearch}>
            검색
          </ButtonCommon>
          {searching && 
            <div className={styles.resultbox}>
              <div style={{overflowY:"auto"}}>
                {searchResults
                  ? searchResults.map((result:string,index) =>
                    <p key={index} className="r-medium" style={{marginBottom: "5px"}}>
                      {result.split(searchInput)[0] !== "" && result.split(searchInput)[0]}
                      <span className="r-medium" style={{color: "var(--main-blue)"}}>{searchInput}</span>
                      {result.split(searchInput)[1] !== "" && result.split(searchInput)[1]}
                    </p>
                    )
                  : <p className="r-medium" style={{textAlign:"center", marginTop: "60px"}}>검색 결과가 없습니다.</p>}
              </div>
              
              <p
                className="r-medium"
                style={{ color: "var(--main-skyblue)", marginLeft: "auto", marginTop: "auto", paddingTop: "10px"}}
                onClick={()=>setSearching(false)}
              >닫기</p>
            </div>
          }
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
        <ButtonCommon size="medium" variant="disabled">취소</ButtonCommon>
        <ButtonCommon size="medium" variant="default-active" >수정 완료</ButtonCommon>
      </div>
    </div>
  )

}

export default RecordEditDetail; 