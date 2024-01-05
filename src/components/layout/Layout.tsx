import { useNavigate } from 'react-router-dom';
import styles from './layout.module.css';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <div className={styles.item} onClick={() => navigate('/ai-analyze')}>
        <img className={styles.icon} src='icons/ai.png' alt='ai-analyze' />
        <div className={styles.text}>AI분석</div>
      </div>

      <div className={styles.item} onClick={() => navigate('/calendar')}>
        <img className={styles.icon} src='icons/calendar.png' alt='calendar' />
        <div className={styles.text}>달력</div>
      </div>

      <div className={styles.item} onClick={() => navigate('/home')}>
        <img className={styles.icon} src='icons/home.png' alt='home' />
        <div className={styles.text}>홈</div>
      </div>

      <div className={styles.item} onClick={() => navigate('/record')}>
        <img className={styles.icon} src='icons/records.png' alt='records' />
        <div className={styles.text}>기록</div>
      </div>

      <div className={styles.item} onClick={() => navigate('/my-page')}>
        <img className={styles.icon} src='icons/setting.png' alt='setting' />
        <div className={styles.text}>설정</div>
      </div>
    </div>
  );
};

export default Layout;
