import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from '@components/pages/ai-analyze/drawer.module.css';
import { Next } from '@assets/Next';
import useApi from '@hooks/useApi';
import { useEffect, useState } from 'react';

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
  feedbackId: '1234',
  feedbackDate: '24.01.02',
  questionType: '식단추천',
  question: '내 목표에 맞게 추천 받고 싶어!',
  text: '권장 섭취 칼로리가 1200kcal이고 근육증량을 목표로 하니, 아침에 닭가슴살 300g, 두유 200ml, 현미밥 150g, 기타 반찬 자유롭게 드시는 걸 추천드립니다. 점심과 저녁은 사과 하나, 소고기 200g 정도 먹으시고 하던 운동 지속하시면 됩니다.권장 섭취 칼로리가 1200kcal이고 근육증량을 목표로 하니, 아침에 닭가슴살 300g, 두유 200ml, 현미밥 150g, 기타 반찬 자유롭게 드시는 걸 추천드립니다. 점심과 저녁은 사과 하나, 소고기 200g 정도 먹으시고 하던 운동 지속하시면 됩니다.권장 섭취 칼로리가 1200kcal이고 근육증량을 목표로 하니, 아침에 닭가슴살 300g, 두유 200ml, 현미밥 150g, 기타 반찬 자유롭게 드시는 걸 추천드립니다. 점심과 저녁은 사과 하나, 소고기 200g 정도 먹으시고 하던 운동 지속하시면 됩니다.',
  option: { goal: '', calorie: 0 },
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

const ShareCard = () => {
  const location = useLocation().pathname.split('/')[2];

  const navigate = useNavigate();
  const { trigger, result, reqIdentifier, loading, error } =
    useApi<PropsReturnType>({
      method: 'get',
      path: `/feedback?feedbackId=${location}`,
      shouldInitFetch: false,
    });

  const triggerData = async () => {
    await trigger({
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
          <div className={styles.option_wrapper}>
            <div className={styles.option} onClick={() => navigate('/join')}>
              <div className='s-big'>로그인하고 내 식단 평가 받으러 가기</div>
              <Next />
            </div>
          </div>
          <div className={`${styles.share_text} r-big`}>{data.text}</div>
        </div>
      </div>
    </>
  );
};

export default ShareCard;
