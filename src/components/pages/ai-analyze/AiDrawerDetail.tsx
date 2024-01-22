import { useLocation } from 'react-router-dom';
import styles from '@components/pages/ai-analyze/drawer.module.css';
import Option from './Option';

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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='11'
              height='12'
              viewBox='0 0 11 12'
              fill='none'
            >
              <path
                d='M8.5 4.00001C9.32843 4.00001 10 3.32843 10 2.5C10 1.67157 9.32843 1 8.5 1C7.67157 1 7 1.67157 7 2.5C7 3.32843 7.67157 4.00001 8.5 4.00001Z'
                stroke='#346DFF'
                stroke-width='0.7'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M2.5 7.50001C3.32843 7.50001 4.00001 6.82843 4.00001 6C4.00001 5.17157 3.32843 4.5 2.5 4.5C1.67157 4.5 1 5.17157 1 6C1 6.82843 1.67157 7.50001 2.5 7.50001Z'
                stroke='#346DFF'
                stroke-width='0.7'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z'
                stroke='#346DFF'
                stroke-width='0.7'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M3.79504 6.755L7.21005 8.74501'
                stroke='#346DFF'
                stroke-width='0.7'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M7.20505 3.255L3.79504 5.24501'
                stroke='#346DFF'
                stroke-width='0.7'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
            공유하기
          </button>
          <button className={`r-small`} onClick={handleDelete}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='10'
              height='12'
              viewBox='0 0 10 12'
              fill='none'
            >
              <path
                d='M1 2.95862H1.90677H9.16092'
                stroke='#346DFF'
                stroke-width='0.7'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M8.34478 2.95862V9.81379C8.34478 10.0735 8.24651 10.3226 8.0716 10.5063C7.89669 10.6899 7.65946 10.7931 7.4121 10.7931H2.74872C2.50136 10.7931 2.26413 10.6899 2.08921 10.5063C1.9143 10.3226 1.81604 10.0735 1.81604 9.81379V2.95862M3.21505 2.95862V1.97931C3.21505 1.71958 3.31332 1.47049 3.48823 1.28683C3.66314 1.10318 3.90037 1 4.14773 1H6.01308C6.26045 1 6.49768 1.10318 6.67259 1.28683C6.8475 1.47049 6.94576 1.71958 6.94576 1.97931V2.95862'
                stroke='#346DFF'
                stroke-width='0.7'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M4.2644 5.08044V8.34481'
                stroke='#346DFF'
                stroke-width='0.7'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M5.89661 5.08044V8.34481'
                stroke='#346DFF'
                stroke-width='0.7'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiDrawerDetail;
