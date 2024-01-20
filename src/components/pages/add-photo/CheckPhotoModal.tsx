import ButtonCommon from "@components/UI/ButtonCommon";
import styles from "./checkphotomodal.module.css";
import React from "react";

interface Props {
  imgUrl: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckPhotoModal = ({imgUrl, setShowModal}:Props) => {

  return (
    <div className={styles.container}>
      <div className={styles.modalbox}>
        <div className={styles.title}>촬영 사진 확인</div>
        <div className={styles.contentbox}>
          <p className='r-large' style={{marginBottom:"20px"}}>AI가 분석할 사진을 확인해주세요!</p>
          <img className={styles.photo} src={imgUrl} alt="촬영한사진" />
        </div>
        <div className={styles.btnbox}>
          <ButtonCommon size='medium' variant='disabled' onClick={()=>setShowModal(false)}>
            재촬영
          </ButtonCommon>
          <ButtonCommon size='medium' variant='default-active'>
            사진 등록
          </ButtonCommon>
        </div>
      </div>
    </div>
  )
}

export default CheckPhotoModal;