import { useLocation } from 'react-router-dom';
import styles from '@components/pages/ai-analyze/drawer.module.css';
import Option from './Option';
import { Share } from '@assets/Share';
import { DeleteBox } from '@assets/DeleteBox';

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
  date: '24.01.02',
  questionType: '식단추천',
  question: '내 목표에 맞게 추천 받고 싶어!',
  text: '권장 섭취 칼로리가 1200kcal이고 근육증량을 목표로 하니, 아침에 닭가슴살 300g, 두유 200ml, 현미밥 150g, 기타 반찬 자유롭게 드시는 걸 추천드립니다. 점심과 저녁은 사과 하나, 소고기 200g 정도 먹으시고 하던 운동 지속하시면 됩니다.권장 섭취 칼로리가 1200kcal이고 근육증량을 목표로 하니, 아침에 닭가슴살 300g, 두유 200ml, 현미밥 150g, 기타 반찬 자유롭게 드시는 걸 추천드립니다. 점심과 저녁은 사과 하나, 소고기 200g 정도 먹으시고 하던 운동 지속하시면 됩니다.권장 섭취 칼로리가 1200kcal이고 근육증량을 목표로 하니, 아침에 닭가슴살 300g, 두유 200ml, 현미밥 150g, 기타 반찬 자유롭게 드시는 걸 추천드립니다. 점심과 저녁은 사과 하나, 소고기 200g 정도 먹으시고 하던 운동 지속하시면 됩니다.',
  option: { goal: '근육증량', calorie: 1200 },
};

const AiDrawerDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');

  const handleShare = () => {
    // 공유 API 호출
    // 공유 toast
  };
  const handleDelete = () => {
    // 삭제 API 호출
  };

  return (
    <div className={styles.drawer_wrapper}>
      <div className={styles.detail_wrapper}>
        <div className={`${styles.date} b-regular`}>{date}</div>
        <div
          className={`${styles.type} ${typeType[DUMMYdetaildata.questionType]} s-regular`}
        >
          {DUMMYdetaildata.questionType}
        </div>
        <div
          className={`${styles.tag} ${tagType[DUMMYdetaildata.questionType]} b-small`}
        >
          {DUMMYdetaildata.question}
        </div>
        <Option
          type={DUMMYdetaildata.questionType}
          tag={DUMMYdetaildata.question}
          option={DUMMYdetaildata.option}
        />
        <div className={`${styles.detail_text} r-big`}>
          {DUMMYdetaildata.text}
        </div>
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
  );
};

export default AiDrawerDetail;
