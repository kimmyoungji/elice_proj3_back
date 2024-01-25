import { DeleteBox } from '@assets/DeleteBox';
import { Share } from '@assets/Share';
import styles from '@components/pages/ai-analyze/drawer.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MiniToast from './MiniToast';
interface Props {
  date: string;
  type: string;
  tag: string | undefined;
  text: string;
  option: { goal: string; calorie: number } | undefined;
}

const typeType: Record<string, string> = {
  식단추천: styles.recommend,
  식단평가: styles.analyze,
  목표추천: styles.goal,
};

const DrawerCard = ({ date, type, tag, text, option }: Props) => {
  const [shareToast, setShareToast] = useState(false);
  const [deleteToast, setDeleteToast] = useState(false);
  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // 공유 API 호출
    setShareToast(true);
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // 삭제 API 호출
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
