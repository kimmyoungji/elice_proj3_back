import ButtonCommon from "@components/UI/ButtonCommon";
import styles from "./checkphotomodal.module.css";
import React, { useRef } from "react";

interface Props {
  pre: string;
  imgUrl: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckPhotoModal = ({ pre, imgUrl, setShowModal }: Props) => {
  
  const cropRef = useRef<HTMLCanvasElement | null>(null);

  const uploadImg = () => {
    const canvas = cropRef.current;
    const context = canvas?.getContext("2d");

    const image = new Image();
    image.src = imgUrl;

      const canvasW = 350;
      const canvasH = 200;
      const scale = Math.max(canvasW / image.width, canvasH / image.height);
      const offsetX = (canvasW - image.width * scale) / 2;
    const offsetY = (canvasH - image.height * scale) / 2;
    
      context?.drawImage(image, offsetX, offsetY, image.width*scale, image.height*scale);

    const canvasUrl = canvas?.toDataURL(); 
    const link = document.createElement("a");
    if (!canvasUrl) return;
    link.href = canvasUrl;
    link.download = "사진업로드 테스트";
    link.click();
  };

  

  return (
    <div className={styles.container}>
      <div className={styles.modalbox}>
        <div className={styles.title}>{pre} 사진 확인</div>
        <div className={styles.contentbox} >
          <p className='r-large' style={{ marginBottom: "20px" }}>AI가 분석할 사진을 확인해주세요!</p>
          <div style={{position:'relative'}}>
            <img className={styles.photo} src={imgUrl} alt="촬영한사진" />
            <canvas width="350" height="200" style={{ position:'absolute',bottom:'0'}} ref={cropRef} />
          </div>
          
        </div>
        <div className={styles.btnbox}>
          <ButtonCommon size='medium' variant='disabled' onClick={()=>setShowModal(false)}>
            재{pre}
          </ButtonCommon>
          <ButtonCommon size='medium' variant='default-active' onClick={uploadImg}>
            사진 분석
          </ButtonCommon>
        </div>
      </div>
    </div>
  )
}

export default CheckPhotoModal;