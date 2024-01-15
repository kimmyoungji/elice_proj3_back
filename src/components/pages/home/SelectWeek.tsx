import styles from '@components/pages/home/week.module.css';

const SelectWeek = () => {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();

  const lastFirstDayIndex = new Date(nowYear, nowMonth, 1).getDate();

  const week = Math.ceil((nowDate + lastFirstDayIndex) / 7);

  return (
    <div className={styles.select_wrapper}>
      {nowYear}.{String(nowMonth + 1).padStart(2, '0')}
      {/* 드롭다운 */}
      {week}주차
    </div>
  );
};

export default SelectWeek;
