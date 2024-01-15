import styles from '@components/pages/home/week.module.css';

const week = ['일', '월', '화', '수', '목', '금', '토'];

const Days = () => {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();
  const nowDay = now.getDay();

  const weekArr = [];
  const firstDate = nowDate - nowDay;
  const currentLastDayIndex = new Date(nowYear, nowMonth + 1, 0).getDate();
  const lastLastDayIndex = new Date(nowYear, nowMonth, 0).getDate();

  for (let i = 0; i < 7; i++) {
    let date = firstDate + i;
    //마지막 데이터가 다음월인 경우
    if (date > currentLastDayIndex) {
      date = date - currentLastDayIndex;
      //처음 데이터가 전월인 경우
    } else if (date <= 0) {
      date = lastLastDayIndex + date;
    }
    weekArr.push(date);
  }

  return (
    <div className={styles.week}>
      {weekArr.map((date, idx) => (
        <div className={styles.date_wrapper} key={idx}>
          <div className={styles.day}>{week[idx]}</div>
          <div className={styles.date}>
            {date !== nowDate && date}
            {date === nowDate && <div className={styles.today}>{date}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Days;
