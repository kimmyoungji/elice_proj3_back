import { useNavigate } from "react-router-dom";
import header from "../../UI/headerCommon.module.css";
import styles from "./recordedit.module.css";
import RecordEditDetail from "./RecordEditDetail";
import { useEffect, useRef, useState } from "react";
import ButtonCommon from "@components/UI/ButtonCommon";

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
        "foodImage": "/images/salad-2756467_1280.jpg",
        "XYCoordinate": [35.67, 146.02],
      },
      {
        "foodName": "흰쌀밥",
        "foodImage": "/images/salad-2756467_1280.jpg",
        "XYCoordinate": [35.67, 146.02],
      },
      {
        "foodName": "김치",
        "foodImage": "/images/salad-2756467_1280.jpg",
        "XYCoordinate": [35.67, 146.02],
      },
    ]);
  const [focus, setFocus] = useState<string | undefined | null>("");

  const handleFocus = (e:React.MouseEvent<HTMLCanvasElement|HTMLDivElement, MouseEvent>) => {
    setFocus(e.currentTarget.parentNode?.nextSibling?.textContent);
  };

  const addFood = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    foods[0].foodName === "음식명"
      ? alert("음식 상세 정보를 추가해주세요!")
      : setFoods([{
        "foodName": "음식명",
        "foodImage": "/images/9gram_logo.png",
        "XYCoordinate": [0, 0]
      }, ...foods
      ]);
    e.currentTarget.nextElementSibling?.scrollTo({
      left: 0 ,
      behavior: "smooth",
    })
  };

  const deletefood = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const delete_target = e.currentTarget.id;
    setFoods(foods.filter(food => food.foodName !== delete_target))
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

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const image = new Image();
    image.src = `${foods[foods.length-1].foodImage}`;

    image.onload = () => {
      // props (원본 객체, x좌표, y좌표, 이미지가로길이, 이미지세로길이, 캔버스 x좌표, 캔버스 y좌표, 캔버스에 그려질 가로길이, 캔버스에 그려질 세로길이)
      context?.drawImage(image, 0, 0, image.width, image.height);

      // props (추출 x좌표, 추출 y좌표, 추출 너비, 추출 높이)
      const croppedImage= context?.getImageData(0, 0, 90, 90);

      // 자른 이미지를 다시 Canvas에 그립니다.
      context?.clearRect(0, 0, canvas?.width as number, canvas?.height as number);
      context?.putImageData(croppedImage as ImageData, 0, 0);
    };
  }, [foods]);



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
        <button className={styles.addphotobtn} onClick={e=>addFood(e)}>
          <img className={styles.btnicon} src="/icons/plusicon.png" alt="음식추가버튼"/>
          <p className={styles.btntext} >음식<br/>추가</p>
        </button>
        <div
          className={styles.tagbox}
          ref={scrollDiv}
          onWheel={(e => scrollConvert(e))}
        >
          {foods.map((food:Food,index:number) => (
            <div key={index} className={styles.tagitem}>
              <div className={styles.tagimgwrap}>
                {food.XYCoordinate[0]===0 && food.XYCoordinate[1]===0 
                  ? <img
                  className={`${styles.tagimg} ${focus===food.foodName && styles.focusimg}`}
                    id={food.foodName}
                    src={food.foodImage}
                    alt={food.foodName}
                  onClick={(e => handleFocus(e))}
                />
                  : <canvas
                  className={`${styles.tagimg} ${focus===food.foodName && styles.focusimg}`}
                  id={food.foodName}
                  ref={canvasRef}
                  width={90}
                  height={90}
                  onClick={(e => handleFocus(e))}
                />
                }
                
                <img
                  className={styles.tagdeleteicon}
                  id={food.foodName}
                  src="/icons/deleteicon.png"
                  alt="태그삭제"
                  onClick={(e)=>deletefood(e)}
                />
              </div>
              <p className={`${focus === food.foodName ? styles.focustxt : styles.tagtxt}`}>{food.foodName}</p>
          </div>
          ))}
        </div>
      </div>
      {focus && <RecordEditDetail focus={focus} foods={foods} setFoods={setFoods} setFocus={setFocus} />}
      <div className={styles.btnbox}>
        <ButtonCommon size="medium" variant="disabled">취소</ButtonCommon>
        <ButtonCommon size="medium" variant="default-active" >수정 완료</ButtonCommon>
      </div>
    </>
  );
};

export default RecordEdit;