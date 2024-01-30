import styles from '@components/pages/ai-analyze/drawer.module.css';
import Option from './Option';
import { Share } from '@assets/Share';
import { DeleteBox } from '@assets/DeleteBox';
import { useEffect, useState } from 'react';
import MiniToast from './MiniToast';
import useApi from '@hooks/useApi';

const typeType: Record<string, string> = {
  식단추천: styles.recommend,
  식단평가: styles.analyze,
  목표추천: styles.goal,
};
const tagType: Record<string, string> = {
  식단추천: styles.recommend_tag,
  식단평가: styles.analyze_tag,
  목표추천: styles.goal_tag,
};

const DUMMYdetaildata = {
  feedbackId: '1234qwe',
  feedbackDate: '24.01.02',
  questionType: '식단추천',
  question: '내 목표에 맞게 추천 받고 싶어!',
  text: '권장 섭취 칼로리가 1200kcal이고 근육증량을 목표로 하니, 아침에 닭가슴살 300g, 두유 200ml, 현미밥 150g, 기타 반찬 자유롭게 드시는 걸 추천드립니다. 점심과 저녁은 사과 하나, 소고기 200g 정도 먹으시고 하던 운동 지속하시면 됩니다.권장 섭취 칼로리가 1200kcal이고 근육증량을 목표로 하니, 아침에 닭가슴살 300g, 두유 200ml, 현미밥 150g, 기타 반찬 자유롭게 드시는 걸 추천드립니다. 점심과 저녁은 사과 하나, 소고기 200g 정도 먹으시고 하던 운동 지속하시면 됩니다.권장 섭취 칼로리가 1200kcal이고 근육증량을 목표로 하니, 아침에 닭가슴살 300g, 두유 200ml, 현미밥 150g, 기타 반찬 자유롭게 드시는 걸 추천드립니다. 점심과 저녁은 사과 하나, 소고기 200g 정도 먹으시고 하던 운동 지속하시면 됩니다.',
  option: { goal: '근육증량', calorie: 1200 },
};

interface Props {
  feedbackId: string;
  feedbackDate: string;
  questionType: string;
  question: string;
  text: string;
  option: { goal: string; calorie: number };
}
interface PropsReturnType {
  data: Props;
}

const handleCopyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.log(err);
  }
};

const AiDrawerDetail = () => {
  const [shareToast, setShareToast] = useState(false);
  const [deleteToast, setDeleteToast] = useState(false);

  const { trigger, result, reqIdentifier, loading, error } =
    useApi<PropsReturnType>({
      method: 'get',
      path: `/feedback?feedbackId=416cbf52-a1ab-4c4e-81fd-de1d6e1a47b4`,
      shouldInitFetch: false,
    });

  const triggerData = async () => {
    await trigger({
      applyResult: true,
      isShowBoundary: true,
    });
  };
  const triggerDeleteData = async () => {
    await trigger({
      method: 'delete',
      path: `/feedback?feedbackId=416cbf52-a1ab-4c4e-81fd-de1d6e1a47b4`,
      applyResult: true,
      isShowBoundary: true,
    });
  };

  const [data, setData] = useState({
    feedbackId: '',
    feedbackDate: '',
    questionType: '',
    question: '',
    text: '',
    option: { goal: '', calorie: 0 },
  });

  useEffect(() => {
    triggerData();
    if (result?.data) {
      setData(result?.data);
    }
  }, []);

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleCopyClipBoard(`http://localhost:3000/share/${data?.feedbackId}`); // 나중에 배포 url로 변경 필요!
    setShareToast(true);
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    triggerDeleteData();
    setDeleteToast(true);
  };

  return (
    <>
      <div className={styles.drawer_wrapper}>
        <div className={styles.detail_wrapper}>
          <div className={`${styles.date} b-regular`}>{data.feedbackDate}</div>
          <div
            className={`${styles.type} ${typeType[data.questionType]} s-regular`}
          >
            {data.questionType}
          </div>
          <div
            className={`${styles.tag} ${tagType[data.questionType]} b-small`}
          >
            {data.question}
          </div>
          <Option
            type={data.questionType}
            tag={data.question}
            option={data.option}
          />
          <div className={`${styles.detail_text} r-big`}>{data.text}</div>
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

export default AiDrawerDetail;
