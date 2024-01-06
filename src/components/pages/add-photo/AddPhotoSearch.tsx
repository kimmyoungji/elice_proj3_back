// import { useLocation } from "react-router-dom";
import InputCommon from "../../UI/InputCommon";
import header from "../../UI/headerCommon.module.css";

const AddPhotoSearch = () => {
  // const useQuery = () => new URLSearchParams(useLocation().search);
  // let query = useQuery();
  // {query.get("name")}

  return (
    <>
      <div className={header.header}>
        <img className={header.arrow} src="icons/left_arrow.png" alt="뒤로가기" />
        <div className={header.text}>식단 검색</div>
      </div>
      <InputCommon/>
      <div>AddPhotoSearch </div>
    </>
  );
};

export default AddPhotoSearch;
