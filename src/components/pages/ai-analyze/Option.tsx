import { Next } from '@assets/Next';
import styles from '@components/pages/ai-analyze/drawer.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  type: string;
  tag: string;
  option: { goal: string; calorie: number };
}

const Option = ({ type, tag, option }: Props) => {
  const [showOption, setShowOption] = useState(true);
  const [icon, setIcon] = useState(false);
  const [detail, setDetail] = useState(false);

  useEffect(() => {
    if (type === '식단추천' && tag === '오늘은 맛있는 걸로 추천받을래!') {
      setShowOption(false);
    } else if (type === '식단평가') {
      // 식단 보러가기
      setIcon(true);
    } else {
      // 목표추천 & 목표맞춤 식단추천 -> 목표 보여주기
      setDetail(true);
    }
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {showOption && (
        <div className={styles.option_wrapper}>
          {icon && (
            <div className={styles.option} onClick={() => navigate('/')}>
              <div className='s-big'>식단 보러 가기</div>
              <Next />
            </div>
          )}
          {detail && (
            <div className={styles.detail}>
              <div className={styles.option}>
                <p className='s-big'>목표</p>
                <p className={`${styles.option_goal} s-large`}>{option.goal}</p>
              </div>
              <div className={styles.option}>
                <p className='r-big'>목표 칼로리</p>
                <p className='r-large'>{option.calorie}kcal</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Option;
