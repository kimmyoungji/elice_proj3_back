import { useNavigate } from "react-router-dom";
import header from "../../UI/headerCommon.module.css";
import styles from "./recordedit.module.css";
import RecordEditDetail from "./RecordEditDetail";
import { useRef, useState } from "react";

interface Food {
  foodName: string,
  foodImage: string,
  XYCoordinate: number[],
}

const RecordEdit = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState(
    [
      {
        "foodName": "떡만둣국",
        "foodImage": "/images/9gram_logo.png",
        "XYCoordinate": [35.67, 146.02],
      },
      {
        "foodName": "흰쌀밥",
        "foodImage": "/images/9gram_logo.png",
        "XYCoordinate": [35.67, 146.02],
      },
      {
        "foodName": "김치",
        "foodImage": "/images/9gram_logo.png",
        "XYCoordinate": [35.67, 146.02],
      },
    ]);

  const addFood = () => {
    setFoods([...foods, {
      "foodName": "음식명",
      "foodImage": "/images/9gram_logo.png",
      "XYCoordinate": [0,0],
    }])
  };

  const deletefood = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const delete_target = (e.currentTarget.previousSibling as HTMLElement)?.attributes[2].nodeValue;
    setFoods(foods.filter(food => food.foodName !== delete_target))
    console.log(foods);
  };

  const scrollDiv = useRef<HTMLDivElement|null>(null);
  const scrollConvert = (e:React.WheelEvent<HTMLDivElement>) => {
    const { deltaY } = e;
    const el:any= scrollDiv.current;

    el.scrollTo({
      left: el.scrollLeft + deltaY ,
      behavior: "smooth",
    });
  };

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

      <div className={styles.photobox}>
        <button className={styles.addphotobtn}>
          <img className={styles.btnicon} src="/icons/plusicon.png" alt="음식추가버튼"/>
          <p className={styles.btntext} onClick={addFood}>음식<br/>추가</p>
        </button>
        <div
          className={styles.tagbox}
          ref={scrollDiv}
          onWheel={(e => scrollConvert(e))}
        >
          {foods.map((food:Food,index:number) => (
            <div key={index} className={styles.tagitem}>
              <div className={styles.tagimgwrap}>
                <img className={styles.tagimg} src={food.foodImage} alt={food.foodName} />
                <img
                  className={styles.tagdeleteicon}
                  src="/icons/deleteicon.png"
                  alt="태그삭제"
                  onClick={(e)=>deletefood(e)}
                />
              </div>
              <p className="r-big">{food.foodName}</p>
          </div>
          ))}
          <div className={styles.tagitem}>
            <div className={styles.tagimgwrap}>
              <img className={styles.tagimg} style={{border: "3px solid var(--main-blue)"}} src="/images/9gram_logo.png" alt="태그기본이미지"/>
              <img className={styles.tagdeleteicon} src="/icons/deleteicon.png" alt="태그삭제" />
            </div>
            <p className="s-medium" style={{color: "var(--main-blue)"}}>음식명</p>
          </div>
        </div>
      </div>
      <div>
        <RecordEditDetail/>
      </div>
    </>
  );
};

export default RecordEdit;