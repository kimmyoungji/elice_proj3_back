import style from './mypagesettings.module.css';
interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  modalSelect: boolean;
}
export const Modal = ({ onClose, onConfirm, modalSelect }: ModalProps) => {
  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2>
          {modalSelect
            ? '로그아웃 하시겠습니까?'
            : '정말로 탈퇴하시게요..? ( Ĭ ^ Ĭ ) '}
        </h2>
        <div>
          <button className={style.buttonYes} onClick={onConfirm}>
            확인
          </button>
          <button className={style.buttonNo} onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
