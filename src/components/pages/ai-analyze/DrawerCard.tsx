import { DeleteBox } from '@assets/DeleteBox';
import { Share } from '@assets/Share';
import styles from '@components/pages/ai-analyze/drawer.module.css';
import useApi from '@hooks/useApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MiniToast from './MiniToast';
interface Props {
  id: string;
  date: string;
  type: string;
  tag: string | undefined;
  text: string;
}

const typeType: Record<string, string> = {
  식단추천: styles.recommend,
  식단평가: styles.analyze,
  목표추천: styles.goal,
};

const handleCopyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.log(err);
  }
};

const DrawerCard = ({ id, date, type, tag, text }: Props) => {
  const [shareToast, setShareToast] = useState(false);
  const [deleteToast, setDeleteToast] = useState(false);

  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: 'delete',
    path: `/feedback?feedbackId=416cbf52-a1ab-4c4e-81fd-de1d6e1a47b4`,
    shouldInitFetch: false,
  });

  const triggerData = async () => {
    await trigger({
      applyResult: true,
      isShowBoundary: true,
    });
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleCopyClipBoard(`http://localhost:3000/share/${id}`);
    // 나중에 배포 url로 변경 필요!
    setShareToast(true);
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    triggerData();
    setDeleteToast(true);
  };

  const navigate = useNavigate();

  return (
    <>
      <div
        className={styles.card_wrapper}
        onClick={() => navigate(`/ai-drawer/detail?date=${date}`)}
      >
        <div className={`${styles.date} b-regular`}>{date}</div>
        <div className={`${styles.type} ${typeType[type]} s-regular`}>
          {type}
        </div>
        <div className={`${styles.text} r-big`}>{text}</div>
        <div className={styles.button_wrapper}>
          <button className={`r-small`} onClick={handleShare}>
            <Share />
            공유하기
          </button>
          <button className={`r-small`} onClick={handleDelete}>
            <DeleteBox />
            삭제하기
          </button>
        </div>
      </div>
      {shareToast && (
        <MiniToast setToast={setShareToast} text='답변 URL이 복사되었습니다.' />
      )}
      {deleteToast && (
        <MiniToast setToast={setDeleteToast} text='답변이 삭제되었습니다.' />
      )}
    </>
  );
};

export default DrawerCard;
