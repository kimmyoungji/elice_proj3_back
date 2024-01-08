import ButtonCommon from "@components/UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import header from "../../UI/headerCommon.module.css";
import styles from "./addphotosearch.module.css";
import { useState } from "react";
import AddTag from "./AddTag";
import DeleteTag from "./DeleteTag";

const AddPhotoSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [clicked, setClicked] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const handleClick = () => {
    setClicked(true);
    //api 호출 로직 작성 예정 (로직 완료 시, setClicked false)
  }

  return (
    <div className={styles.container}>
      <div className={header.header}>
        <img className={header.arrow} src="icons/left_arrow.png" alt="뒤로가기" />
        <div className={header.text}>식단 검색</div>
      </div>
      <div className={styles.searchbox}>
        <InputCommon
          className="medium r-large default"
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)}
        />
        <ButtonCommon
          className="small b-small active"
          onClickBtn={handleClick}>
          검색
        </ButtonCommon>
      </div>
      <div className={styles.resultbox}>
        {clicked && <AddTag props={searchInput} tags={tags} setTags={setTags} />}
      </div>
      <div className={styles.tagbox}>
        {tags.length > 0 && <DeleteTag tags={tags} setTags={setTags}/>}
      </div>
      <div className={styles.btnbox}>
        {tags.length > 0
          ? <ButtonCommon className="big b-regular active">식단 추가하기</ButtonCommon>
          : <ButtonCommon className="big b-regular disabled">식단 추가하기</ButtonCommon>
        }
      </div>
    </div>
  );
};

export default AddPhotoSearch;
